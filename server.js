require('dotenv').config();
const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI(); // Defaults to GEMINI_API_KEY from environment

// In-memory session store (for demonstration purposes)
const sessions = {};

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        let chat;
        // If sessionId is provided and exists in memory, use it, else create a new one
        const currentSessionId = sessionId || Math.random().toString(36).substring(7);

        if (sessions[currentSessionId]) {
            chat = sessions[currentSessionId];
        } else {
            chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'Eres Nagualito, un amable asistente virtual.'
                }
            });
            sessions[currentSessionId] = chat;
        }

        const response = await chat.sendMessage({ message });

        res.json({
            response: response.text,
            sessionId: currentSessionId
        });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
