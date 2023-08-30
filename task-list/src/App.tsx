import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList, Task} from "./siteData/taskList"
import {useState} from "react";

const App = () => {
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [newTask, setTaskList] = useState<Task[]>(taskList);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleNewTaskListChange = (newTask: Task) => {
        setTaskList((taskList) => [newTask, ...taskList]);
    };

    const handleEditTaskList = () => {
        console.log("handleEditTaskList")
        if (editingTask) {
        console.log("editing task" + newTask)
        setTaskList(prevTaskList => prevTaskList.map(task => task.id === editingTask.id ? {...task, ...editingTask} : task))
        }
    }

    const handleTaskDelete = () => {
        if (selectedTask) {
            console.log("Task deleted" + selectedTask);
            setTaskList((newTask) => newTask.filter(task => task.id !== selectedTask.id));
            setShowDeleteModal(false);
            setSelectedTask(null);
        }
    };

    const handleEditClick = (task: Task) => {
        setEditingTask(task);
        setShowAddEditModal(true); // Open the add/edit modal
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setShowDeleteModal(true)
    }

    return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => {setShowAddEditModal(true)}} />
        </div>
        <div className="task-container">
          {newTask.map((task) => (
            <TaskCard key={task.id} task={task} setShowDeleteModal={setShowDeleteModal} setSelectedTask={setSelectedTask} onClick={handleTaskClick} onEdit={handleEditClick}/>
          ))}
        </div>
      </div>
      {/*Inside the App component*/}
      {showAddEditModal && <AddEditTaskForm editedTask={editingTask} onEditTaskList={handleEditTaskList} onNewTaskListChange={handleNewTaskListChange} onClose={() => {setEditingTask(null); setShowAddEditModal(false);}} />}
      {showDeleteModal && <DeleteModal onDelete={handleTaskDelete} onClose={() => setShowDeleteModal(false)}/>}
    </div>
    )
}

export default App
