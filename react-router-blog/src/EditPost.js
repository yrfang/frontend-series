import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
  const { id } = useParams();
  const history = useHistory();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, body: editBody, datetime };
    editPost(updatedPost);
    history.push(`/post/${id}`);
  }

  return (
    <main className="NewPost">
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body</label>
            <textarea
              id="postBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit
            (post.id)}>Submit</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
              <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
      }
    </main>
  );
}
 
export default EditPost;