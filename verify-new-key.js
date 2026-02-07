const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function verify() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Key being used:", apiKey ? apiKey.substring(0, 8) + "..." : "NONE");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    console.log("Attempting to generate content...");
    const result = await model.generateContent("Hello");
    console.log("Success! Response:", result.response.text());
  } catch (e) {
    console.log("Error Type:", e.status || "Unknown");
    console.log("Error Message:", e.message);
    
    if (e.message.includes("404")) {
        console.log("\nDIAGNOSIS: The API Key is valid, but cannot access 'gemini-1.5-flash'.");
        console.log("Cause: 'Generative Language API' is not enabled on this Google Cloud Project.");
    }
  }
}

verify();
