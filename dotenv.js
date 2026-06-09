// ==========================================
// 🌐 BROWSER-COMPATIBLE DOTENV MOCK
// ==========================================
// This helper allows client-side vanilla JavaScript to read .env files
// and populate process.env, mimicking standard Node.js behavior.

const dotenv = {
    config: async function() {
        // Initialize global process.env if not already present
        if (!window.process) window.process = {};
        if (!window.process.env) window.process.env = {};

        try {
            // Fetch the static .env file from the local server
            const response = await fetch('.env');
            if (!response.ok) {
                throw new Error(`Failed to load .env: ${response.statusText}`);
            }

            const text = await response.text();
            
            // Parse environment variables line-by-line
            text.split('\n').forEach(line => {
                // Ignore comments and empty lines
                if (line.trim().startsWith('#') || line.trim() === '') return;
                
                const parts = line.split('=');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    // Join back value parts in case the value itself contained "="
                    const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
                    
                    window.process.env[key] = value;
                }
            });

            return { parsed: window.process.env };
        } catch (error) {
            console.warn(
                "dotenv.js: Could not parse .env file.\n" +
                "Note: If running directly via file:// protocol, browsers block local file fetches due to CORS.\n" +
                "Please run via a local web server (e.g. VS Code Live Server) to read .env.",
                error
            );
            return { error };
        }
    }
};
