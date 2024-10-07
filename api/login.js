// api/login.js

const { RADIUSClient } = require('radius-client'); // Import the RADIUS client

const RADIUS_SERVER_IP = '103.255.234.130'; // Your RADIUS server IP
const RADIUS_SECRET = 'jazenetworks'; // Replace with your RADIUS shared secret

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body; // Get username and password from the request body

        const client = new RADIUSClient({
            host: RADIUS_SERVER_IP,
            secret: RADIUS_SECRET,
            timeout: 5000, // Set timeout
        });

        try {
            const isAuthenticated = await client.authenticate(username, password);
            if (isAuthenticated) {
                res.status(200).json({ message: 'Authenticated successfully' });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } catch (error) {
            console.error('RADIUS authentication error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
