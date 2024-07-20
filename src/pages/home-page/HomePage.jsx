import { Outlet, useLocation } from "react-router-dom"
import Header from '../../utils/Header.tsx';
import Leftnav from "../../utils/Leftnav.tsx"
import Footer from '../../utils/Footer.tsx';

const Home = () => {
    return (
        <>
            <Header />
            <div style={{ display: "flex" }}>
                <Leftnav />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default Home