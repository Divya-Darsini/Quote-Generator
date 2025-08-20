import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Page.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, mood } = location.state || {};
  const [gifUrl, setGifUrl] = useState("");
  const audioRef = useRef(null);

  // Quotes
  const quotes = {
    happy: [
      "Keep shining, {name}! 🌟",
      "Happiness looks good on you, {name}! 😄",
      "{name}, your smile is contagious 😍"
    ],
    sad: [
      "Cheer up, {name}! Better days are coming 🌈",
      "{name}, even the darkest night will end and the sun will rise 🌞",
      "Stay strong, {name}! Tough times never last 💪"
    ],
    stressed: [
      "Take a deep breath, {name} 🧘",
      "One step at a time, {name} ✨",
      "Relax, {name}. Even WiFi disconnects sometimes 😆"
    ],
    angry: [
      "Cool down, {name}. Even volcanoes rest 🌋",
      "Breathe, {name}. Anger doesn’t solve problems 🕊️",
      "Smile, {name}. It confuses the negativity 😎"
    ],
    excited: [
      "Woohoo {name}! Ride the wave of excitement 🎉",
      "{name}, your energy is electric ⚡",
      "Stay awesome, {name}! 🚀"
    ]
  };

  // Background music based on mood
  const moodMusic = {
    happy: "/music/happy.mp3",
    sad: "/music/sad.mp3",
    stressed: "/music/calm.mp3",
    angry: "/music/chill.mp3",
    excited: "/music/party.mp3"
  };

  // Pick random quote
  let randomQuote = "";
  if (name && mood) {
    const moodQuotes = quotes[mood];
    randomQuote =
      moodQuotes[Math.floor(Math.random() * moodQuotes.length)].replace(
        "{name}",
        name
      );
  }

  // Fetch GIF from Giphy API
  useEffect(() => {
    async function fetchGif() {
      try {
        const res = await axios.get(
          `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${mood}`
        );
        setGifUrl(res.data.data.images.original.url);
      } catch (err) {
        console.error("Error fetching gif", err);
      }
    }
    if (mood) fetchGif();
  }, [mood]);

  // Play background music
  useEffect(() => {
    if (mood && moodMusic[mood]) {
      audioRef.current.src = moodMusic[mood];
      audioRef.current.play().catch(() => {}); // ignore autoplay issues
    }
  }, [mood]);

  return (
    <div className="page animated-bg">
      <h2>Here’s Your Quote ✨</h2>
      <p className="quote">“{randomQuote}”</p>

      {gifUrl && <img src={gifUrl} alt="funny gif" className="gif" />}

      <audio ref={audioRef} loop />

      <button onClick={() => navigate("/")}>🔙 Try Again</button>
    </div>
  );
}

export default Result;
