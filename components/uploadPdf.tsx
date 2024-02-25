"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import R2RClient from "@/app/api/R2RClient"; // Adjust the import path as necessary

export function UploadPdf() {
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const client = new R2RClient("http://localhost:8000"); // Initialize your R2RClient

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Assuming single file upload for simplicity
      console.log("Starting upload...");

      // Simulate or derive these values as needed
      const documentId = "6bae89d8-866c-55f1-9641-0044416debd8"; // Example, generate as needed
      const metadata = {
        user_id: "53ca70df-95f2-5c93-832b-5681ad3bf497",
        chunk_prefix: "Title: Meditations - Marcus Aurelius",
      };
      const settings = {};

      try {
        const uploadResponse = await client.uploadAndProcessFile(
          documentId,
          file,
          metadata,
          settings
        );
        console.log("Upload response:", uploadResponse);
        setIsUploaded(true);
      } catch (error) {
        console.error("Upload failed with error:", error);
        setIsUploaded(false);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 bg-white rounded-lg flex flex-col gap-4 w-full items-center">
      <p className="text-sm text-black">
        Choose a PDF file from your device to upload
      </p>
      <div className="flex items-center space-x-4">
        <label htmlFor="upload-pdf">
          <Button size="sm" variant="outline" onClick={handleClick}>
            Upload PDF
          </Button>
        </label>
        <Input
          ref={fileInputRef}
          className="sr-only"
          id="upload-pdf"
          type="file"
          onChange={handleFileUpload}
        />
        {isUploaded && (
          <span role="img" aria-label="Uploaded" className="text-green-500">
            ✅
          </span>
        )}
      </div>
    </div>
  );
}
