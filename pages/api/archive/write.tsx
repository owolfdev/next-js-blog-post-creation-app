import React, { useState, useEffect, ChangeEvent, use } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface BlogPostData {
  title: string;
  author: string;
  categories: string[];
  publishedDate: string;
  description: string;
  excerpt: string;
  body: string;
}

function Write() {
  const [blogPostData, setBlogPostData] = useState<Partial<BlogPostData>>({});
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    console.log("Markdown:", markdown);
  }, [markdown]);

  useEffect(() => {
    setBlogPostData({
      title: "My first blog post",
      author: "John Doe",
      categories: ["React", "Next.js"],
      publishedDate: "2021-01-01",
      description: "This is my first blog post",
      excerpt: "This is my first blog post",
      body: "This is my first blog post",
    });
  }, []);

  useEffect(() => {
    console.log("Blog Post Data:", blogPostData);
  }, [blogPostData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
    setMarkdown(value);
  }

  const handleSaveBlogPost = async () => {
    const data: BlogPostData = {
      title: blogPostData.title ?? "",
      author: blogPostData.author ?? "",
      categories: blogPostData.categories ?? [],
      publishedDate: blogPostData.publishedDate ?? "",
      description: blogPostData.description ?? "",
      excerpt: blogPostData.excerpt ?? "",
      body: blogPostData.body ?? "",
    };

    const response = await fetch("/api/save-blog-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to save blog post");
    } else {
      console.log("Blog post saved");
    }
  };

  return (
    <div className="flex flex-col p-20 space-y-6">
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="author"
        name="author"
        placeholder="Author"
        onChange={handleInputChange}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="categories"
        name="categories"
        placeholder="Categories. Separate with commas"
        onChange={handleInputChange}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="publishedDate"
        name="publishedDate"
        placeholder="Published Date"
        onChange={handleInputChange}
      />
      <textarea
        name="body"
        id="body"
        cols={30}
        rows={10}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
      ></textarea>

      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
        children={markdown}
        components={{
          h1: ({ children }) => (
            <h2 className="mb-4 text-5xl font-bold">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="mb-4 text-3xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 text-2xl font-bold">{children}</h3>
          ),
          // and so on for other heading levels
        }}
      />
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
        onClick={handleSaveBlogPost}
      >
        Save Blog Post
      </button>
    </div>
  );
}

export default Write;
