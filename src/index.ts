// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables
dotenv.config();

// Initialize readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an async function to generate content
const generateStory = async (userPrompt: string) => {
  try {
    // Ensure the API key exists
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing in environment variables.");
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Specify the model to use
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the content based on the user's prompt
    const result = await model.generateContent(userPrompt);

    // Log the generated story
    console.log("\nGenerated Story:\n", result.response.text());
  } catch (error) {
    // Handle any errors
    console.error("Error generating content:", error);
  } finally {
    // Close the readline interface
    rl.close();
  }
};

// Start by prompting the user for input
rl.question("Please enter a prompt: ", (userPrompt) => {
  generateStory(userPrompt);
});
