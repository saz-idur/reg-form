import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for type safety
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  // In development, provide a helpful error message
  if (process.env.NODE_ENV === "development") {
    console.error("Error: Missing Supabase environment variables. Please check your .env.local file.")
  }
  // In production, log a generic error to avoid exposing sensitive information
  else {
    console.error("Error: Missing required environment variables.")
  }
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || "", // Fallback to empty string to prevent runtime errors
  supabaseKey || "", // Fallback to empty string to prevent runtime errors
)

