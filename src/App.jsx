import { useEffect, useReducer, useState } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import Title from "./components/Title";
const initialList = [
  {
    title: "React",
    url: "https://react.dev/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialList} }),
      2000
    )
  );
  
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STORIES':
        return action.payload
      case 'REMOVE_STORIES':
        return state.filter((s) => action.payload.objectID !== s.objectID);
      default:
        throw new Error();
    }
  }
  
function App() {
  let [isLoading, setIsLoading] = useState(false);
  let [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );
  let [isError, setIsError] = useState(false);
  const [stories, dispatchStories] = useReducer(storiesReducer,[]);
  
  useEffect(() => {
    setIsLoading(true)
    getAsyncStories()
    .then(result => {
      dispatchStories({
        type : 'SET_STORIES',
        payload : result.data.stories,
      })
      setIsLoading(false);
    })
    .catch(() => setIsError(true))
  }, [])

  let handleRemoveStories = (item) => {
    dispatchStories({
      type : 'REMOVE_STORIES',
      payload : item
    })
  };
  let handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  let searchedStories = stories.filter((l) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <Title>My Hacker Stories</Title>

      <InputWithLabel
        isFocused
        id={"search"}
        // label={"Search"}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      >
        <strong>Search:</strong>{" "}
      </InputWithLabel>
      {isError && <p>Something went wrong...</p>}
      {isLoading ? <p>Loading...</p> : <List list={searchedStories} onRemoveItem={handleRemoveStories}/>}
    </div>
  );
}

export default App;
