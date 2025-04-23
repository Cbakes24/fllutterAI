/**
 * Supabase Client Configuration
 * 
 * This file sets up the Supabase client for the application, which provides:
 * - Database access
 * - Authentication
 * - Real-time subscriptions
 * - Storage capabilities
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
// These are set in your .env file and are required for connecting to your Supabase project
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Creates and exports a Supabase client instance
 * This client will be used throughout the application to interact with Supabase services
 * The client is configured with your project's URL and anonymous key
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
