import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import PageNotFound from "./error-components/PageNotFound";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login-page/LoginPage";
import PrivateRoutes from "./route-handlers/PrivateRoutes";
import PatientDemographics from "./components/patient-demographics/PatientDemographics";
import ScheduleAppointment from "./components/schedule-appointment/ScheduleAppointment";


const MainContainer = () => {
    const loginState = useSelector(state => state.loginState)

    return (

        <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route element={<PrivateRoutes isLogged={loginState?.isLogged} />}>
                <Route path="/" element={<HomePage />} >
                    <Route path="demo-graphics" element={<PatientDemographics/>}/>
                    <Route path="schedule-appointment" element={<ScheduleAppointment/>}/>
                </Route>
            </Route>
        </Routes>
    )
}
export default MainContainer 