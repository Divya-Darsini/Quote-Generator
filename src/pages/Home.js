import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

function Home() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && mood) {
      navigate("/result", { state: { name, mood } });
    } else {
      alert("Please enter your name and select a mood!");
    }
  };

  return (
    <div className="page home-bg">
      <h1 className="title">🌟 Mood-Based Quote Generator 🌟</h1>
      <p className="subtitle">Tell us how you feel, and we’ll cheer you up ✨</p>

      <div className="card">
        <input
          type="text"
          placeholder="👤 Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">-- 🎉 Select Mood --</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="stressed">😰 Stressed</option>
          <option value="angry">😡 Angry</option>
          <option value="excited">🤩 Excited</option>
        </select>
        <button onClick={handleSubmit}>✨ Show My Quote ✨</button>
      </div>
    </div>
  );
}

export default Home;
