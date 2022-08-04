import { useState, useEffect } from "react";
import "./HomeAuth.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const HomeAuth = () => {

  const [blogs, setBlogs] = useState([
    {
      externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
      owner_of: "xxxx",
    }
  ]);
  const [blogsContent, setBlogsContent] = useState();

  const fetchBlogsContent = async () => {
    const limit5 = blogs?.slice(0, 5);
    let contentBlog = [];

    if (limit5) {
      limit5.map(async (blog) => {
        if (blog) {
          const { externalUrl, owner_of } = blogs;
          const res = await axios.get(externalUrl);
          const text = res.data.text.ToString();
          const title = res.data.title;
          contentBlog.push({ title, text, owner_of, externalUrl });
        }
      });
    }

    setBlogsContent(contentBlog);
  };

  useEffect(() => {
    if (blogs && !blogsContent) {
      fetchBlogsContent();
    }
  }, []);

  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">Recommended Blogs</div>
      <div className="homeAuth_blogs">
        {
          blogsContent &&
          blogsContent.map((blog, i) => {
            const { title, text, owner_of, externalUrl } = blog;
            return (
              <BlogCard key={i} title={title} text={text} ownerOf={owner_of} externalUrl={externalUrl} />
            );
          })
        }
      </div>
    </div>
  );
};

export default HomeAuth;
