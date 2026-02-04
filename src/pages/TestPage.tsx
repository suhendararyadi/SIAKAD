import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    console.log('TestPage mounted - fetching data...');

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Starting fetch...');

        const { data: result, error: err } = await supabase
          .from('fakultas')
          .select('*');

        console.log('Fetch complete:', { result, err });

        if (err) {
          setError(err);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error('Catch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page - Direct Supabase Call</h1>

      <div className="space-y-4">
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>

        {error && (
          <div className="bg-red-100 p-4 rounded">
            <strong>Error:</strong>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}

        {data && (
          <div className="bg-green-100 p-4 rounded">
            <strong>Data ({data.length} records):</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
