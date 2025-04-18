import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function FireWall({children}) {
    const { user } = useAuthContext();

    if(!user) return <Navigate to='/' replace />
    return children;
}