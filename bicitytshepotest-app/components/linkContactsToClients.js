import { useState, useEffect } from "react";
import { supabase } from "@/db/lib";

function LinkContactsToClients({ onLinkContacts }) {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const fetchContacts = async () => {
        const { data, error } = await supabase.from("contacts").select("*");
        if (data) {
            setContacts(data);
        } else if (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const toggleContactSelection = (contactId) => {
        setSelectedContacts((prevSelected) =>
            prevSelected.includes(contactId)
                ? prevSelected.filter((id) => id !== contactId)
                : [...prevSelected, contactId]
        );
    };

    const handleLinkContacts = () => {
        const selectedContactsData = contacts.filter((contact) =>
            selectedContacts.includes(contact.id)
        );
        onLinkContacts(selectedContactsData);
    };

    return (
        <div className="flex flex-col items-center mt-[100px]">
            <table className="w-[700px] border border-gray-400 border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-[40px] border border-gray-400"></th>
                        <th className="px-6 py-2 text-left border border-gray-400">NAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">SURNAME</th>
                        <th className="px-6 py-2 text-left border border-gray-400">EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className="bg-white border border-gray-400">
                            <td className="w-[40px] text-center border border-gray-400">
                                <input
                                    type="checkbox"
                                    checked={selectedContacts.includes(contact.id)}
                                    onChange={() => toggleContactSelection(contact.id)}
                                    className="mt-[10px]"
                                />
                            </td>
                            <td className="px-6 py-2 border border-gray-400">{contact.name}</td>
                            <td className="px-6 py-2 border border-gray-400">{contact.surname}</td>
                            <td className="px-6 py-2 border border-gray-400">{contact.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleLinkContacts}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-[20px]"
            >
                Link Contacts to Clients
            </button>
        </div>
    );
}

export default LinkContactsToClients;