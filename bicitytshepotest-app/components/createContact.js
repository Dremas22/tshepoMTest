import { useState } from "react";

function CreateContact() {

    const [contactName, setContactName] = useState('');
    const [contactSurname, setContactSurname] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const handleCreateContact = async (e) => {
        e.preventDefault();

        // Send POST request to our API endpoint
        const res = await fetch('/api/addContact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactName,
                surname: contactSurname,
                email: contactEmail
            }),
        });

        const result = await res.json();

        if (result.success) {
            alert('Contact created successfully');
            setContactName('');
            setContactSurname('');
            setContactEmail('');

        } else {
            alert(`Error: ${result.error}`);
            console.error(result.error);
        }
    };
    return (
        <div className='w-[350px] ml-[120px] mt-[50px]'>
            <form onSubmit={handleCreateContact} className="space-y-4 bg-gray-100 p-4 
            rounded shadow-md">
                <input
                    type="text"
                    placeholder="Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={contactSurname}
                    onChange={(e) => setContactSurname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Contact
                </button>
            </form>
        </div>
    )
}
export default CreateContact;