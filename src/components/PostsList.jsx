import { useState, useEffect } from "react";
import Modal from "./Modal";
import Post from "./Post";
import NewPost from "./NewPost";
import classes from "./PostsList.module.css";

function PostsLists({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data.posts);
      setIsLoading(false);
    }
    fetchPosts().catch((error) => {
      console.error("Failed to fetch posts:", error);
    });
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((prevPosts) => [postData, ...prevPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onCreatePost={addPostHandler} />
        </Modal>
      )}
      {!isLoading && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>No posts yet!</h2>
        </div>
      )}
      {!isLoading && (<ul className={classes.posts}>
        {posts.map((post, index) => (
          <Post key={index} author={post.author} body={post.body} />
        ))}
      </ul>)}
      {isLoading && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Loading posts...</h2>
        </div>
      )}
    </>
  );
}

export default PostsLists;
