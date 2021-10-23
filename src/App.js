import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

const [foodName,setFoodName] = useState("");
const [days,setDays]  = useState(0);
const [foodList,setFoodList] = useState([]);
const [newFoodName,setNewFoodName] = useState("");

useEffect(() => {
  Axios.get("https://niroshanfood.herokuapp.com/read").then((response) => {
    setFoodList(response.data)
  })
})

const addToList = () => {
   Axios.post("https://niroshanfood.herokuapp.com/insert",{
    foodName:foodName,
    days:days
  });
}

const updateFood =(id) => {
  Axios.put("https://niroshanfood.herokuapp.com/update",{
    id:id,
    newFoodName:newFoodName,
  });
};

const deleteFood =(id) => {
  Axios.delete(`https://niroshanfood.herokuapp.com/delete/${id}`); 
};


  return (
    <div className="App">
      <h1>Curd app with MERN</h1>
      <label>Food Name:</label>
      <input type="text" onChange ={(event) =>{setFoodName(event.target.value)}}/>
      <label> Days since ate It:</label>
      <input type="number" onChange ={(event) =>{setDays(event.target.value)}}/>
      <button onClick ={addToList}>Add To List</button>
      <h1>Food List</h1>


      {foodList.map((val,key) => {
        return <div key={key} className ="food">
          <h1>{val.foodName}</h1><h1>{val.daysSinceIate}</h1>
          <input type="text" placeholder ="New food Name"  onChange ={(event) =>{setNewFoodName(event.target.value)}}/>
          <button onClick= {() =>updateFood(val._id)}>Update</button>
          <button onClick= {() =>deleteFood(val._id)}>Delete</button>
          </div>
      })}

    </div>
  );
}

export default App;
