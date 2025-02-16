import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    const [initialText, setInitialText] = useState("");
    const [newItem, setNewItem] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/time").then(res => res.json()).then(data => {
            setInitialText(data.time);
        });
        fetch("/get_data").then(res => res.json()).then(data => {
            setData(data.data);
        });
    }, []);

    const addData = () => {
        fetch("/add_data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newItem, value: 40 })
        }).then(res => res.json()).then(() => {
            setNewItem("");
            fetch("/get_data").then(res => res.json()).then(data => {
                setData(data.data);
            });
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    The time is {initialText}.
                </p>
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.name}: {item.value}</li>
                    ))}
                </ul>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <input 
                        type="text" 
                        value={newItem} 
                        onChange={(e) => setNewItem(e.target.value)} 
                        placeholder="Enter item name" 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button 
                        onClick={addData} 
                        style={{ 
                            padding: '10px 15px', 
                            borderRadius: '5px', 
                            border: 'none', 
                            backgroundColor: 'black', 
                            color: 'white', 
                            cursor: 'pointer' 
                        }}
                    >
                        Add Data
                    </button>
                </div>
            </header>
        </div>
    );
}

export default App;
