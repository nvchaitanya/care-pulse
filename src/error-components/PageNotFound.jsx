import { Button } from "@mui/material";
import { images } from "../assets";
import { useNavigate } from "react-router-dom";   
import "./NotFound.css";
const PageNotFound = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/")
    }
    return(
        <div className="not-found-wrapper">
            <img src={images.PageNotFound} alt="Page Not Found" />
            <Button onClick={goToHome} className="back-btn" color="secondary">Go to Homepage</Button>
        </div>
    )
}
export default PageNotFound