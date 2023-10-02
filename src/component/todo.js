'use client'
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo,editTodos } from "@/redux/actions";
import { Stack, Button, Paper, Modal, Box,TextField, Switch } from "@mui/material";
import { styled } from '@mui/material/styles';
import ViewModal from "./ViewModal";
import Data from "@/data/data";
import styles from '../app/page.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginBottom:5,
    color: theme.palette.text.secondary,
}));

export default function Todo() {
    const [viewTodo, setViewTodo] = useState(null);
    const [editTodo, setEditTodo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editTodoStatus, setEditTodoStatus] = useState(false); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [todoContent,setTodoContent] = useState('');
    

    const { todos } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleViewClick = (todo) => {
        setViewTodo(todo);
        setShowModal(true);
    };

    const handleEditClick = (todo) => {
        setEditTodo(todo);
        setEditTodoStatus(todo.completed);
        setShowEditModal(true);
        console.log(editTodo);
    };
    const handleCloseAddModal =() => {
        setShowAddModal(false);
        setUserId('');
        setTodoContent('');
    };
    
    const handleAddTodo = () => {
        if(todoContent ===''|| userId === ''){
            toast.error('Error!')
        }
        else{
            var todoData = {
                id: nanoid(),
                todo: todoContent,
                complete: false,
                userId: userId,
            };
        dispatch(addTodo(todoData));
        toast.success('Create success!');
        setTodoContent('');
        setUserId('');
        setShowAddModal(false);
        }
    };
    const handleDelete = (id) => {
        toast.success('Delete success!');
        dispatch(deleteTodo(id));
    };
    const handleEdit = () => {
        if (editTodo) {
            dispatch(editTodos(editTodo)); 
            toast.success('Edit success!');
            setShowEditModal(false);
        }
    };
    

    return (
        <>
            <h1>Todo list</h1>
            <Button
                variant="contained"
                onClick={() => setShowAddModal(true)} 
                sx={{ borderRadius: '50%', maxWidth: 40, position: 'fixed', bottom: 10, right: 20 }}

            >+</Button>

            <Stack>
                {/* Modal add item */}
                <Modal
                    open={showAddModal}
                >
                    <Box sx={{
                        width: 300,
                        bgcolor: "white",
                        p: 2,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                        <Stack spacing={3}>
                            <h2>ADD NEW TODO</h2>
                            <TextField
                                id="outlined-basic"
                                label="User ID"
                                variant="outlined"
                                type="number"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            ></TextField>
                            <TextField
                                id="outlined-basic"
                                label="Todo Content"
                                variant="outlined"
                                value={todoContent}
                                onChange={(e) => setTodoContent(e.target.value)}
                            ></TextField>
                            <Stack direction='row' spacing={3}>
                                <Button variant="contained" onClick={handleCloseAddModal}>Cancel</Button>
                                <Button variant="contained" onClick={handleAddTodo}>
                                    Add
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>
                {/* Modal edit item */}
                <Modal
                    open={showEditModal}
                    
                >
                    <Box sx={{
                        width: 300,
                        bgcolor: "white",
                        p: 2,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                        
                        <Stack spacing={2}>
                            <h2>EDIT TODO</h2>
                            <TextField
                                id="outlined-basic"
                                label="Todo Content"
                                variant="outlined"
                                multiline
                                maxRows={6}
                                value={editTodo ? editTodo.todo : ''}
                                onChange={(e) =>
                                    setEditTodo({
                                        ...editTodo,
                                        todo: e.target.value,
                                    })
                                }
                            ></TextField>
                            <Button
                                onClick={() => {
                                    setEditTodo({
                                        ...editTodo,
                                        completed: !editTodo.completed,
                                    })
                                    console.log(editTodo.completed)
                                }
                                }
                                variant="contained"
                                color={editTodo && editTodo.completed ? 'success' : 'error'}
                            >
                                {editTodo ? (editTodo.completed ? 'Complete' : 'Not Complete') : ''}
                            </Button>
                            <Stack direction='row' sx={{display:'flex', justifyContent: 'space-between'}}>
                                <Button variant="contained" onClick={() => setShowEditModal(false)}>Cancel</Button>
                                <Button variant="contained" onClick={handleEdit}>
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>
                {
                    todos?(
                        todos.map((todo) => (
                            <Item key={todo.id}>
                                <div>
                                    <Stack>
                                        <span>UserID:{todo.userId}</span>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Stack className={styles.todo_content}>
                                                <h2>Todo content:{todo.todo}</h2>
                                                <p style={{ color: todo.completed ? 'green' : 'red' }}>{todo.completed ? 'Completed' : 'Not Completed'}</p>
                                            </Stack>

                                            <Stack spacing={2} direction='row' sx={{ marginRight: 10 }}>
                                                <Button variant="contained"
                                                    onClick={() => handleViewClick(todo)}
                                                    style ={{maxHeight:50}}

                                                >View</Button>

                                                <Button 
                                                variant="contained" 
                                                color="success"
                                                style={{ maxHeight: 50 }}
                                                    onClick={() => handleEditClick(todo)}
                                                >Edit</Button>

                                                <Button 
                                                variant="contained" 
                                                color="error"
                                                style={{ maxHeight: 50 }}
                                                onClick={() => handleDelete(todo.id)}
                                                >Delete</Button>
                                            </Stack>
                                        </div>
                                    </Stack>
                                </div>
                            </Item>
                        ))
                    ):
                    (
                        <p>No todos available.</p>
                    )
                }
            </Stack>
            
            <ViewModal showModal={showModal} setShowModal={setShowModal} todo={viewTodo}></ViewModal>
            <Data></Data>
        </>
    )
}
