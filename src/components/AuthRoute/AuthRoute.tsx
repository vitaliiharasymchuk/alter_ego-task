import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

interface IProps {
    children: React.ReactNode;
}

const AuthRoute = ({ children }: IProps) => {
    const { isAuthorized } = useAppSelector((state) => state.authReducer);
    return (isAuthorized ? <>{children}</> : <Navigate to="/" />);
};

export default AuthRoute;