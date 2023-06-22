import React from 'react'

const Button = ({color,text,onAdd}) => {
  return (
    <div>
      <button style={{backgroundColor:color}} 
      onClick={()=>onAdd()}
      className='btn'>
        {text}
        </button>
    </div>
  )
}

export default Button
