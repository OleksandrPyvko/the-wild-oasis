import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://mgfdvoonahixzupxwjhm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZmR2b29uYWhpeHp1cHh3amhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0Njc4MDEsImV4cCI6MjAyNTA0MzgwMX0.EiBpaE-2cP5h613dBJJjePUT95-3KLLYDQqGLsBSW4M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
