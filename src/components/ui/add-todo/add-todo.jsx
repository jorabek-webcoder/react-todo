import { useRef, useState } from "react";
import Modal from "../../common/modal/modal";
import showToast from "../../../utils/toast/toast";
import { useAddTodoMutation } from "../../../integration/api/todos-api/todos-api";
import Input from "../../common/input/input";
import Textarea from "../../common/textarea/textarea";
import Button from "../../common/button/button";

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
            <Button type="big" onClick={handleOpenModal}>Add Todo</Button>
        </div>
    )
}
