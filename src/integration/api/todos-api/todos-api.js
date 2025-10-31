import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../constands/base-url";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (build) => ({
    getAllTodos: build.query({
      query: () => ({
        url: "todos/get-all",
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    getTodo: build.query({
      query: ({ id }) => ({
        url: `todos/get/${id}`,
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    addTodo: build.mutation({
      query: (todo) => ({
        url: "todos/add",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),
    editTodo: build.mutation({
      query: ({ id, title, description }) => ({
        url: `todos/update/${id}`,
        method: "PUT",
        body: { title, description },
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodos: build.mutation({
      query: ({ id }) => ({
        url: `todos/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    completeTodo: build.mutation({
      query: ({ id, completed }) => ({
        url: `todos/completed/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodosMutation,
  useCompleteTodoMutation,
} = todosApi;
