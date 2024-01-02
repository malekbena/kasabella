import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

const CheckAuth = () => {
    const location = useLocation();
    const { isLogged, isLoaded } = useContext(AuthContext);

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <>
            {isLogged ? <Outlet /> : <Navigate to="/login" state={location.pathname} replace />}
        </>
    );
}

export default CheckAuth;