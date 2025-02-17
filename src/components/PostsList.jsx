import Post from './Post';
import classes from "./PostsList.module.css";

function PostsLists() {
  return <ul className={classes.posts}>
    <Post author="Maxx" body="lalal" />
    <Post author="Art" body="not lalal" />
  </ul>
}

export default PostsLists;
