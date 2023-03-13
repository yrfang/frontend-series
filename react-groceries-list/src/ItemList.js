import LineItem from "./LineItem";

const ItemList = ({ items, handleCheck, handleDelete  }) => {
  return (
    <ul className="list-container">
      {
        items.map((item) => (
          <LineItem
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        ))
      }
    </ul>
  );
}
 
export default ItemList;