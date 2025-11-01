import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDeleteTodosMutation } from "../../../integration/api/todos-api/todos-api";
import showToast from "../../../utils/toast/toast";
import Modal from "../../common/modal/modal";

export default function DeleteWarning({ id }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [deleteTodo, { isLoading }] = useDeleteTodosMutation()


  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  async function handleDeleteTodo() {
    try {
      const response = await deleteTodo({ id }).unwrap();

      showToast({ type: "success", message: response.message })
      handleCloseModal()
    } catch ({ data: error }) {
      showToast({ type: "error", message: error.message })
    }

  }


  return (
    <div>
      {isOpenModal && <Modal close={handleCloseModal} title={"Delete Todo"} isLoading={isLoading} btnName={"Delete"} submit={handleDeleteTodo} >
        <p className="text-lg sm:text-xl font-semibold">Are you sure you want to delete this todo?</p>
        <p className="text-lg sm:text-xl font-semibold">This action cannot be undone.</p>
      </Modal>}
      <MdDelete onClick={handleOpenModal} className="cursor-pointer text-2xl sm:text-4xl" />
    </div>
  )
}
