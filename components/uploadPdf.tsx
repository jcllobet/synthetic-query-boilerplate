import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UploadPdf() {
  return (
    <section className="p-6 bg-gray-100 rounded-lg flex flex-col gap-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="upload-pdf">
          <Button size="sm" variant="outline">
            Upload PDF
            <Input className="sr-only" id="upload-pdf" type="file" />
          </Button>
        </label>
      </div>
      <p className="text-sm text-gray-500">
        Choose a PDF file from your device to upload
      </p>
    </section>
  );
}
