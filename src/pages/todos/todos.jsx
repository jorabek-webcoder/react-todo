import { Fragment } from "react";
import AddTodo from "../../components/add-todo/add-todo"
import TodoDetails from "../../components/todo-details/todo-details"
import { useGetAllTodosQuery } from "../../integration/api/todos-api/todos-api";

function Todos() {
  const { data: todos, isLoading } = useGetAllTodosQuery();

  return (
    <div className="px-5 sm:px-10 md:px-20 py-10 ">
      <div className="w-full border-b-2 border-[#e2b714] pb-[30px] md:pb-[50px] flex items-center justify-between">
        <h1 className="text-xl sm:text-4xl md:text-6xl font-bold">Todo List</h1>

        <AddTodo />
      </div>

      <div className="w-full h-[63vh] overflow-auto mt-[50px] sm:px-10 md:px-20 flex flex-col gap-4">
        {todos?.data && !isLoading ? todos?.data.length > 0 ? todos?.data.map(todo => (
          <Fragment key={todo._id}>
            <TodoDetails todo={todo} />
          </Fragment>
        )) : (
          <TodoDetails />
        ) : (
          <TodoDetails isLoading />
        )}

      </div>
    </div>
  )
}

export default Todos
