import { createClient } from '@supabase/supabase-js';

// You'll need to replace these with your actual Supabase credentials
// Get these from: https://app.supabase.com/project/_/settings/api
const supabaseUrl = 'https://afystghocccbaqadnbpi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeXN0Z2hvY2NjYmFxYWRuYnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDE3NDAsImV4cCI6MjA3OTAxNzc0MH0.46xWHK28B9wnfPRDGUNlm5qaWQHA4sFr4gqLbxsyakw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
