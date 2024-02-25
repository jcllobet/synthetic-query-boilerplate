"use client";
import { useState, useRef } from "react";
import { v5 as uuidv5 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadAndProcessFiles } from "@api/uploadProcess";

// Define the DNS namespace
const NAMESPACE_DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

const generateUserId = (userIndex: number): string => {
  return uuidv5(`user_${userIndex}`, NAMESPACE_DNS);
};

export function UploadPdf() {
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Starting upload...");

      // Prepare file paths and titles for uploadAndProcessFiles
      const filePaths = Array.from(files).map((file) => file.name); // Simulate file paths with file names
      const titles = filePaths.reduce((acc, filePath) => {
        acc[filePath] = `Title: ${filePath}`;
        return acc;
      }, {} as { [key: string]: string });

      const settings = {}; // Define any settings if necessary

      // Call uploadAndProcessFiles with simulated file paths and titles
      await uploadAndProcessFiles(filePaths, titles, settings);
      console.log("File uploaded.");
      setIsUploaded(true);
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
          multiple // Allow multiple files if needed
          onChange={handleFileChange}
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
