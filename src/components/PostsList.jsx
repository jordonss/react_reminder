import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsLists() {
  const posts = useLoaderData();



  return (
    <>
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>No posts yet!</h2>
        </div>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, index) => (
            <Post key={index} id={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
    </>
  );
}

export default PostsLists;
