import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
import {useState} from "react";

const App = () => {
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const showDeleteModal = false
    return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => {setShowAddEditModal(true)}} />
        </div>
        <div className="task-container">
          {taskList.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
      {/*Inside the App component*/}
      {showAddEditModal && <AddEditTaskForm onClose={() => setShowAddEditModal(false)} />}
      {showDeleteModal && <DeleteModal />}
    </div>
    )
}

export default App
