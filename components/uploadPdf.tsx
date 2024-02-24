"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UploadPdf() {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Simulate file upload
      setTimeout(() => {
        setIsUploaded(true);
      }, 1000); // Simulate upload time
    }
  };

  return (
    <section className="p-6 bg-gray-100 rounded-lg flex flex-col gap-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="upload-pdf">
          <Button size="sm" variant="outline">
            Upload PDF
            <Input
              className="sr-only"
              id="upload-pdf"
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </label>
        {isUploaded && (
          <span role="img" aria-label="Uploaded" className="text-green-500">
            ✅
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Choose a PDF file from your device to upload
      </p>
    </section>
  );
}
