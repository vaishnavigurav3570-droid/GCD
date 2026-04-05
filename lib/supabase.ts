// Supabase client setup for AgriVision Dashboard
// Using provided credentials from environment

export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !key) {
    console.warn(
      'Supabase credentials not found in environment variables. Using mock mode.'
    );
  }

  return {
    url,
    key,
  };
};

// Note: Full Supabase client integration would require:
// 1. Installing @supabase/supabase-js
// 2. Creating auth context for user sessions
// 3. Setting up real-time listeners for data updates
// 4. Implementing Row Level Security (RLS) policies

// For now, the application uses mock data and can be enhanced with real Supabase integration later.

// Example of how to initialize Supabase client:
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export default supabase
*/
