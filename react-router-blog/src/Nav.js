import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

  useEffect(() => {
    // if no search word, string include empty string = true
    const filterResults = posts.filter(post =>
      (post.title.toLowerCase().includes(search.toLowerCase())) ||
      (post.body.toLowerCase().includes(search.toLowerCase()))
    );

    setSearchResults(filterResults.reverse());
  }, [posts, search, setSearchResults])

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Posts</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
 
export default Nav;