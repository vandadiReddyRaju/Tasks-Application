import {createContext} from "react"

const TaskContext = createContext({
    activeTask : "",
    changeTask : () => {}
})

export default TaskContext