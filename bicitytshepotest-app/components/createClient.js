import { supabase } from '@/db/lib';
import { useState } from 'react';

export default function CreateClient() {
  const [clientName, setClientName] = useState('');
  const [clientCode, setClientCode] = useState('');

  const handleCreateClient = async (e) => {
    e.preventDefault();

    const generatedCode = await generateClientCode(clientName);
    setClientCode(generatedCode);

    // Send POST request to our API endpoint
    const res = await fetch('/api/addClient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: clientName, clientCode: generatedCode }),
    });

    const result = await res.json();

    if (result.success) {
      alert('Client created successfully');
      setClientName('');
      setClientCode('');
    } else {
      alert(`Error: ${result.error}`);
      console.error(result.error);
    }
  };

  const generateClientCode = async (clientName) => {
    const prefix = clientName.slice(0, 3).toUpperCase().padEnd(3, 'A');
    let code;
    for (let i = 1; ; i++) {
      const numPart = String(i).padStart(3, '0');
      const proposedCode = `${prefix}${numPart}`;
      const { data } = await supabase
        .from('clients')
        .select('client_code')
        .eq('client_code', proposedCode);
      if (!data || data.length === 0) {
        code = proposedCode;
        break;
      }
    }
    return code;
  };

  return (
    <div className='w-[350px] ml-[75px] mt-[50px]'>
      <form onSubmit={handleCreateClient} className="space-y-4 bg-gray-100 p-4 rounded shadow-md">
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Client
        </button>

        {clientCode && <p className="text-sm text-gray-500">Client Code: {clientCode}</p>}
      </form>

    </div>
  );
}
