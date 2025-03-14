const express = require('express');
const app = express();
app.use(express.json());

const activeUsers = new Map(); // Temporary storage (Use a database for persistent tracking)

app.post('/api/log-user', (req, res) => {
    const { userId, status } = req.body;
    
    if (status === 'joined') {
        activeUsers.set(userId, Date.now());
    } else if (status === 'left') {
        activeUsers.delete(userId);
    }

    res.json({ message: 'User status updated', activeUsers: [...activeUsers.keys()] });
});

app.get('/api/active-users', (req, res) => {
    res.json([...activeUsers.keys()]);
});

app.listen(3000, () => console.log('Server running on port 3000'));
