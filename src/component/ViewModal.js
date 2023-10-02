import React from "react";
import { Modal, Box, Button } from "@mui/material";

function ViewModal({ showModal, setShowModal, todo }) {
    const handleClose = () => setShowModal(false);

    return (
        <Modal open={showModal}>
            <Box
                sx={{
                    width: 300,
                    bgcolor: "white",
                    p: 2,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <h2>Todo Details</h2>
                {todo ? (
                    <div>
                        <p><h4>User ID: </h4> {todo.userId}</p>
                        <p><h4>ToDo content: </h4> {todo.todo}</p>
                        <p ><h4>Todo Status: </h4> <h4 style={{color: todo.completed ? 'green' : 'red'}}>{todo.completed ? 'Completed' : 'Not Completed'}</h4> </p>
                    </div>
                ) : (
                    <p>No todo selected</p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ViewModal;
