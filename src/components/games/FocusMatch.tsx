import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronLeft, Trophy } from 'lucide-react';

interface FocusMatchProps {
  onClose: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🌿', '🌸', '🌊', '🌙', '🧘', '✨', '☁️', '🍃'];

export const FocusMatch: React.FC<FocusMatchProps> = ({ onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched || isWon) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(prev => prev + 1);
          
          if (matches + 1 === EMOJIS.length) {
            setIsWon(true);
          }
        }, 600);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-calm-mist-dark text-white p-6 md:p-12 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Focus Match</h2>
          <p className="text-sm opacity-70">Find the calm pairs</p>
        </div>
        <button 
          onClick={initializeGame}
          className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-6 flex space-x-8 text-sm font-medium">
          <div className="bg-white/10 px-4 py-2 rounded-full">
            Moves: <span className="text-calm-green-light">{moves}</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full">
            Pairs: <span className="text-calm-green-light">{matches} / {EMOJIS.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md w-full">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square cursor-pointer perspective-1000"
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                {/* Front (Hidden) */}
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center backface-hidden">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                </div>
                
                {/* Back (Visible) */}
                <div className={`absolute inset-0 border rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden ${card.isMatched ? 'bg-calm-green/20 border-calm-green/50' : 'bg-white/20 border-white/30'}`}>
                  <span className="text-3xl md:text-4xl">{card.emoji}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-12 p-8 bg-white text-calm-green-dark rounded-3xl text-center shadow-2xl max-w-sm"
            >
              <div className="inline-flex p-4 bg-calm-green/10 rounded-full mb-4">
                <Trophy size={48} className="text-calm-green" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Peace Achieved!</h3>
              <p className="text-calm-mist-dark/70 mb-6">
                You found all pairs in {moves} moves. Your focus is becoming sharper.
              </p>
              <button
                onClick={initializeGame}
                className="w-full py-4 bg-calm-green text-white rounded-2xl font-semibold shadow-lg hover:bg-calm-green-dark transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};
