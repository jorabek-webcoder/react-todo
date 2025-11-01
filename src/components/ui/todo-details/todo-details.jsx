import { FaRegSquareCheck } from "react-icons/fa6";
import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { IoReloadCircleSharp } from "react-icons/io5";
import { useCompleteTodoMutation, useGetTodoQuery } from "../../../integration/api/todos-api/todos-api";
import Modal from "../../common/modal/modal";
import EditTodo from "../edit-todo/edit-todo";
import DeleteWarning from "../delete-warning/delete-warning";

export default function TodoDetails({ todo, isLoading }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [completedTodo, { isLoading: isCompletedLoading }] = useCompleteTodoMutation()
  const { data: getTodo, isLoading: isLoadingTodo } = useGetTodoQuery(
    { id: todo?._id },
    { skip: !isOpenModal || !todo?._id }
  )

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  async function handleCompleteTodo() {
    try {
      await completedTodo({ id: todo._id, completed: !todo.completed }).unwrap()
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }

  if (isLoading) {
    return (<div className="w-full p-3 sm:p-5 bg-[#3f4143] rounded-2xl border-4 border-[#e2b714] flex justify-between gap-2 sm:gap-4 ">
      <h2 className="text-xl sm:text-2xl font-bold">Loading...</h2>
    </div>)
  }

  return (
    <div>
      {isOpenModal && <Modal close={handleCloseModal} isLoading={isLoadingTodo} title={getTodo?.data.title || "Loading..."} >
        <div>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">{getTodo?.data.description || "Loading..."}</p>
        </div>
      </Modal>}

      {todo ? (
        <div className="w-full p-3 sm:p-5 bg-[#3f4143] rounded-2xl border-4 border-[#e2b714] flex justify-between gap-2 sm:gap-4 ">
          <div className="w-full flex items-center gap-2 sm:gap-4">
            <button disabled={isCompletedLoading} onClick={handleCompleteTodo}>
              {isCompletedLoading ? (
                <IoReloadCircleSharp className="animate-spin text-xl sm:text-3xl" />
              ) : todo.completed ? (
                <FaCheckSquare className="cursor-pointer text-xl sm:text-3xl" />
              ) : (
                <FaRegSquareCheck className="cursor-pointer text-xl sm:text-3xl" />
              )}

            </button>
            <div onClick={handleOpenModal} className="w-full h-full cursor-pointer">
              <h2 className="text-xl sm:text-2xl font-bold">{todo.title.length > 10 ? todo.title.slice(0, 10) + "..." : todo.title}</h2>
            </div>
          </div>

          <div className="flex items-center justify-between w-[70px]">
            <EditTodo todo={todo} />
            <DeleteWarning id={todo._id} />
          </div>
        </div>
      ) : (
        <div className="w-full p-3 sm:p-5 bg-[#3f4143] rounded-2xl border-4 border-[#e2b714] flex justify-between gap-2 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Todos not found</h2>
        </div>)}

    </div>
  )
}
