import { useEffect, useState } from "react";
import "./MyBlogs.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Button } from "web3uikit";
import { useNavigate } from "react-router-dom";


const MyBlogs = () => {

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([
    {
      // externalUrl: "https://ipfs.io/ipfs/Qmd7DuscoYu3bqBavGxcxvoR1yZDhp8B4sNncyorZphucM",
      // owner_of: "xxxx",
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

  const clickHandler = () => {
    navigate("/newStory");
  };

  return (
    <>
      <div>
        <div className="myBlogsHeader">Your Blogs</div>
        {blogsContent && blogsContent?.length > 0 ? (
          blogsContent.map((blog, i) => {
            const { title, text, owner_of, externalUrl } = blogs;
            return (
              <BlogCard
                key={i}
                title={title}
                text={text}
                ownerOf={owner_of}
                externalUrl={externalUrl}
              />
            );
          })
        ) : (
          <div style={{
            fontSize: "30px",
            width: "100%",
            marginLeft: "40%",
          }}>
            <p>No Blogs Yet</p>
            <Button text="Create one" onClick={clickHandler} />
          </div>
        )
        }
      </div>
    </>
  );
};

export default MyBlogs;
