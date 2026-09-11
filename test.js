const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.resolve(__dirname, 'nagualito_chat.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const dom = new JSDOM(htmlContent, {
  runScripts: "dangerously",
  resources: "usable"
});

const window = dom.window;
const document = window.document;

// Mock window.fetch for testing the API call
window.fetch = async (url, options) => {
    if (url === '/api/chat' && options.method === 'POST') {
        return {
            ok: true,
            json: async () => ({ reply: 'Soy Nagualito, tu asistente de IA.' })
        };
    }
    return { ok: false, status: 404 };
};

// We need to wait for DOMContentLoaded, but jsdom parses it synchronously.
// Let's just wait a small amount of time for the script to attach listeners.
setTimeout(() => {
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatHistory = document.getElementById('chat-history');

    // Simulate typing
    input.value = 'Hello Nagualito';

    // Simulate clicking send
    sendBtn.click();

    // Check if user message is added
    const messages = chatHistory.querySelectorAll('.message');
    let userMessageFound = false;
    for (let msg of messages) {
        if (msg.classList.contains('user-message') && msg.textContent === 'Hello Nagualito') {
            userMessageFound = true;
            break;
        }
    }

    if (!userMessageFound) {
        console.error('Test failed: User message not found in chat history.');
        process.exit(1);
    }

    // Since fetch is async, we give it a moment to resolve and update the DOM
    setTimeout(() => {
        const messagesAfter = chatHistory.querySelectorAll('.message');
        let nagualitoMessageFound = false;
        for (let msg of messagesAfter) {
            if (msg.classList.contains('nagualito-message') && msg.textContent.includes('Soy Nagualito, tu asistente de IA.')) {
                nagualitoMessageFound = true;
                break;
            }
        }

        if (!nagualitoMessageFound) {
            console.error('Test failed: Nagualito message not found in chat history.');
            process.exit(1);
        }

        console.log('Test passed successfully: Both user and Nagualito messages are added via fetch.');
        process.exit(0);

    }, 500);

}, 100);
