import { Outlet, useLocation } from "react-router-dom"
import Header from '../../utils/Header.tsx';
import Leftnav from "../../utils/Leftnav.tsx"
import Footer from '../../utils/Footer.tsx';
import PhysicianDashboard from "../../physician/PhysicianDashboard.js";
import { useSelector } from "react-redux";

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
                    (loggedInUser.role === "physician" ? <PhysicianDashboard /> : <>Ra Ra Rogistoda</>)
                    :
                    <Outlet />
                }
            </div>
            <Footer />
        </>
    )
}
export default Home