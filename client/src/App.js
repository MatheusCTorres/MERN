import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(()=>{
    axios.get("https://foodlistemitem.herokuapp.com/read")
    .then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    axios.post("https://foodlistemitem.herokuapp.com/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    axios.put("https://foodlistemitem.herokuapp.com/update", {
      id:id,
      newFoodName: newFoodName,
    })
  }

  const deleteFood = (id) => {
    axios.delete(`https://foodlistemitem.herokuapp.com/delete/${id}`)
   }

  return (
    <div className="App">
      <h1>Crud app with MERN</h1>

      <label>Food Name</label>
      <input type="text" onChange={(event) => {setFoodName(event.target.value)}}/>

      <label>Days sice you ate it</label>
      <input type="number" onChange={(event) => {setDays(event.target.value)}}/>

      <button onClick={addToList}>Add to list</button>

      <h1>Food List</h1>
      {
        foodList.map((val, key) =>{
            return(
              <div key={key} className="food">
                <h4>{val.foodName}</h4>
                <p>{val.daysSinceIAte}</p>
                <input type="text" placeholder="New Food Name..." onChange={(event) => {setNewFoodName(event.target.value)}}/>
                <button onClick={() => updateFood(val._id)}>Update</button>
                <button onClick={() => deleteFood(val._id)}>Delete</button>
              </div>
            )
        })
      }
    </div>
  );
}

export default App;