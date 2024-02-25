import React, { useState } from "react";

interface UserInputProps {
  onSubmit: (userQuery: string) => void;
}

export const UserInput: React.FC<UserInputProps> = ({ onSubmit }) => {
  const [userQuery, setUserQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(userQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
      <input
        type="text"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        placeholder="What are the key themes of these books?"
        className="text-xs text-gray-500 dark:text-gray-400 w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};
