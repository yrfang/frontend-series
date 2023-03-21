import { useState, useEffect, createContext } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");

  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    // if no search word, string include empty string = true
    const filterResults = posts.filter(post =>
      (post.title.toLowerCase().includes(search.toLowerCase())) ||
      (post.body.toLowerCase().includes(search.toLowerCase()))
    );

    setSearchResults(filterResults.reverse());
  }, [posts, search])

  return (
    <DataContext.Provider value={{
      posts, setPosts, search, setSearch,
      searchResults, isLoading, fetchError
    }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;