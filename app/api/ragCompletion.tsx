import R2RClient from "./R2RClient";

const baseUrl = "http://localhost:8000"; // Change this to your actual API base URL
const client = new R2RClient(baseUrl);

const user_id_0 = "user_0"; // Simplified for TypeScript. Consider generating UUIDs as needed.

async function performRagCompletion() {
  const prompt =
    "You are given a user query {query} and a user context {context}. Use the context to answer the given query.";
  const formattedPrompt = prompt
    .replace("{query}", "What are the key themes of these books?")
    .replace(
      "{context}",
      "User Uploads:\nTitle: Meditations - Marcus Aurelius\nTitle: The Republic - Plato"
    );

  const searchResponse = await client.ragCompletion(formattedPrompt, 5, {
    user_id: user_id_0,
  });
  console.log(searchResponse);
}
