# IntelliPaat AI Chatbot 🤖

A clean, responsive, and modern web-based AI assistant powered by **LLaMA 3.1 (via the Groq API)**. Built entirely with vanilla HTML, CSS, and JavaScript, it requires zero build tools or package managers—just open and chat!

---

## ✨ Features

- **Direct API Integration**: Communicates directly with the ultra-fast Groq API.
- **LLaMA 3.1 Powered**: Uses the `llama-3.1-8b-instant` model for intelligent, context-aware responses.
- **Conversational Context**: Maintains message history during the session to enable continuous dialogue.
- **Modern UI/UX**:
  - Fully responsive layout that looks great on mobile, tablet, and desktop.
  - Smooth typing indicator.
  - Setup notices to guide user configuration.
  - Custom scrollbars and styling powered by the Inter font.
- **Zero Dependencies**: Pure HTML5, CSS3, and ES6+ JavaScript.

---

## 🛠️ Tech Stack

- **Structure**: [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **Styling**: [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (using custom CSS variables, flexbox layouts, and custom scrollbar properties)
- **Logic**: [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (ES6+ features, Fetch API, Async/Await)
- **Fonts**: [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)
- **Icons**: [FontAwesome 6](https://fontawesome.com/)

---

## 🚀 Quick Start

Follow these simple steps to run the chatbot locally:

### 1. Obtain a Groq API Key
1. Go to the [Groq Console](https://console.groq.com/).
2. Create an account or sign in.
3. Navigate to the **API Keys** section and generate a new key.

### 2. Configure the Project
1. Open the [script.js](file:///Users/pranav/PRNV/Programs/ChatBot/script.js) file.
2. Find the configuration block at the top:
   ```javascript
   // REPLACE 'YOUR_GROQ_API_KEY_HERE' WITH YOUR ACTUAL GROQ API KEY
   const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE';
   ```
3. Replace the empty string or placeholder with your actual Groq API key:
   ```javascript
   const GROQ_API_KEY = 'gsk_...';
   ```

### 3. Run the Chatbot
Simply double-click the [index.html](file:///Users/pranav/PRNV/Programs/ChatBot/index.html) file to open it in your favorite web browser, or serve it using an extension like Live Server in VS Code.

---

## 📁 File Structure

```text
ChatBot/
├── index.html   # Main page layout and structural elements
├── style.css    # Responsive styling, layout, and visual components
├── script.js   # Chatbot engine, event handlers, and Groq API connector
└── README.md    # Project documentation (this file)
```

---

## ⚠️ Security Note

> [!WARNING]
> Since this is a client-side only application, your API key is stored in the frontend codebase (`script.js`). **Do not deploy this app to public web servers or share the code containing your active API key**, as others could inspect the page source and view your key. For production environments, it is recommended to proxy requests through a secure backend server.
