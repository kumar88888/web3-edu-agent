# Web3 Technical Education AI Agent

An AI-powered agent that takes a Web3 project name or technical concept, processes it using Google's Gemini API, and generates a comprehensive set of interactive learning materials to simplify complex topics.

![Screenshot of the Web3 Technical Education AI Agent UI](https://i.imgur.com/example.png) 
*(Note: This is a placeholder image representing the application's interface.)*

## ✨ Core Features

-   **AI-Powered Content Generation**: Enter any Web3 topic (e.g., "Solana," "Zero-Knowledge Proofs," "Uniswap v3") and receive a full educational module in seconds.
-   **Multi-Format Learning**: Caters to different learning styles by generating:
    -   **Overview**: A concise summary and list of key concepts.
    -   **Interactive Carousels**: Step-by-step visual breakdowns of core ideas (Definition, Analogy, Technical Details, Code, Use Case).
    -   **Dynamic Flashcards**: Key terms with explanations tailored for Beginner, Intermediate, and Advanced levels.
    -   **Learning Scenarios**: Narrative walkthroughs that guide users through real-world problems and solutions.
    -   **Glossary**: A quick-reference list of important terms and their definitions.
-   **Structured & Reliable Output**: Leverages Gemini's JSON mode with a strict response schema to ensure the generated content is always well-formatted and ready to be rendered.
-   **Sleek & Responsive UI**: A clean, modern interface built with React and Tailwind CSS that works seamlessly across devices.

## 🚀 How It Works

1.  **User Input**: The user enters a Web3 project or concept into the input field.
2.  **API Request**: The application sends the user's input to the Google Gemini API (`gemini-2.5-flash` model).
3.  **AI Processing**: A detailed prompt instructs the AI to act as a world-class Web3 educator. It analyzes the topic and generates a structured JSON object containing all the educational materials.
4.  **Structured Response**: The request specifies a `responseSchema`, forcing the AI to return a predictable and valid JSON structure.
5.  **Dynamic Rendering**: The frontend receives the JSON data and dynamically renders the various learning components (Carousels, Flashcards, etc.) into a clean, tabbed interface for the user to explore.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **AI Model**: Google Gemini API (`@google/genai`)
-   **Module Bundling**: The project is set up to use modern ES modules, imported directly in the browser via an import map.

## ⚙️ Getting Started

### Prerequisites

-   A modern web browser.
-   A Google Gemini API Key.

### Running the Project

This project is designed to run directly in a modern web development environment that supports environment variable injection for the API key.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/web3-edu-agent.git
    cd web3-edu-agent
    ```

2.  **Set up your API Key:**
    The application expects the Google Gemini API key to be available as `process.env.API_KEY`. You will need to configure your development server (e.g., using a `.env` file with a tool like Vite) to make this variable accessible to the frontend code.

    Create a `.env` file in the project root:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

3.  **Install dependencies and run:**
    If you are using a standard Node.js setup with a dev server like Vite:
    ```bash
    npm install
    npm run dev
    ```

4.  **Open in Browser:**
    Open the local development server URL (e.g., `http://localhost:5173`) in your browser.

## 📂 File Structure

```
/
├── public/
│   └── ... (static assets)
├── src/
│   ├── components/
│   │   ├── Carousel.tsx
│   │   ├── Flashcard.tsx
│   │   ├── Icons.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ScenarioViewer.tsx
│   │   └── Tabs.tsx
│   ├── services/
│   │   └── geminiService.ts  # Logic for interacting with the Gemini API
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   └── index.tsx             # React entry point
├── .env                      # Environment variables (API key)
├── index.html                # Main HTML file
└── readme.md                 # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs, feature requests, or suggestions.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
# web3-edu-agent
# web3-edu-agent
