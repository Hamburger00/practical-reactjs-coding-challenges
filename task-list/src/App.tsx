import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList, Task} from "./siteData/taskList"
import {useState} from "react";
import {log} from "util";

const App = () => {
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [newTask, setTaskList] = useState<Task[]>(taskList);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleNewTaskListChange = (newTask: Task) => {
        setTaskList((taskList) => [newTask, ...taskList]);
    };

    const handleEditTaskList = (editedTask: Task) => {
        setTaskList(prevTaskList =>
            prevTaskList.map(task =>
                task.id === editedTask.id ? { ...task, ...editedTask } : task
            )
        );
        setShowAddEditModal(false); // Close the edit modal
    };

    const handleTaskDelete = () => {
        if (selectedTask) {
            console.log("Task deleted" + selectedTask);
            setTaskList((prevTaskList) => prevTaskList.filter(task => task.id !== selectedTask.id));
            setShowDeleteModal(false);
            setSelectedTask(null);
        }
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setShowDeleteModal(true)
        setEditingTask(task);
        setShowAddEditModal(true);
    }

    const logButton = () => {
        console.log(newTask)
    }

    return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
            <Button title={"log"} onClick={logButton} />
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => {setShowAddEditModal(true)}} />
        </div>
        <div className="task-container">
          {newTask.map((task) => (
            <TaskCard key={task.id} task={task}
                      setShowDeleteModal={setShowDeleteModal}
                      setSelectedTask={setSelectedTask}
                      setShowEditModal={setShowAddEditModal}
                      setEditingTask={setEditingTask}
                      onClick={handleTaskClick}
            />
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
