import { useState } from "react";
import LinkContactsToClients from "./linkContactsToClients";

function ClientTable({ clients }) {
    const [linkContacts, setLinkContacts] = useState(false);
    const [activeClientCode, setActiveClientCode] = useState(null); // Track which client to link contacts to
    const [linkedContactsCount, setLinkedContactsCount] = useState(
        clients.reduce((acc, client) => ({ ...acc, [client.clientCode]: 0 }), {})
    ); // Initialize counts by clientCode

    const linkContactsToClients = (clientCode) => {
        setLinkContacts(true);
        setActiveClientCode(clientCode); // Set the active client being edited
    };

    const handleLinkContacts = (selectedContacts) => {
        setLinkedContactsCount((prev) => ({
            ...prev,
            [activeClientCode]: selectedContacts.length,
        }));
        setLinkContacts(false);
    };

    const handleBack = () => {
        setLinkContacts(false);
    }

    return (
        <div className="flex flex-col items-center mt-[80px]">
            <table className="w-[700px] border border-gray-400 border-collapse">
                <thead>
                    <tr className="bg-[#9d0208] text-white">
                        <th className="px-6 py-2 text-left border border-gray-400">NAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">CLIENT CODE</th>
                        <th className="px-6 py-2 text-left border border-gray-400">NO. OF LINKED CONTACTS</th>
                        <th className="px-6 py-2 text-left border border-gray-400"></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => (
                        <tr key={index} className="bg-white border border-gray-400">
                            <td className="px-6 py-2 border border-gray-400">{client.Name}</td>
                            <td className="px-6 py-2 border border-gray-400">{client.clientCode}</td>
                            <td className="px-6 py-2 border border-gray-400">{linkedContactsCount[client.clientCode] || 0}</td>
                            <td className="px-6 py-2 border border-gray-400">
                                <button onClick={() => linkContactsToClients(client.clientCode)}>
                                    Click here
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {linkContacts && (
                <div className="flex flex-col fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pb-[150px]">
                    <LinkContactsToClients onLinkContacts={handleLinkContacts} />
                    <button className="px-4 py-2 bg-[#9d0208] text-white rounded 
                        hover:bg-[#a4133c] mt-[20px] ml-[120px]"
                        onClick={handleBack}
                    >Back
                    </button>
                </div>
            )}
        </div>
    );
}

export default ClientTable;




