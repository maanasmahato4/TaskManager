import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { IAddTodoData, IUTodoData } from "../Interface";
import axios from 'axios';

export const useTodoApi = () => {
  const { token } = useContext(AuthContext);
  

  const TodoApi = axios.create({
    baseURL: "http://localhost:3000/todo",
    withCredentials: true,
    timeout:5000,
    headers: {
        Authorization: `Bearer ${token}`,
    }
  });

  const getTodo = async (userId: number) => {
    const res = await TodoApi.get(`/${userId}`);
    return res.data;
  };

  const addTodo = async (todoData: IAddTodoData) => {
    const res = await TodoApi.post("/",todoData);
    return res.data;
  };

  const updateTodo = async (todoId: number, uTodoData: IUTodoData) => {
    const res = await TodoApi.patch(`/${todoId}`, uTodoData);
    return res.data;
  };

  const deleteTodo = async (todoId: number) => {
    const res = await TodoApi.delete(`/${todoId}`);
    return res.data;
  };

  return { getTodo, addTodo, updateTodo, deleteTodo };
};
