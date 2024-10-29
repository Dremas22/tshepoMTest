import CreateClient from "./createClient"
import { useState } from "react";
import CreateContact from "./createContact";

function HomePage() {

    const [activeTab, setActiveTab] = useState('general');
    const [isCreateClient, setIsCreateClient] = useState();
    const [isCreateContact, setCreateContact] = useState();
    const [isCreateButtons, SetIsCreateButtons] = useState(true);

    function handleToggleTabs(tab) {
        setActiveTab(tab);
    }

    function showCreateClientForm() {
        setIsCreateClient(true);
        setCreateContact(false);
        SetIsCreateButtons(false);
    }
    function showCreateContactForm() {
        setCreateContact(true)
        setIsCreateClient(false);
        SetIsCreateButtons(false);
    }
    function handleBack() {
        setIsCreateClient(false);
        setCreateContact(false);
        SetIsCreateButtons(true);
    }

    return (
        <div className="m-[10px] w-[400px] bg-yellow-300 ml-[500px]">
            <div className="flex items-center bg-lightgray-500 mt-[100px] ml-[5px] w-[300px] ">
                <div
                    className={`tab1 ml-[60px] cursor-pointer
                        ${activeTab === 'general' ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleTabs('general')}
                >
                    General
                </div>
                <div
                    className={`tab1 ml-[60px] cursor-pointer
                        ${activeTab === 'clients' ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleTabs('clients')}
                >
                    Clients
                </div>
                <div
                    className={`tab1 ml-[60px] cursor-pointer
                        ${activeTab === 'contacts' ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleTabs('contacts')}
                >
                    Contacts
                </div>
            </div>

            {activeTab === 'general' && (
                <div className="flex flex-col items-center mt-4 mr-[150px]">

                    {isCreateButtons && (
                        <div className="ml-[50px]">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={showCreateClientForm}
                            >
                                Create client</button>

                            <button className="px-4 py-2 bg-blue-600 mt-[10px] text-white 
                            rounded hover:bg-blue-700"
                                onClick={showCreateContactForm}
                            >
                                Create contacts</button>
                        </div>
                    )}


                    {isCreateClient && (
                        <div className="ml-[80px]">
                            <CreateClient />
                            <button className="px-4 py-2 bg-blue-600 mt-[20px] 
                            text-white rounded hover:bg-blue-700 ml-[90px] mb-[20px]"
                                onClick={handleBack}
                            >
                                Back</button>
                        </div>
                    )}

                    {isCreateContact && (
                        <div className="ml-[20px]">
                            <CreateContact />
                            <button className="px-4 py-2 bg-blue-600 mt-[20px] 
                            text-white rounded hover:bg-blue-700 ml-[140px] mb-[20px]"
                                onClick={handleBack}
                            >
                                Back</button>
                        </div>
                    )}
                </div>

            )}

            {activeTab === 'clients' && (
                <div className="mt-4">
                    No clients found
                </div>
            )}

            {activeTab === 'contacts' && (
                <div className="mt-4">
                    No contacts found
                </div>
            )}
        </div>
    );
}

export default HomePage;
