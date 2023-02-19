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
        className="px-2 border-4 border-blue-500 rounded h-10"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        onChange={handleInputChange}
      />
      <input
        className="px-2 border-4 border-blue-500 rounded h-10"
        type="text"
        id="author"
        name="author"
        placeholder="Author"
        onChange={handleInputChange}
      />
      <input
        className="px-2 border-4 border-blue-500 rounded h-10"
        type="text"
        id="categories"
        name="categories"
        placeholder="Categories. Separate with commas"
        onChange={handleInputChange}
      />
      <input
        className="px-2 border-4 border-blue-500 rounded h-10"
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
        className="border-4 border-blue-500 rounded p-2"
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
            <h2 className="text-5xl font-bold mb-4">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mb-4">{children}</h3>
          ),
          // and so on for other heading levels
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        onClick={handleSaveBlogPost}
      >
        Save Blog Post
      </button>
    </div>
  );
}

export default Write;

// <label htmlFor="title">Title</label>
// <input type="text" id="title" name="title" onChange={handleInputChange} />

// <label htmlFor="author">Author</label>
// <input
//   type="text"
//   id="author"
//   name="author"
//   onChange={handleInputChange}
// />

// <label htmlFor="categories">Categories</label>
// <input
//   type="text"
//   id="categories"
//   name="categories"
//   onChange={handleInputChange}
// />

// <label htmlFor="description">Description</label>
// <textarea
//   id="description"
//   name="description"
//   onChange={handleInputChange}
// />

// <label htmlFor="excerpt">Excerpt</label>
// <textarea
//   id="excerpt"
//   name="excerpt"
//   onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
//     handleInputChange(event.target.name, event.target.value)
//   }
// />

// <label htmlFor="body">Body</label>
// <textarea
//   name="body"
//   id="body"
//   value={content}
//   onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
//     setContent(event.target.value)
//   }
// />
