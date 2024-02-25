import React, { useState } from "react";

interface SimilarityScoreProps {
  title: string;
  descriptions: string[];
  scores: number[];
  sharedToggle: boolean;
  onToggle: () => void;
}

export const SimilarityScore: React.FC<SimilarityScoreProps> = ({
  title,
  descriptions,
  scores,
  sharedToggle,
  onToggle,
}) => {
  // Calculate average score
  const averageScore =
    scores.reduce((acc, score) => acc + score, 0) / scores.length;

  return (
    <div
      className="p-4 rounded-lg bg-white shadow cursor-pointer"
      onClick={onToggle}
    >
      {/* Flex container for title and average score */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
        {/* Display average score in a coding font, aligned with the title */}
        <code className="text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded">
          Avg: {averageScore.toFixed(2)}
        </code>
      </div>
      {sharedToggle && (
        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The semantic similarity score measures the closeness of the
            synthetic query to the user-generated prompt. A higher score
            indicates a better match in meaning and intent. This score helps
            evaluate the quality of the AI-generated response compared to the
            original user input.
          </p>
          <div className="grid gap-4">
            {descriptions.map((description, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-sm">{description}</p>
                <span className="text-green-500 font-semibold">
                  {scores[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
