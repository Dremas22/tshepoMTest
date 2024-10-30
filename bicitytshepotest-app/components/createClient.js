import { useState } from "react";
import { supabase } from "@/db/lib";

export default function CreateClient({ switchToClientsTab }) {
  const [clientName, setClientName] = useState("");
  const [clientCode, setClientCode] = useState("");

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
      
      // Trigger the switch to Clients tab only after successful creation
      switchToClientsTab();
    } else {
      alert(`Error: ${result.error}`);
      console.error(result.error);
    }
  };

  const generateClientCode = async (clientName) => {
    const prefix = clientName.slice(0, 3).toUpperCase().padEnd(3, "A");

    let codeId;
    while (true) {
      const numPart = String(Math.floor(100 + Math.random() * 900));
      const proposedCode = `${prefix}${numPart}`;
      const { data } = await supabase
        .from("clients")
        .select("client_code")
        .eq("client_code", proposedCode);

      if (!data || data.length === 0) {
        codeId = proposedCode;
        break;
      }
    }
    return codeId;
  };

  return (
    <div className="w-[350px] ml-[75px] mt-[50px]">
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
          className="px-4 py-2 bg-[#c9184a] text-white rounded hover:bg-[#a4133c]"
        >
          Add Client
        </button>
        {clientCode && <p className="text-sm text-gray-500">Client Code: {clientCode}</p>}
      </form>
    </div>
  );
}
