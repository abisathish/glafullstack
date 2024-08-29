import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/items', { name: newItem })
      .then(response => {
        setItems(prevItems => [...prevItems, { name: newItem, _id: response.data._id }]);
        setNewItem('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
