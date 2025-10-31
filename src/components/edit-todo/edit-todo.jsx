import { useEffect, useRef, useState } from "react";
import Modal from "../modal/modal";
import { FaEdit } from "react-icons/fa";
import { useEditTodoMutation } from "../../integration/api/todos-api/todos-api";
import showToast from "../../utils/toast/toast";
import Input from "../input/input";
import Textarea from "../textarea/textarea";

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
        <Input type="text" defaultValue={todo.title} onChange={(e) => setTitle(e.target.value)} autoFocus placeholder="Title" onKeyDown={(e) => e.key === "Enter" && DescRef.current.focus()} />
        <Textarea placeholder="Description" defaultValue={todo.description} onChange={(e) => setDescription(e.target.value)} ref={DescRef} onKeyDown={(e) => e.key === "Enter" && handlEditTodo()}  />
      </Modal>}
      <FaEdit onClick={handleOpenModal} className="cursor-pointer text-xl sm:text-3xl" />
    </div>
  )
}
