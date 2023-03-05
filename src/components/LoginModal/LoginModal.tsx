import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography, TextField, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../store/authReducer/authSlice";
import { useAppDispatch } from "../../hooks/hooks";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    maxWidth: "80%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
};

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
}

interface LoginData {
    username: string,
    password: string
}

const emptyLoginData: LoginData = {
    username: "",
    password: ""
};

const correctLoginData: LoginData = {
    username: "admin",
    password: "12345"
};

const LoginModal = ({ isOpen, handleClose }: IProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
    const formik = useFormik({
            initialValues: emptyLoginData,
            validationSchema: Yup.object({
                username: Yup.string().required(),
                password: Yup.string().required()
            }),
            onSubmit: values => {
                if (JSON.stringify(values) === JSON.stringify(correctLoginData)) {
                    handleClose();
                    dispatch(login());
                    navigate("/profile");
                } else {
                    setIsErrorMessage(true);
                }
            }
        }
    );

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Login
                </Typography>
                <TextField
                    id="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.username && formik.errors.username)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.password && formik.errors.password)}
                />
                {isErrorMessage && <Alert severity="error">Wrong credentials!</Alert>}
                <Button variant="contained" onClick={() => formik.handleSubmit()}>Confirm</Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;