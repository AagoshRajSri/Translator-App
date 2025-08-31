require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.HF_API_KEY; // Hugging Face API key

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-fr",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    const translation =
      response.data && response.data[0] && response.data[0].translation_text
        ? response.data[0].translation_text
        : response.data;

    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
