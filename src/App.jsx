const React = window.React;
import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch(
      "https://broken-waterfall-4c89.letomaneteo.workers.dev",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      }
    );

    const data = await res.json();

    const botMessage = {
      role: "bot",
      text: data.response || JSON.stringify(data)
    };

    setMessages([...newMessages, botMessage]);
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.bubble,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#2563eb" : "#e5e7eb",
              color: m.role === "user" ? "white" : "#111",
              fontSize: 16
            }}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.bubble, alignSelf: "flex-start" }}>
            thinking...
          </div>
        )}
      </div>

      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Напиши сообщение..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button onClick={send} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
    background: "#e5e7eb"
  },

  chat: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflowY: "auto"
  },

  bubble: {
    padding: "12px 16px",
    borderRadius: 14,
    maxWidth: "75%",
    whiteSpace: "pre-wrap",
    fontSize: 16
  },

  inputBar: {
    display: "flex",
    padding: 14,
    gap: 10,
    background: "#f9fafb",
    borderTop: "1px solid #d1d5db",
    position: "sticky",
    bottom: 0
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 16
  },

  button: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: 16
  }
};
