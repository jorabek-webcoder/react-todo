import { useRef, useState } from "react";
import Modal from "../modal/modal";
import showToast from "../../utils/toast/toast";
import { useAddTodoMutation } from "../../integration/api/todos-api/todos-api";

export default function AddTodo() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [addTodo, { isLoading }] = useAddTodoMutation()
    const DescRef = useRef()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    function handleCloseModal() {
        setIsOpenModal(false)
        setTitle("")
        setDescription("")
    }

    function handleOpenModal() {
        setIsOpenModal(true)
    }

    async function handleAddTodo() {
        try {
            const res = await addTodo({ title, description }).unwrap()
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
            {isOpenModal && <Modal close={handleCloseModal} title={"Add Todo"} isLoading={isLoading} btnName={"Add"} submit={handleAddTodo} >
                <input type="text" autoFocus defaultValue={title} placeholder="Title" onKeyDown={(e) => e.key === "Enter" && DescRef.current.focus()} onChange={(e) => setTitle(e.target.value)} className="w-full h-20 border-8 border-[#e2b714] outline-none rounded-2xl px-5 text-3xl font-bold placeholder:opacity-40" />
                <textarea placeholder="Description" defaultValue={description} ref={DescRef} onKeyDown={(e) => e.key === "Enter" && handleAddTodo()} onChange={(e) => setDescription(e.target.value)} className="w-full max-h-[200px] min-h-[70px] h-20 border-8 border-[#e2b714] outline-none rounded-2xl px-5 py-3 text-3xl font-bold placeholder:opacity-40"></textarea>
            </Modal>}
            <button onClick={handleOpenModal} className="text-6xl border-8 border-[#e2b714] bg-[#3f4143] rounded-4xl p-4 cursor-pointer">Add Todo</button>
        </div>
    )
}
