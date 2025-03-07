import { useEffect, useState } from "react";
import {ToastContainer , toast} from "react-toastify";

function ToDoList(){
    const [Tasks,setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("Tasks");
        return storedTasks ? JSON.parse(storedTasks) : []; 
      });
    const [newTask, setNewTask] = useState("");
    const [currentDate, setCurrentDate]  = useState("");
    const [currentTime, setCurrentTime] = useState("");
    useEffect(()=>{
        const currDate = new Date().toLocaleDateString();
        return setCurrentDate(currDate);
    },[currentDate])

    useEffect(()=>{
        const interval = setInterval(()=>{
        const currTime = new Date().toLocaleTimeString();
        setCurrentTime(currTime);
        },1000)
        return ()=> clearInterval(interval)
    },[currentTime])

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
    <div className="container-top">
    <div className="header-input-cont">
        <h1 >To Dos</h1>
        <p>Stay organized,
        boost productivity, and never miss a task again!</p>
        <div className="date-time">
            <div>{currentDate}</div>
            <div>{currentTime}</div>
        </div>

        <div className="input-btn"> 
            <input type="text" name="task" 
            value={newTask}
            placeholder="TO Do Task" 
            onChange={handleInputChange}/>
            <button className="addTask" onClick={addTask}>Add</button>
        </div>
    </div>
    <div className="datalist">
        <ol>
        {
        Tasks.length>0?(
        Tasks.map((t,index)=>{
            return (<><li key={index}>
                
                <div>
                <input type="checkbox"
                checked={t.checked} onChange={()=>handleCheckBox(index)} />
                <span>{t.text}</span>
                <div className="time">{t.date}</div>
                </div>
                
                <div className="list-btn">
                <button className="deleteTask" onClick={()=>deleteTask(index)}>Delete</button>
                <button className="upTask" onClick={()=>upTask(index)}>up</button>
                <button className="downTask" onClick={()=>downTask(index)}>Down</button>

                </div>
            </li></>)
        }))
        :(
            <h1 className="empty-task">Add your first task</h1>
        )
    
        }   
        </ol>

    </div>
</div>

    <ToastContainer />
    </>
    );
}

export default ToDoList;