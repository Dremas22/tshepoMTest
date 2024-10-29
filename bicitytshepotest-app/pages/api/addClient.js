import { supabase } from "@/db/lib";

 async function handler(req, res) {
    if (req.method === 'POST') {
        const { Name, clientCode, numberOfContacts } = req.body;

        try {
            const { data, error } = await supabase
                .from('clients')
                .insert([{ Name, clientCode: clientCode }]);
            
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