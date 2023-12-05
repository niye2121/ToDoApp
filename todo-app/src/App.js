import logo from './logo.svg';
import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handlerAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))


  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[])
  
  
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the description of your todo app?"/>
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handlerAddTodo} className="primary-btn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondery-btn ${isCompleteScreen===false && 'active'}`}  onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondery-btn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          
          {allTodos.map((item,index)=>{
           return(
            <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon'/>
              <FaCheck  className='check-icon'/>
            </div>
           
          </div>

           );
          })}
         
        </div>

      </div>
      
    </div>
  );
}

export default App;
