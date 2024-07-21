import { Outlet, useLocation } from "react-router-dom"
import Header from '../../utils/Header.tsx';
import Leftnav from "../../utils/Leftnav.tsx"
import Footer from '../../utils/Footer.tsx';
import PhysicianDashboard from "../../physcian/PhysicianDashboard.js";

const Home = () => {
    const location = useLocation();
    return (
        <>
            <Header />
            <div style={{ display: "flex" }}>
                <Leftnav />
                {location.pathname === "/" ?
                    <PhysicianDashboard /> :
                    <Outlet />
                }
            </div>
            <Footer />
        </>
    )
}
export default Home