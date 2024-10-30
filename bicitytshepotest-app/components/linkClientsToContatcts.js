import { useState, useEffect } from "react";
import { supabase } from "@/db/lib";

function LinkClientsToContacts({ onLinkClients }) {
    const [clients, setClients] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);

    const fetchClients = async () => {
        const { data, error } = await supabase.from("clients").select("*");
        if (data) {
            setClients(data);
        } else if (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const toggleClientsSelection = (clientId) => {
        setSelectedClients((prevSelected) =>
            prevSelected.includes(clientId)
                ? prevSelected.filter((id) => id !== clientId)
                : [...prevSelected, clientId]
        );
    };

    const handleLinkClients = () => {
        const selectedClientsData = clients.filter((client) =>
            selectedClients.includes(client.id)
        );
        onLinkClients(selectedClientsData);
    };

    return (
        <div className="flex flex-col items-center mt-[100px]">
            <table className="w-[700px] border border-gray-400 border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-[40px] border border-gray-400"></th>
                        <th className="px-6 py-2 text-left border border-gray-400">NAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">CLIENT CODE</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="bg-white border border-gray-400">
                            <td className="w-[40px] text-center border border-gray-400">
                                <input
                                    type="checkbox"
                                    checked={selectedClients.includes(client.id)}
                                    onChange={() => toggleClientsSelection(client.id)}
                                    className="mt-[10px]"
                                />
                            </td>
                            <td className="px-6 py-2 border border-gray-400">{client.Name}</td>
                            <td className="px-6 py-2 border border-gray-400">{client.clientCode}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleLinkClients}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-[20px]"
            >
                Link Clients to Contacts
            </button>
        </div>
    );
}

export default LinkClientsToContacts;
