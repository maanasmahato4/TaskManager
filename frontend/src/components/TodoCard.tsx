import { Fragment, useState, ChangeEvent,FormEvent } from "react";
import { IFetchTodoData, IUTodoData } from "../Interface";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useTodoApi } from "../api/Todo.api";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function TodoCard(props: IFetchTodoData) {
    const { updateTodo, deleteTodo } = useTodoApi();
    const [show, setShow] = useState(false);
    const [utodo, setUTodo] = useState<IUTodoData>({ todo: props.todo, status: props.status.toString(), userId: props.userId })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        setUTodo({ ...utodo, [event.target.name]: event.target.value })
      }
    
    
      const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = {
          todo: utodo.todo,
          status: utodo.status === 'true'? true : false,
          userId: utodo.userId
        }
        await updateTodo(props.id,formData);
        handleClose();
      }
    return (
        <Fragment>
            <Card style={{ marginBlock: '1rem' }}>
                <Card.Body>
                    <Card.Text>
                        {props.todo} {props.status === true ? <span style={{ color: 'green' }}>Completed</span> : <span style={{ color: 'red' }}>Incomplete</span>}
                    </Card.Text>
                    <div>
                        <Button style={{ marginRight: "1rem" }} onClick={handleShow}>Update</Button>
                        <Button variant="danger" onClick={() => deleteTodo(props.id)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-3" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" placeholder="write your task" name="todo" onChange={handleChange} defaultValue={utodo.todo} />
                        </Form.Group>
                        <Form.Group className=" mt-4">
                            <Form.Check inline type="radio" name="status" label="Incomplete" defaultChecked value={false.toString()} onChange={handleChange} />
                            <Form.Check inline type="radio" name="status" label="completed" value={true.toString()} onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" className="mt-4 me-4" >
                            Submit
                        </Button>
                        <Button variant="secondary" className="mt-4" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>

    )
}

export default TodoCard