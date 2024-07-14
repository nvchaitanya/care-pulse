import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarComponent = ({ showSnackBar, setShowSnackBar,snackMessage }) => {
    return (
        <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={() => setShowSnackBar(false)}>
            <Alert
                onClose={() => setShowSnackBar(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackMessage}
            </Alert>
        </Snackbar>
    )
}
export default SnackbarComponent;