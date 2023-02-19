// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeBlogPostToFile } from "../../scripts/save-blog-post";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  writeBlogPostToFile(req.body);
  res.status(200).json({ message: "Blog Post Saved" });
}
