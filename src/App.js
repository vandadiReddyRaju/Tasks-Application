import {v4 as uuid4} from "uuid"

import {useState,useEffect} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import './App.css';

const tasks = []

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const App = ()=> {
  
  
  const savedtasks = JSON.parse(localStorage.getItem("activeTasks"))
  const [activeTasks,addTasks] = useState(savedtasks !== null ? savedtasks : tasks)

  useEffect(() => {
    localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
  }, [activeTasks]);
  

  const [task,setTaskName] = useState("")
  const [tag,setTag] = useState(tagsList[0].displayText)

  const onSubmitTask = event =>{
    event.preventDefault()

    if (task.trim() === "") return;

    const newTask = {
      id : uuid4(),
      task,
      tag 
    }

    addTasks(prev => [...prev,newTask])
    setTaskName("")
  }

  const onChangeTag = event =>{
    setTag(event.target.value)
  }

  const onChangeTask = event =>{
    setTaskName(event.target.value)
  }

  const deleteTask = (id)=>{
    const filteredTasks = activeTasks.filter((task) => task.id !== id);
    addTasks(filteredTasks)

  }

  const getAllTasks = ()=>(
    <ul>
      {activeTasks.map(each => (
        <li className="each-task-container">
          <h1 className="list-heading">{each.task}</h1>
          <div className="delete-container">
          <p className="list-tag">{each.tag}</p>
          <button onClick={() => deleteTask(each.id)} className="delete-button"><FontAwesomeIcon icon={faTrashAlt} /></button>
          </div>
        </li>
      ))}
    </ul>
  )

  
  return (
    <div className="main-conatiner">
    <div className="task-form-container">
      <h1 className="task-heading">Create a task!</h1>
        <form onSubmit={onSubmitTask} className="form-container">
          <label className="label-text" htmlFor="task">Task</label>
          <input onChange={onChangeTask} value={task} className="text-input" placeholder="Enter the task here" type="text" id="task"/>
          <label className="label-text" htmlFor="tags">Tags</label>
          <select value={tag} onChange={onChangeTag} className="text-input"  id="tags">
            {tagsList.map(each=>(
              <option key={each.optionId} value={each.displayText}>{each.displayText}</option>
            ))}
          </select>
          <div className="button-container">
            <button type="submit" className="add-button">Add Task</button>
          </div>
        </form> 
    </div>
    <div className="added-tasks-container"> 
      <h1 className="task-heading">Tasks</h1>
      {activeTasks.length === 0 ? <h1 className="no-task-heading">No Tasks to dispaly</h1> : getAllTasks()}
      
    
     </div>  
    
        
  </div>
  )
}

export default App;
