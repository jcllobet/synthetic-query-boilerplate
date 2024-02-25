import R2RClient from "./R2RClient";
import { v5 as uuidv5 } from "uuid";

const baseUrl = "http://localhost:8000"; // Change this to your actual API base URL
const client = new R2RClient(baseUrl);
const NAMESPACE_DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // Directly define the DNS namespace UUID

// Function to generate a user_id based on a user index
const generateUserId = (userIndex: number): string => {
  return uuidv5(`user_${userIndex}`, NAMESPACE_DNS);
};

export async function uploadAndProcessFiles(
  filePaths: string[],
  titles: { [key: string]: string },
  settings: any
) {
  for (const filePath of filePaths) {
    console.log(`Uploading and processing file: ${filePath}`);
    const documentId = uuidv5(filePath, NAMESPACE_DNS); // Generate UUID v5 based on file path
    const metadata = {
      user_id: generateUserId(0), // This will generate a user_id for "user_0"
      chunk_prefix: titles[filePath],
    };

    console.log(
      `document_id: ${documentId} \nfile_path: ${filePath}\nmetadata: ${JSON.stringify(
        metadata
      )}\nsettings: ${JSON.stringify(settings)}\n`
    );
    const uploadResponse = await client.uploadAndProcessFile(
      documentId,
      filePath,
      metadata,
      settings
    );
    console.log(uploadResponse);
  }
}
