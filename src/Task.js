import React from 'react'
import { FaTimes } from "react-icons/fa"

const Task = ({tasks,onDelete,onToggle}) => {
  return (
    <div className= {tasks.reminder ? 'task reminder' : 'task'} onDoubleClick={() => onToggle(tasks.id)}>
     <h2>{tasks.text} 
      <FaTimes style={{
        color:'red',cursor:'pointer'}} 
        onClick={()=> onDelete(tasks.id)}/>
    </h2>
    <h3>{tasks.day}</h3>
    </div>
  )
}

export default Task
