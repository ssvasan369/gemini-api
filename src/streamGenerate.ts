// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables
dotenv.config();

// Define the type for chunks, assuming it contains a 'text' property
interface StreamChunk {
  text: string;
}

// Initialize readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an async function to generate content with streaming response
const generateStoryWithStream = async (userPrompt: string) => {
  try {
    // Ensure the API key exists
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing in environment variables.");
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Specify the model to use
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Get the stream result (assuming it provides a way to register event handlers)
    const streamingResp = await model.generateContentStream(userPrompt);

    // Handle the stream data
    for await (const item of streamingResp.stream) {
      if (item?.text) {
        console.log(item.text()); // Display each chunk of text as it streams
      }
    }

  } catch (error) {
    // Handle any errors
    console.error("Error generating content:", error);
  } finally {
    rl.close(); // Ensure readline closes after completion
  }
};

// Start by prompting the user for input
rl.question("Please enter a prompt: ", (userPrompt) => {
  generateStoryWithStream(userPrompt);
});
