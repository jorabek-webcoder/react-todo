import { useEffect, useRef, useState } from "react";
import Modal from "../modal/modal";
import { FaEdit } from "react-icons/fa";
import { useEditTodoMutation } from "../../integration/api/todos-api/todos-api";
import showToast from "../../utils/toast/toast";

export default function EditTodo({ todo }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editTodo, { isLoading }] = useEditTodoMutation()
  const DescRef = useRef()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    setTitle(todo.title)
    setDescription(todo.description)
  }, [])

  function handleCloseModal() {
    setIsOpenModal(false)
    setTitle("")
    setDescription("")
  }

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  async function handlEditTodo() {
    try {
      const res = await editTodo({ id: todo._id, title, description }).unwrap()
      showToast({ type: "success", message: res.message })
      handleCloseModal()
      setTitle("")
      setDescription("")
    } catch ({ data: error }) {
      showToast({ type: "error", message: error.message })
    }
  }

  return (
    <div>
      {isOpenModal && <Modal close={handleCloseModal} title={"Edit Todo"} isLoading={isLoading} btnName={"Edit"} submit={handlEditTodo} >
        <input type="text" defaultValue={todo.title} onChange={(e) => setTitle(e.target.value)} autoFocus placeholder="Title" onKeyDown={(e) => e.key === "Enter" && DescRef.current.focus()} className="w-full h-20 border-8 border-[#e2b714] outline-none rounded-2xl px-5 text-3xl font-bold placeholder:opacity-40" />
        <textarea placeholder="Description" defaultValue={todo.description} onChange={(e) => setDescription(e.target.value)} ref={DescRef} onKeyDown={(e) => e.key === "Enter" && handlEditTodo()} className="w-full max-h-[210px] min-h-[110px] h-20 border-8 border-[#e2b714] outline-none rounded-2xl px-5 py-3 text-3xl font-bold placeholder:opacity-40"></textarea>
      </Modal>}
      <FaEdit size={30} onClick={handleOpenModal} className="cursor-pointer" />
    </div>
  )
}
