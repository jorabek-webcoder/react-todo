import { useState } from "react"

function App() {

  const [todos, setTodos] = useState([])

  fetch("http://localhost:8080/todos/get-all").then((res) => res.json()).then((data) => setTodos(data.data))

  return (
    <>
      <h1 className="text-4xl text-gray-950 text-center">hello world</h1>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <p>{todo.completed}</p>
        </div>
      ))}
    </>
  )
}

export default App
