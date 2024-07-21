import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import PageNotFound from "./error-components/PageNotFound";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/login-page/LoginPage";
import PrivateRoutes from "./route-handlers/PrivateRoutes";
import PatientDemographics from "./components/patient-demographics/PatientDemographics";
import PatientImmunization from "./components/patient-Immunization/PatientImmunization";
import PatientMedication from "./components/patient-Medication&Allergies/PatientMedication";
import ScheduleAppointment from "./components/schedule-appointment/ScheduleAppointment";
import { getUser } from "./redux/login-flow/LoginRedux";
import PatientProfile from "./components/patient-profile/PatientProfile";
import BillingPage from "./components/patient-billing/BillingPage";


const MainContainer = () => {
    const loginState = useSelector(state => state.loginState)
    const dispatch = useDispatch();
    const { userList } = useSelector(state => state.loginState)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route element={<PrivateRoutes isLogged={loginState?.isLogged} />}>
                <Route path="/" element={<HomePage />} >
                    <Route path="patient-demographics" element={<PatientDemographics />} />
                    <Route path="patient-immunization" element={<PatientImmunization />} />
                    <Route path="patient-medication" element={<PatientMedication />} />
                    <Route path="schedule-appointment" element={<ScheduleAppointment />} />
                    <Route path="profile" element={<PatientProfile />}/>
                    <Route path="billing" element={<BillingPage />}/>
                </Route>
            </Route>
        </Routes>
    )
}
export default MainContainer 