import { useState } from "react";
import { translateToFrench } from "./api";
import "./App.css";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [frenchText, setFrenchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const translation = await translateToFrench(englishText);
      setFrenchText(translation);
    } catch {
      setFrenchText("⚠️ Error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header className="header">
        <span className="logo" role="img" aria-label="translate">
          🌍
        </span>
        <h1 className="title">
          English <span className="arrow">→</span> French Translator
        </h1>
      </header>
      <textarea
        className="textarea"
        placeholder="Enter English text here..."
        value={englishText}
        onChange={(e) => setEnglishText(e.target.value)}
      />
      <button
        className="translate-btn"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner"></span>
        ) : (
          <span role="img" aria-label="translate">
            🔄
          </span>
        )}
        {loading ? "Translating..." : "Translate"}
      </button>
      <div className="output-box">
        <h2 className="output-title">
          <span role="img" aria-label="flag">
            🇫🇷
          </span>{" "}
          French Translation
        </h2>
        <p className="output-text">{frenchText}</p>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
