import React from 'react'
import Task from "./Task"

const Tasks = ({tasks,onDelete,onToggle}) => {
  return (
    <div>
      {
        tasks.map((tasks)=>
       
        <Task key={tasks.id} tasks={tasks} 
        onDelete={onDelete} onToggle={onToggle}/>)
        }
    </div>
  )
}

export default Tasks
