import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

const callGemini = async () => {
  setLoading(true);
  try {
    const res = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
    process.env.REACT_APP_GEMINI_API_KEY,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: input }],
        },
      ],
    }),
  }
);

    const data = await res.json();
    console.log("Full API response:", data);

    if (data.error) {
      setResponse("Error: " + data.error.message);
    } else {
      setResponse(
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text found"
      );
    }
  } catch (err) {
    console.error(err);
    setResponse("Error: " + err.message);
  }
  setLoading(false);
};

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Gemini React Demo</h1>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your prompt..."
      />
      <br />
      <button onClick={callGemini} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
