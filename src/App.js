import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Create Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY,
  });

  const generateResponse = async () => {
    if (!prompt.trim()) {
      setResponse("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      // Use the current Gemini model with the Interactions API
      const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
      });

      // Get generated text
      setResponse(interaction.output_text);

    } catch (error) {
      console.error(error);
      setResponse("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Gemini AI App</h1>

      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generateResponse} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="response-box">
        <h3>Response</h3>
        <p>{response || "Gemini response will appear here."}</p>
      </div>
    </div>
  );
}

export default App;
