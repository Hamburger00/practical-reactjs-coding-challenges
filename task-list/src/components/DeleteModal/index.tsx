// noinspection BadExpressionStatementJS

import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

type AddDeleteModalProps = {
    onClose: () => void;
    onDelete: any;
}

const DeleteModal: React.FC<AddDeleteModalProps> = ({onClose, onDelete}) => {
  //   TODO: delete function

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={onDelete} />
          <Button title="Cancel" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
