import { useState, useEffect } from "react";
import CreateClient from "./createClient";
import ClientTable from "./clientTable";
import CreateContact from "./createContact";
import { supabase } from "@/db/lib"; // Import your supabase client
import ContactTable from "./contactTable";
import NavBar from "./navbar";

function HomePage() {
    const [activeTab, setActiveTab] = useState("general");
    const [isCreateClient, setIsCreateClient] = useState(false);
    const [isCreateContact, setIsCreateContact] = useState(false);
    const [isCreateButtons, setIsCreateButtons] = useState(true);
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (activeTab === "clients") {
            fetchClients();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === "contacts") {
            fetchContacts();
        }
    }, [activeTab]);

    const fetchClients = async () => {
        const { data, error } = await supabase.from("clients").select("*");
        if (data) {
            setClients(data);
        } else if (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const fetchContacts = async () => {
        const { data, error } = await supabase.from("contacts").select("*");
        if (data) {
            setContacts(data);
        } else if (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleToggleTabs = (tab) => {
        setActiveTab(tab);
    };

    const switchToClientsTab = () => {
        setActiveTab("clients");
    };

    const switchToContactsTab = () => {
        setActiveTab("contacts")
    }

    const showCreateClientForm = () => {
        setIsCreateClient(true);
        setIsCreateContact(false);
        setIsCreateButtons(false);
    };

    const showCreateContactForm = () => {
        setIsCreateContact(true);
        setIsCreateClient(false);
        setIsCreateButtons(false);
    };

    const handleBack = () => {
        setIsCreateClient(false);
        setIsCreateContact(false);
        setIsCreateButtons(true);
    };

    return (
        <div>
            <NavBar />
            <div className="m-[10px] w-[800px] bg-[#d9dcd6] ml-[400px] rounded-20 h-[500px]">
                <div className="flex items-center bg-lightgray-500 mt-[90px] mr-[150px] w-[400px] ">
                    <div
                        className={`tab1 bg-[#c2dfe3] cursor-pointer font-bold text-xl 
                        w-[100px] h-[40px] pl-[10px]`}
                        style={{ backgroundColor: activeTab === "general" ? "#d9dcd6" : "#f9f7f3" }}
                        onClick={() => handleToggleTabs("general")}
                    >
                        General
                    </div>
                    <div
                        className={`tab1 cursor-pointer font-bold text-xl w-[100px] h-[40px] pl-[10px]`}
                        style={{ backgroundColor: activeTab === "clients" ? "#d9dcd6" : "#f9f7f3" }}
                        onClick={() => handleToggleTabs("clients")}
                    >
                        Clients
                    </div>
                    <div
                        className={`tab1 cursor-pointer font-bold text-xl w-[100px] h-[40px] pl-[10px]`}
                        style={{ backgroundColor: activeTab === "contacts" ? "#d9dcd6" : "#f9f7f3" }}
                        onClick={() => handleToggleTabs("contacts")}
                    >
                        Contacts
                    </div>
                </div>

                {activeTab === "general" && (
                    <div className=" items-center mt-[60px] mr-[150px]">
                        {isCreateButtons && (
                            <div className="flex flex-col ml-[50px] mt-[20px] ">
                                <div className="flex items-center w-[700px]">
                                    <button
                                        className="px-4 py-2 bg-[#9d0208] text-white rounded hover:bg-[#a4133c] mt-[30px]"
                                        onClick={showCreateClientForm}
                                    >
                                        Create client
                                    </button>
                                    <p className="ml-[50px] mt-[20px] text-[#9d0208] font-bold text-xl">
                                        Click on the create client button to display the form
                                    </p>
                                </div>
                                <div className="flex items-center w-[700px]">
                                    <button
                                        className="px-4 py-2 bg-[#9d0208] mt-[50px] text-white rounded hover:bg-[#a4133c]"
                                        onClick={showCreateContactForm}
                                    >
                                        Create contacts
                                    </button>
                                    <p className="ml-[50px] mt-[40px] text-[#9d0208] font-bold text-xl">
                                        Click on the create contact button to display the form
                                    </p>
                                </div>
                            </div>
                        )}

                        {isCreateClient && (
                            <div className="ml-[80px]">
                                <CreateClient onClientCreated={fetchClients}
                                    switchToClientsTab={switchToClientsTab}
                                />
                                <button
                                    className="px-4 py-2 bg-[#9d0208] mt-[20px] text-white rounded hover:bg-[#a4133c] ml-[90px] mb-[20px]"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            </div>
                        )}

                        {isCreateContact && (
                            <div className="ml-[80px]">
                                <CreateContact onContactCreated={fetchContacts}
                                    switchToContactsTab={switchToContactsTab}
                                />
                                <button
                                    className="px-4 py-2 bg-[#9d0208] mt-[20px] text-white 
                                rounded hover:bg-[#a4133c] ml-[130px] mb-[20px]"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "clients" && (
                    <div className="mt-4">
                        {clients.length > 0 ? (
                            <ClientTable clients={clients} />
                        ) : (
                            <p className="ml-[50px] mt-[40px] text-[#9d0208] font-bold text-xl">
                                No Clients Found
                            </p>
                        )}
                    </div>
                )}

                {activeTab === "contacts" && (
                    <div className="mt-4">
                        {contacts.length > 0 ? (
                            <ContactTable contacts={contacts} />
                        ) : (
                            <p className="ml-[50px] mt-[40px] text-[#9d0208] font-bold text-xl">
                                No Contacts Found
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
