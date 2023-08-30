import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import {useState} from "react";



const TaskCard = ({ task, setShowDeleteModal, setSelectedTask, setShowEditModal, setEditingTask }: any) => {
    const { id, title, priority, status, progress } = task
    const [statusIndex, setStatusIndex] = useState(0)
    const statuses = ["To Do", "In Progress", "Done"]


    const handleClick = () => {
        setShowDeleteModal(true)
        setSelectedTask(task)
    }

    const handleEditClick = () => {
        setShowEditModal(true)
        setEditingTask(task)
    }

    const handleStatus = () => {
        // use switch case
        let nextStatusIndex = (statusIndex + 1) % statuses.length;
        setStatusIndex(nextStatusIndex);

        switch (nextStatusIndex) {
            case 0:
                task.status = "To Do";
                task.progress = 0;
                break;
            case 1:
                task.status = "In Progress";
                task.progress = 50;
                break;
            case 2:
                task.status = "Done"
                task.progress = 100;
                break;
        }
    }


    return (
        <div className="task-card">
            <div className="flex w-100">
                <span className="task-title">Task</span>
                <span className="task">{title}</span>
            </div>
            <div className="flex">
                <span className="priority-title">Priority</span>
                <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
            </div>
            <div className="task-status-wrapper">
                <button className="status" onClick={handleStatus} >{status}</button>
            </div>
            <div className="progress">
                <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
            </div>
            <div className="actions">
                <EditIcon className="mr-20 cp" onClick={handleEditClick}/>
                <DeleteIcon className="cp" onClick={handleClick}/>
            </div>
        </div>
    )
}

export default TaskCard
