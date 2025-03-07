// code before update

import { useEffect, useState } from "react";
import {ToastContainer , toast} from "react-toastify";
import './Listitem.css'

function ListItem(){

    const [Tasks,setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("Tasks");
        return storedTasks ? JSON.parse(storedTasks) : []; 
      });
    const [newTask, setNewTask] = useState("");
    
     // Save tasks to localStorage whenever tasks change
    useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
    }, [Tasks]);

    function handleCheckBox(index){
        const updateTask = Tasks.map((curr,i)=>
        i == index ? {...curr, checked:!curr.checked} : curr
        );
        setTasks(updateTask);
        
    }
    
    function handleInputChange(e){
        setNewTask(e.target.value)
    }
    
    function addTask(){
        if(newTask != ""){
            const time = new Date().toUTCString();
            const currTask = {text:newTask,date:time,checked:false}
            setTasks(t=>[...t,currTask]);
            setNewTask("")
            toast.success("Tasks added");
            
        }
    }

    function deleteTask(index){
    const updatedList = Tasks.filter((_,i)=>i!==index);
    setTasks(updatedList);
    toast.warning("Task deleted");
    }

    function upTask(index){
        if(index>0){
        const uptask = [...Tasks];
        [uptask[index],uptask[index-1]] = 
        [uptask[index-1], uptask[index]];
        setTasks(uptask);
        toast.update("Task list updated");
        }
    }

    function downTask(index){
        if(index<Tasks.length-1){
        const uptask = [...Tasks];
        [uptask[index],uptask[index+1]] = 
        [uptask[index+1], uptask[index]];
        setTasks(uptask);
        toast.update("Task list updated");
        }
    }

    return(
    <>
    <header>
        <h1>
            TO DO List
        </h1>
    </header>

    <div className="container">
        <div className="input-btn"> 
        <input type="text" name="task" 
            value={newTask}
            placeholder="TO Do Task" 
            onChange={handleInputChange}/>
        <button className="addTask" onClick={addTask}>Add</button>

        </div>
    
    <ol>
        {
            Tasks.length>0?(
            Tasks.map((t,index)=>{
                return (<><li key={index}>
                    <div>
                    <div>
                    <input type="checkbox"
                    checked={t.checked} onChange={()=>handleCheckBox(index)} />
                    <span>{t.text}</span>
                    <div className="time">{t.date}</div>
                    </div>
                    </div>
                    <div className="list-btn">
                    <button className="deleteTask" onClick={()=>deleteTask(index)}>Delete</button>
                    <button className="upTask" onClick={()=>upTask(index)}>up</button>
                    <button className="downTask" onClick={()=>downTask(index)}>Down</button>

                    </div>
                </li></>)
            }))
            :(<h1>Add your firs Task & shedule your day </h1>)
        
        }
    </ol>
    </div>

    <ToastContainer />
    </>
    );
}

export default ListItem;