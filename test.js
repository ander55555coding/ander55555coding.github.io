const express = require("express");
const fs = require("fs");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config();

const app = express();

app.use(express.json());

const apiKey = process.env.KEY;

// Proxy setup
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000', // Target server
    changeOrigin: true,
}));



app.get("/gs/frontend", (req, res) => {
    const key = req.query.key;

    if (key === apiKey) {
        fs.readFile('Frontend.js', "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error reading file" });
            }
            res.status(200).json({ gs: `${data}` });
        });
    } else {
        res.status(403).json({ message: "Forbidden: Invalid API key" });
    }
});

app.get("/gs/backend", (req, res) => {
    const key = req.query.key;

    if (key === apiKey) {
        fs.readFile('Backend.js', "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Error reading file" });
            }
            res.status(200).json({ gs: `${data}` });
        });
    } else {
        res.status(403).json({ message: "Forbidden: Invalid API key" });
    }
});

app.get("/gs/o", (req, res) => {
    const key = req.query.key;

    if (key === apiKey) {
        res.status(200).json({ "O": "jand758@stu.op97.org" });
    } else {
        res.status(403).json({ message: "Forbidden: Invalid API key" });
    }
});

// Listen on all available network interfaces on the specified port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});