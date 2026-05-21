// ==========================================
// CONFIGURATION
// ==========================================
// REPLACE 'YOUR_GROQ_API_KEY_HERE' WITH YOUR ACTUAL GROQ API KEY
const GROQ_API_KEY = '';
const MODEL = 'llama-3.1-8b-instant'; // Free LLaMA 3 8B model on Groq

// ==========================================
// CHATBOT LOGIC
// ==========================================

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const setupNotice = document.getElementById('setup-notice');
const closeNoticeBtn = document.getElementById('close-notice');

// Check if API key is missing and show notice
if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE' || GROQ_API_KEY === '') {
    setTimeout(() => {
        setupNotice.classList.add('show');
    }, 1000);
}

closeNoticeBtn.addEventListener('click', () => {
    setupNotice.classList.remove('show');
});

// Auto-focus input
userInput.focus();

// Add event listeners
sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Message History to maintain context
let messageHistory = [
    { role: "system", content: "You are a helpful AI assistant. Keep your responses concise and engaging." }
];

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Clear input
    userInput.value = '';

    // Add user message to UI
    appendMessage('user', text);

    // Add to history
    messageHistory.push({ role: "user", content: text });

    // Show typing indicator
    const typingId = showTypingIndicator();

    // Fetch response from Groq API
    try {
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE' || GROQ_API_KEY === '') {
            throw new Error("Please add your Groq API key to the script.js file first.");
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messageHistory,
                temperature: 0.7,
                max_tokens: 1024,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        // Remove typing indicator
        removeMessage(typingId);

        // Add bot message to UI
        appendMessage('bot', botReply);

        // Add to history
        messageHistory.push({ role: "assistant", content: botReply });

    } catch (error) {
        // Remove typing indicator
        removeMessage(typingId);

        // Show error message
        appendMessage('bot', `⚠️ Error: ${error.message}`);
        console.error("Chatbot Error:", error);

        // Remove the failed user message from history so they can try again
        messageHistory.pop();
    }
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Simple rendering of newlines to <br> tags
    contentDiv.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.id = id;

    messageDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) {
        el.remove();
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Helper to prevent XSS
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
