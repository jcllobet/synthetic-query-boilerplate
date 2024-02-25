"use client";
import { useState } from "react";
import { UploadPdf } from "@/components/uploadPdf";
import { UserInput } from "./ui/userInput";
import { SimilarityScore } from "./ui/similarityScore";
import { ResponseChat } from "./responseChat";

export function Comparison() {
  const [showScores, setShowScores] = useState(false);

  const toggleScores = () => setShowScores(!showScores);

  const handleSubmit = async (userQuery: string) => {
    const response = await fetch("/api/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuery }),
    });

    const data = await response.json();
    console.log(data); // For demonstration
  };

  return (
    <>
      <div className="px-4 py-6 md:py-12 lg:py-16">
        <div className="container prose max-w-none text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Do LLMs dream about Synthetic Sheep?
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 dark:bg-gray-950 dark:border-gray-800 py-3">
        <div className="container gap-4 px-4 md:grid-cols-2 md:py-3 lg:gap-6 lg:px-6">
          <UploadPdf />
        </div>
        <div className="container grid gap-4 px-4 md:grid-cols-2 md:py-3 lg:gap-6 lg:px-6">
          <div className="p-4 rounded-lg bg-white shadow">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                Original User Query
              </h2>
              <UserInput onSubmit={handleSubmit} />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-white shadow">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                Synthetically Augmented Query
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <input
                  type="text"
                  value="Synthetically Augmented Query will appear here"
                  readOnly
                  className="text-xs text-gray-500 dark:text-gray-400 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
                  placeholder="Synthetically Augmented Query"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="container grid gap-4 md:grid-cols-2 md:py-3 lg:gap-6 lg:px-6">
          <SimilarityScore
            title="User Search Similarity Score"
            descriptions={[
              "User-generated Response 1",
              "User-generated Response 2",
              "User-generated Response 3",
              "User-generated Response 4",
              "User-generated Response 5",
            ]}
            scores={[9.2, 8.7, 8.5, 8.3, 8.0]}
            sharedToggle={showScores}
            onToggle={toggleScores}
          />
          <SimilarityScore
            title="AI+User Search Similarity Score"
            descriptions={[
              "Synthetic Response 1",
              "Synthetic Response 2",
              "Synthetic Response 3",
              "Synthetic Response 4",
              "Synthetic Response 5",
            ]}
            scores={[9.0, 8.6, 8.4, 8.2, 7.8]}
            sharedToggle={showScores}
            onToggle={toggleScores}
          />
        </div>
        <div className="container grid gap-4 md:grid-cols-2 md:py-3 lg:gap-6 lg:px-6">
          <ResponseChat
            title="Answer on Original Query"
            response="The first response from the Language Model."
          />
          <ResponseChat
            title="Answer on Synthetic Query"
            response="The second response from the Language Model."
          />
        </div>
      </div>
    </>
  );
}
