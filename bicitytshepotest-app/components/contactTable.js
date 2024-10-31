import { useState } from "react";
import LinkClientsToContacts from "./linkClientsToContatcts";

function ContactTable({ contacts }) {

    const [linkClients, setLinkClients] = useState(false);
    const [activeEmail, setActiveEmail] = useState(null); // Track which client to link contacts to
    const [linkedClientsCount, setLinkedClientsCount] = useState(
        contacts.reduce((acc, contact) => ({ ...acc, [contact.email]: 0 }), {})
    ); // Initialize counts by clientCode

    const linkClientsToContacts = (email) => {
        setLinkClients(true);
        setActiveEmail(email); // Set the active client being edited
    };

    const handleLinkClients = (selectedClients) => {
        setLinkedClientsCount((prev) => ({
            ...prev,
            [activeEmail]: selectedClients.length,
        }));
        setLinkClients(false);
    };

    const handleBack = () => {
        setLinkClients(false);
    }

    return (
        <div className="flex flex-col items-center mt-[80px]">
            <table className="w-[700px] border border-gray-400 border-collapse">
                <thead>
                    <tr className="bg-[#9d0208] text-white">
                        <th className="px-6 py-2 text-left border border-gray-400">NAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">SURNAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">EMAIL</th>
                        <th className="px-6 py-2 text-left border border-gray-400"></th>
                        <th className="px-6 py-2 text-left border border-gray-400"></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index} className="bg-white border border-gray-400">
                            <td className="px-6 py-2 border border-gray-400">{contact.name}</td>
                            <td className="px-6 py-2 border border-gray-400">{contact.surname}</td>
                            <td className="px-6 py-2 border border-gray-400">{contact.email}</td>
                            <td className="px-6 py-2 border border-gray-400">
                                {linkedClientsCount[contact.email] || 0}
                                </td>
                            <td className="px-6 py-2 border border-gray-400">
                                <button onClick={() => linkClientsToContacts(contact.email)}>
                                    Click here
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {linkClients && (
                <div className=" flex flex-col fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pb-[150px]">
                    <LinkClientsToContacts onLinkClients={handleLinkClients} />
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

export default ContactTable;

