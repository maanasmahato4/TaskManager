import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { IAddTodoData, IFetchTodoData } from "../Interface";
import { useTodoApi } from "../api/Todo.api";
import TodoCard from "../components/TodoCard";
import { Navigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Home() {
  const { getTodo, addTodo } = useTodoApi();
  const { decodedToken } = useContext(AuthContext);
  const [todo, setTodo] = useState<IAddTodoData>({ todo: "", status: "false", userId: decodedToken?.sub })
  const [fetchedTodo, setFetchedTodo] = useState<IFetchTodoData[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false)



  if (!decodedToken) {
    return <Navigate to="/signup" />
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodo(decodedToken?.sub);
      setFetchedTodo(res);
    }

    fetchTodos();
  }, [])
  const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setTodo({ ...todo, [event.target.name]: event.target.value })
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = {
      todo: todo.todo,
      status: todo.status === 'true' ? true : false,
      userId: todo.userId
    }
    await addTodo(formData);
    setShowAlert(true);
    event.currentTarget.reset();
  }

  if (!decodedToken) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {
        showAlert && <Alert>Task has been added!<Button style={{marginInline: "1rem"}} variant="outline-light" onClick={() => setShowAlert(false)}>X</Button></Alert>
      }
      <Form style={{ width: "40%", marginInline: "30%", border: "2px solid black", padding: "1rem", borderRadius: "1rem" }} className="mt-3" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Task</Form.Label>
          <Form.Control type="text" placeholder="write your task" name="todo" onChange={handleChange} />
        </Form.Group>
        <Form.Group className=" mt-4">
          <Form.Check inline type="radio" name="status" label="Incomplete" defaultChecked value={false.toString()} onChange={handleChange} />
          <Form.Check inline type="radio" name="status" label="completed" value={true.toString()} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
      <section style={{ marginTop: "2rem", width: "60%", marginInline: "20%" }}>
        <h3 style={{ textAlign: "center" }}>Your Tasks</h3>
        {fetchedTodo.map((item, idx) => {
          return <TodoCard key={idx} {...item} />
        })}
      </section>
    </div>
  )
}

export default Home;