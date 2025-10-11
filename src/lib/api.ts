// API utility functions for calling edge functions
// This bypasses the Supabase client to avoid build issues

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://neywpwtpbdvaecvdvnco.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leXdwd3RwYmR2YWVjdmR2bmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDU4OTAsImV4cCI6MjA3NTQyMTg5MH0.kOemJcAyZgJyzvwuke1Q1btbsAG6A3WTs90WJva3By8';

export async function callEdgeFunction(functionName: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}
