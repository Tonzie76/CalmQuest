import { createClient } from '@supabase/supabase-base';

// These would normally come from environment variables
// For the new owner: Create a Supabase project and paste your keys here or in a .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * README for the buyer:
 * 
 * To enable real backend functionality:
 * 1. Go to supabase.com and create a new project.
 * 2. In Project Settings > API, copy the Project URL and anon key.
 * 3. Create a .env file in the root directory:
 *    VITE_SUPABASE_URL=https://your-project-id.supabase.co
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 * 4. Run the SQL scripts in /supabase/migrations (to be created) to set up tables.
 * 5. Update useAuthStore.ts to use the supabase client instead of mock logic.
 */
