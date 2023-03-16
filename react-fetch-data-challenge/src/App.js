import { useEffect, useState } from "react";
import Form from "./Form";
import Table from "./Table";

const App = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [reqType])

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />
      {/* <ul>
        {
          items.map((item) => (
            <li key={item.id}>
              {JSON.stringify(item)}
            </li>
          ))
        }
      </ul> */}
      <Table items={items} />
    </div>
  );
}

export default App;