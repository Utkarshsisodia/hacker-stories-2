import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/inputWithLabel";
import Title from "./components/Title";
const list = [
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
function App() {
  let [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );
  let handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  let searchedStories = list.filter((l) =>
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
        <strong>Search:</strong> </InputWithLabel>

      <List list={searchedStories} />
    </div>
  );
}

export default App;
