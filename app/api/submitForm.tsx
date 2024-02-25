// pages/api/submitForm.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process POST request
    const { userQuery } = req.body;
    // Handle the submission logic here, e.g., save to a database
    res.status(200).json({ message: "Form submitted successfully", userQuery });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
