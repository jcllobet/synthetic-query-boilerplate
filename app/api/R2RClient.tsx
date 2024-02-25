class R2RClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async uploadAndProcessFile(
    documentId: string,
    file: File, // Adjust to accept a File object
    metadata: any,
    settings: any
  ) {
    const formData = new FormData();
    formData.append("documentId", documentId);
    formData.append("file", file, file.name); // Append the file object
    formData.append("metadata", JSON.stringify(metadata)); // Ensure metadata is a string
    formData.append("settings", JSON.stringify(settings)); // Ensure settings is a string

    const response = await fetch(`${this.baseUrl}/upload_and_process_file/`, {
      // Ensure URL matches endpoint
      method: "POST",
      body: formData,
    });

    return response.json();
  }

  async ragCompletion(prompt: string, numResults: number, filters: any) {
    const response = await fetch(`${this.baseUrl}/rag_completion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        numResults,
        filters,
      }),
    });

    return response.json();
  }
}

export default R2RClient;
