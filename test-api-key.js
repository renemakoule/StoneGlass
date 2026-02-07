const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function testKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Testing API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "NOT FOUND");

  if (!apiKey) {
    console.error("No API KEY found in .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("SUCCESS! API Key is working.");
    console.log("Response:", response.text());
  } catch (error) {
    console.error("FAILED. Reason:");
    console.error(error.message);
  }
}

testKey();
