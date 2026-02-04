import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DebugPage() {
  const [authState, setAuthState] = useState<any>(null);
  const [dataState, setDataState] = useState<any>(null);

  useEffect(() => {
    const runTests = async () => {
      console.log('=== STARTING DIAGNOSTIC TESTS ===');

      // Test 1: Check Supabase client configuration
      console.log('1. Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('1. Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

      // Test 2: Check current session
      const { data: { session } } = await supabase.auth.getSession();
      console.log('2. Current session:', session ? 'EXISTS' : 'NULL');
      console.log('2. User:', session?.user?.email);

      setAuthState({
        hasSession: !!session,
        userEmail: session?.user?.email,
        userId: session?.user?.id,
      });

      // Test 3: Try to fetch data
      console.log('3. Attempting to fetch fakultas...');

      const { data, error, status, statusText } = await supabase
        .from('fakultas')
        .select('*');

      console.log('3. Response status:', status, statusText);
      console.log('3. Data:', data);
      console.log('3. Error:', error);

      setDataState({ data, error, status, statusText });

      // Test 4: Try direct REST API call
      const session2 = await supabase.auth.getSession();
      if (session2.data.session) {
        const token = session2.data.session.access_token;
        console.log('4. Making direct REST call with token...');

        try {
          const response = await fetch('https://qpuguqqbpcolbkbdyban.supabase.co/rest/v1/fakultas?select=*', {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${token}`,
            },
          });
          const json = await response.json();
          console.log('4. Direct REST response:', json);
        } catch (err) {
          console.error('4. Direct REST error:', err);
        }
      }

      console.log('=== TESTS COMPLETE ===');
    };

    runTests();
  }, []);

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Debug Page - Full Diagnostic</h1>

      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="font-bold text-lg mb-2">1. Authentication State</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(authState, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold text-lg mb-2">2. Data Fetch Result</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(dataState, null, 2)}
          </pre>
        </div>

        <div className="border p-4 rounded bg-yellow-50">
          <h2 className="font-bold text-lg mb-2">3. Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open browser Console (F12)</li>
            <li>Look for "=== STARTING DIAGNOSTIC TESTS ===" in console</li>
            <li>Screenshot ALL console output</li>
            <li>Screenshot this page showing the JSON data above</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
