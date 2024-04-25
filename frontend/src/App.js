import React, { useEffect, useState } from 'react';

// Reat application
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello, backend!' }),
      });
      const jsonData = await response.json();
      console.log('Response from backend:', jsonData);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>React Application</h1>
      <button onClick={postData}>Send POST Request</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
