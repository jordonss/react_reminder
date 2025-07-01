import {useState} from "react";
import Modal from "./Modal";
import Post from "./Post";
import NewPost from "./NewPost";
import classes from "./PostsList.module.css";

function PostsLists({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    setPosts((prevPosts) => [postData, ...prevPosts]);
    onStopPosting();
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onCreatePost={addPostHandler} />
        </Modal>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>No posts yet!</h2>
        </div>
      )}
      <ul className={classes.posts}>
        {posts.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            body={post.body}
          />
        ))}
      </ul>
    </>
  );
}

export default PostsLists;
