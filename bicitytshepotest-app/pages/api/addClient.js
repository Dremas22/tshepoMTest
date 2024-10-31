import { supabase } from "@/db/lib";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { Name, clientCode, numberOfContacts } = req.body;

        try {
        
            const { data: existingClients, error: checkError } = await supabase
                .from('clients')
                .select("Name")
                .eq('Name', Name);

            if (checkError) throw checkError;

            if (existingClients.length > 0) {
                
                return res.status(400).json({ success: false, message: "Client with this name already exists" });
            }

            // Insert the new client if name is unique
            const { data, error } = await supabase
                .from('clients')
                .insert([{ Name, clientCode }]);
            
            if (error) throw error;

            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
