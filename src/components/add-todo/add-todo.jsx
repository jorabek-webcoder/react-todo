import { useRef, useState } from "react";
import Modal from "../modal/modal";
import showToast from "../../utils/toast/toast";
import { useAddTodoMutation } from "../../integration/api/todos-api/todos-api";
import Input from "../input/input";
import Textarea from "../textarea/textarea";

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
            {isOpenModal && <Modal close={handleCloseModal} title={"Add Todo"} isLoading={isLoading} btnName={"Add"} submit={handleAddTodo}>
                <Input type="text" autoFocus={true} defaultValue={title} placeholder="Title" onKeyDown={(e) => e.key === "Enter" && DescRef.current.focus()} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Description" defaultValue={description} ref={DescRef} onKeyDown={(e) => e.key === "Enter" && handleAddTodo()} onChange={(e) => setDescription(e.target.value)} />
            </Modal>}
            <button onClick={handleOpenModal} className="text-xl sm:text-4xl md:text-6xl border-4 md:border-8 border-[#e2b714] bg-[#3f4143] rounded-2xl md:rounded-4xl p-2 sm:p-4 cursor-pointer">Add Todo</button>
        </div>
    )
}
