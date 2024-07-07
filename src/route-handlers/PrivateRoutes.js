import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = ({isLogged}) => {
    if(isLogged){
        return <Outlet />
    }else{
        return <Navigate to="/auth" /> 
    }
}
export default PrivateRoutes 