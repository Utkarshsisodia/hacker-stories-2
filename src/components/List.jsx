import Item from "./Item";

function List({ list, onRemoveItem }) {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
      ))}
    </ul>
  );
}

export default List;
