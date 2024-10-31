// import { supabase } from "@/db/lib";

//  async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, surname, email } = req.body;

//         try {
//             const { data, error } = await supabase
//                 .from('contacts')
//                 .insert([{ name, surname, email }]);
            
//             if (error) throw error;

//             res.status(200).json({ success: true, data });
//         } catch (error) {
//             res.status(400).json({ success: false, error: error.message });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

// export default handler;

// pages/api/addContacts.js

import { supabase } from "@/db/lib";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, surname, email } = req.body;

        // Basic validation
        if (!name || !surname || !email) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // Email format validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email format' });
        }

        try {
            // Check if email already exists
            const { data: existingContacts, error: fetchError } = await supabase
                .from('contacts')
                .select('*')
                .eq('email', email);

            if (fetchError) {
                throw fetchError;
            }

            // Check if any contacts with the same email exist
            if (existingContacts && existingContacts.length > 0) {
                return res.status(400).json({ success: false, error: 'Email already exists' });
            }

            // Insert new contact
            const { data, error } = await supabase
                .from('contacts')
                .insert([{ name, surname, email }]);

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
