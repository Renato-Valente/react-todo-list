import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import DeleteSVG from './assets/delete.svg'
import { useState } from 'react'

const Task = ({content, index, handleDelete}) => {
  return(
    <div className="task-container">
      <div className="content-container"><p>{content}</p></div>
      <div className="icons-container">
        <img src={DeleteSVG} onClick={(event) => {
            handleDelete();
        }} />
      </div>
    </div>
  )
}

const App = () => {

  const [teste, setTeste] = useState([]);

  const handleDelete = (index) => {
    console.log('index:', index)
    setTeste((prev) => {
      return prev.filter((item) => {
        return item.index != index;
      })
    })
  }

  const [value, setValue] = useState('');

  const handleAddTask = () => {
    if(value == '') return;
    setTeste((prev) => {
      return [...prev, {
        content: value,
        index: prev.length == 0 ? 1: prev[prev.length - 1].index + 1
      }]
    })

    setValue('');
  }

  const handleKeyDown = (event) => {
    if(event.code == 'Enter') {
      handleAddTask();
    }
  }

  return(
    <div className="container">
      <h1>Get Things Done!</h1>
      <div className="input-container">
        <input  onKeyDown={(event) => handleKeyDown(event)} value={value} onChange={(event) => setValue(event.target.value)} placeholder='What is the task for today?' type="text" name="texto" id="texto" />
        <button onClick={handleAddTask}>Add task</button>
      </div>
      {teste.map((item) => {
        return <Task handleDelete={() => handleDelete(item.index)} key={item.index} index={item.index} content={item.content}/>
      })}
    </div>
  )


}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
