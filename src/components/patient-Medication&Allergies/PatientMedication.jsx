import { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FormWrapper } from '../../common/common.styles.js';

const PatientMedication = () => {
    const [medication, setMedication] = useState({
        currentMedication: '',
        otc_medication: '',
        antibiotics: '',
        socialDrugs: '',
        pastMedication: '',
        drugs: '',
        allergies: '',
    })

    return (
        <FormWrapper>
            <TextField fullWidth type="text" name="currentMedication" value={user.currentMedication} placeholder="Enter Current Medication" label="Current Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="otc_medication" value={user.otc_medication} placeholder="Enter OTC Medication" label="OTC Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="antibiotics" value={user.antibiotics} placeholder="Enter Antibiotics" label="Antibiotics" onChange={handleChange} />
            <TextField fullWidth type="text" name="socialDrugs" value={user.socialDrugs} placeholder="Enter Social drugs" label="Social drugs" onChange={handleChange} />
            <TextField fullWidth type="text" name="pastMedication" value={user.pastMedication} placeholder="Enter Past Medication" label="Past Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="drugs" value={user.drugs} placeholder="Enter Drugs" label="Drugs" onChange={handleChange} />
            <TextField fullWidth type="text" name="allergies" value={user.allergies} placeholder="Enter Allergies" label="Allergies" onChange={handleChange} />
            <Button type="submit">Save</Button>
        </FormWrapper>
    )
};

export default PatientMedication;