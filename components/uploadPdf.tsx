"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import R2RClient from "@/app/api/R2RClient"; // Adjust the import path as necessary
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { v5 as uuidv5 } from "uuid";

const NAMESPACE_DNS: string = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

export function UploadPdf() {
  const [isUploaded, setIsUploaded] = useState(false);
  const client = new R2RClient("http://localhost:8000"); // Initialize your R2RClient

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Assuming single file upload for simplicity
    console.log("Starting upload...");

    // Generate user_id using UUID v5
    const NAMESPACE_DNS = "1b671a64-40d5-491e-99b0-da01ff1f3341"; // Example namespace, replace with actual if available
    const userId = uuidv5("user_0", NAMESPACE_DNS);

    // Assuming you have a way to determine the title or chunk_prefix
    const chunkPrefix = "Title: Meditations - Marcus Aurelius";

    const documentId = uuidv5(file.name, NAMESPACE_DNS); // Generate documentId based on file name
    const metadata = {
      user_id: userId,
      chunk_prefix: chunkPrefix,
    };
    const settings = {};

    // Log the elements before submitting
    console.log("Submitting with the following details:");
    console.log("document_id:", documentId);
    console.log("file_path:", file.name); // Assuming file.name is the equivalent of file_path in the Python example
    console.log("metadata:", metadata);
    console.log("settings:", settings);

    try {
      const uploadResponse = await client.uploadAndProcessFile(
        documentId,
        file,
        metadata,
        settings
      );
      console.log("Upload response:", uploadResponse);
      setIsUploaded(true);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Upload failed with error:", error);
      setIsUploaded(false);
      toast.error("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div className="p-6 bg-white rounded-lg flex flex-col gap-4 w-full items-center">
      <p className="text-sm text-black">
        Choose a PDF file from your device to upload
      </p>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Button size="sm" variant="outline">
          Upload PDF
        </Button>
      </div>
      {isUploaded && (
        <span role="img" aria-label="Uploaded" className="text-green-500">
          ✅
        </span>
      )}
    </div>
  );
}
