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
      "https://stopaifake.letomaneteo.workers.dev/api",
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
              color: m.role === "user" ? "white" : "black"
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
    background: "#f3f4f6"
  },
  chat: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto"
  },
  bubble: {
    padding: "10px 14px",
    borderRadius: 12,
    maxWidth: "70%",
    whiteSpace: "pre-wrap"
  },
  inputBar: {
    display: "flex",
    padding: 10,
    gap: 10,
    background: "white",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  }
};
