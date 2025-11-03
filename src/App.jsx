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
      case 'STORIES_FETCH_INIT':
        return {...state, isLoading : true, isError : false,};
      case 'STORIES_FETCH_SUCCESS':
        return {...state, isLoading : false, isError : false, data : action.payload,};
      case 'REMOVE_STORIES':
        return {...state, data : state.data.filter((s) => action.payload.objectID !== s.objectID)};
      case 'STORIES_FETCH_FAILURE':
        return {...state, isLoading : false, isError : true};
      default:
        throw new Error();
    }
  }
  
function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer,{data : [], isLoading : false, isError : false});
  // let [isLoading, setIsLoading] = useState(false);
  let [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );
  // let [isError, setIsError] = useState(false);
  
  useEffect(() => {
    dispatchStories({type : 'STORIES_FETCH_INIT'});
    
    getAsyncStories()
    .then(result => {
      dispatchStories({
        type : 'STORIES_FETCH_SUCCESS',
        payload : result.data.stories,
      })
      
    })
    .catch(() => dispatchStories({type : 'STORIES_FETCH_FAILURE'}))
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
  let searchedStories = stories.data.filter((l) =>
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
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? <p>Loading...</p> : <List list={searchedStories} onRemoveItem={handleRemoveStories}/>}
    </div>
  );
}

export default App;
