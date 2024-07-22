import { Outlet, useLocation } from "react-router-dom"
import Header from '../../utils/Header.tsx';
import Leftnav from "../../utils/Leftnav.tsx"
import Footer from '../../utils/Footer.tsx';
import PhysicianDashboard from "../../physician/PhysicianDashboard.js";
import { useSelector } from "react-redux";
import PatientDashboard from "../../components/patient-dashboard/PatientDashboard.jsx";

const Home = () => {
    const location = useLocation();
    const { loggedInUser } = useSelector(state => state.loginState)
    console.log("Logged in user", loggedInUser)
    return (
        <>
            <Header />
            <div style={{ display: "flex" }}>
                <Leftnav />
                {location.pathname === "/" ?
                    (loggedInUser.role === "physician" ? <PhysicianDashboard /> : <PatientDashboard/>)
                    :
                    <Outlet />
                }
            </div>
            <Footer />
        </>
    )
}
export default Home