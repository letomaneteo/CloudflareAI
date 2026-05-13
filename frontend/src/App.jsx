import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setOutput("");

    const res = await fetch(
      "https://stopaifake.letomaneteo.workers.dev/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: input })
      }
    );

    const data = await res.json();

    setOutput(data.response || JSON.stringify(data));
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>AI Chat</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        style={{ width: "100%" }}
      />

      <button onClick={send} disabled={loading || !input}>
        {loading ? "Loading..." : "Send"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {output}
      </pre>
    </div>
  );
}
