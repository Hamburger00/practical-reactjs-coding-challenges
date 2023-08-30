import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import {useState, useId} from "react";
import {debug} from "util";
import {constants} from "os";
import {Task, taskList} from "../../siteData/taskList";

type AddEditTaskFormProps = {
  onClose: () => void;
  onNewTaskListChange: (newTask: Task) => void;
  editedTask?: Task | null;
  onEditTaskList: (neTask: Task) => void;
};

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ onClose, onNewTaskListChange, editedTask, onEditTaskList }) => {

  const [task, setTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTask(input);
  }
  const handleTask = (e: any) => {
    e.preventDefault();
    if (!editedTask) {
      const newTask = {
        id: Math.random(),
        title: task,
        priority: selectedPriority,
        status: "To Do",
        progress: 0
      }
      onNewTaskListChange(newTask);
      console.log("Added a new task!", newTask);
    } else {
      const editTask = {
        id: editedTask.id,
        title: task,
        priority: selectedPriority,
        status: editedTask.status,
        progress: editedTask.progress
      }
      onEditTaskList(editTask);
      console.log("Edited a new task!", editTask)
      onClose()
    }
  }

  const isSelected = (priority: string) => {
    return priority === selectedPriority;
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{editedTask ? 'Edit Task' : 'Add Task'}</span>
            <Close className="cp" onClick={onClose}/>
          </div>
          <Input label="Task" placeholder="Type your task here..." onChange={handleChange} name="title" value={task} />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                    key={priority}
                    className={classNames({[`${priority}-selected`]: isSelected(priority) })}
                    onClick={() => {setSelectedPriority(priority)}}>
                    {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={editedTask ? 'Save' : 'Add'} onClick={(e) => {handleTask(e);onClose();
              }} />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
