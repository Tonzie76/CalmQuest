import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronLeft, Trophy, HelpCircle } from 'lucide-react';

interface CalmPuzzleProps {
  onClose: () => void;
}

interface Tile {
  id: number;
  currentPos: number;
  correctPos: number;
}

const GRID_SIZE = 3; // 3x3 grid
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

export const CalmPuzzle: React.FC<CalmPuzzleProps> = ({ onClose }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600"; // Calming landscape

  const initializeGame = useCallback(() => {
    let newTiles: Tile[] = Array.from({ length: TOTAL_TILES }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i,
    }));

    // Shuffle by swapping random tiles multiple times
    // We don't use a simple sort so we can guarantee solvability in a slide puzzle, 
    // but in a swap puzzle any configuration is solvable.
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i].currentPos, newTiles[j].currentPos] = [newTiles[j].currentPos, newTiles[i].currentPos];
    }

    setTiles(newTiles);
    setSelectedTile(null);
    setMoves(0);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleTileClick = (id: number) => {
    if (isWon) return;

    if (selectedTile === null) {
      setSelectedTile(id);
    } else if (selectedTile === id) {
      setSelectedTile(null);
    } else {
      // Swap tiles
      const newTiles = [...tiles];
      const firstTileIndex = newTiles.findIndex(t => t.id === selectedTile);
      const secondTileIndex = newTiles.findIndex(t => t.id === id);
      
      const tempPos = newTiles[firstTileIndex].currentPos;
      newTiles[firstTileIndex].currentPos = newTiles[secondTileIndex].currentPos;
      newTiles[secondTileIndex].currentPos = tempPos;

      setTiles(newTiles);
      setSelectedTile(null);
      setMoves(prev => prev + 1);

      // Check if won
      const won = newTiles.every(t => t.currentPos === t.correctPos);
      if (won) {
        setIsWon(true);
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
          <h2 className="text-xl font-semibold">Calm Puzzle</h2>
          <p className="text-sm opacity-70">Restore the serene scene</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded-full transition-colors ${showPreview ? 'bg-calm-green text-white' : 'hover:bg-white/10'}`}
            title="Preview"
          >
            <HelpCircle size={24} />
          </button>
          <button 
            onClick={initializeGame}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Reset"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-6 flex space-x-8 text-sm font-medium">
          <div className="bg-white/10 px-4 py-2 rounded-full">
            Moves: <span className="text-calm-green-light">{moves}</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full">
            Status: <span className={isWon ? "text-calm-green-light" : "opacity-70"}>
              {isWon ? "Complete" : "In Progress"}
            </span>
          </div>
        </div>

        <div 
          className="relative grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-2xl overflow-hidden shadow-2xl"
          style={{ width: 'min(90vw, 400px)', height: 'min(90vw, 400px)' }}
        >
          {tiles.map((tile) => {
            const row = Math.floor(tile.correctPos / GRID_SIZE);
            const col = tile.correctPos % GRID_SIZE;
            const currentRow = Math.floor(tile.currentPos / GRID_SIZE);
            const currentCol = tile.currentPos % GRID_SIZE;

            return (
              <motion.div
                key={tile.id}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => handleTileClick(tile.id)}
                className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedTile === tile.id ? 'border-calm-green' : 'border-transparent'
                }`}
                style={{
                  gridRow: currentRow + 1,
                  gridColumn: currentCol + 1,
                }}
              >
                <div 
                  className="w-full h-full bg-cover"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
                    opacity: showPreview && !isWon ? 0.3 : 1,
                  }}
                />
                {tile.currentPos === tile.correctPos && !isWon && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-calm-green rounded-full shadow-sm" />
                )}
              </motion.div>
            );
          })}
          
          {/* Preview Overlay */}
          <AnimatePresence>
            {showPreview && !isWon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 p-1 pointer-events-none"
              >
                <div 
                  className="w-full h-full rounded-xl opacity-60 border-2 border-white/50"
                  style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-sm text-center opacity-60 max-w-xs">
          Tap two tiles to swap their positions. Match the pieces to reveal the full image.
        </p>

        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-8 p-6 bg-white text-calm-green-dark rounded-3xl text-center shadow-2xl max-w-sm"
            >
              <div className="inline-flex p-4 bg-calm-green/10 rounded-full mb-4">
                <Trophy size={40} className="text-calm-green" />
              </div>
              <h3 className="text-xl font-bold mb-1">Serenity Restored</h3>
              <p className="text-sm text-calm-mist-dark/70 mb-4">
                You completed the puzzle in {moves} moves. Take a moment to enjoy the scene.
              </p>
              <button
                onClick={initializeGame}
                className="w-full py-3 bg-calm-green text-white rounded-xl font-semibold shadow-lg hover:bg-calm-green-dark transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
