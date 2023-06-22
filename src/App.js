import {useState,useEffect} from "react";
import ReactDOM from "react-dom"
import Header from "./Header.js"
import Tasks from "./Tasks.js"
import AddTask from "./AddTask.js"

const App = () => {
    //showAddTask
    const [showAddTask,setShowAddTask]=useState(false)
    //Tasks
    const [tasks,setTasks] = useState([]);
    useEffect(()=>{
       const getTask=async ()=>{
        const tasksfromServer = await fetchTasks()
        setTasks(tasksfromServer)
       }
        getTask()
    },[])
        //fetchTasks
        const fetchTasks=async ()=>{
            const res=await fetch("http://localhost:5000/tasks")
            const data=await res.json()
            return data
        }
        //fetchTask
        const fetchTask=async (id)=>{
            const res=await fetch(`http://localhost:5000/tasks/${id}`)
            const data=await res.json()
            return data
        }
    
        //Delete Tasks
        const deleteTask = async(id)=>{
            await fetch(`http://localhost:5000/tasks/${id}`,
            {
                method:'DELETE',
            })
            setTasks(tasks.filter((task) => task.id !== id))
        }
        //Toggle Remainder
        const toggleReminder = async(id) => {
            const taskFromServer = await fetchTask(id)
            const updTask ={...taskFromServer, reminder :!taskFromServer.reminder}
            const res = await fetch(`http://localhost:5000/tasks/${id}`,
            {
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(updTask)
            })

            setTasks( ()=>{
               const updated = tasks.map((tasks)=> 
                tasks.id === id ? { ...tasks, reminder : !tasks.reminder}: tasks)
                console.log(updated);
                return updated;
            });      
        };
        //add task
        const addTask = async (task)=>{
            const res = await fetch('http://localhost:5000/tasks',{
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body : JSON.stringify(task)
            })
            const data = await res.json()
            setTasks([...tasks, data])
            setShowAddTask(!showAddTask)
           // const id = Math.floor(Math.random()*10000)+1
           // const newTask = { id,...task }
           // setTasks([...tasks,newTask])
           // setShowAddTask(!showAddTask)
              }
    return(
        <>
        <Header title="Task Tracker" onAdd={()=>
            setShowAddTask(!showAddTask)}
            showAdd={showAddTask} />
        {showAddTask && (<AddTask onAdd={addTask}/>) }
        {tasks.length > 0 ?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks')}
        </>
        
    );
}
export default App