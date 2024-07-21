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

    const handleChange = () => {

    };
    
    return (
        <FormWrapper>
            <TextField fullWidth type="text" name="currentMedication" value={medication.currentMedication} placeholder="Enter Current Medication" label="Current Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="otc_medication" value={medication.otc_medication} placeholder="Enter OTC Medication" label="OTC Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="antibiotics" value={medication.antibiotics} placeholder="Enter Antibiotics" label="Antibiotics" onChange={handleChange} />
            <TextField fullWidth type="text" name="socialDrugs" value={medication.socialDrugs} placeholder="Enter Social drugs" label="Social drugs" onChange={handleChange} />
            <TextField fullWidth type="text" name="pastMedication" value={medication.pastMedication} placeholder="Enter Past Medication" label="Past Medication" onChange={handleChange} />
            <TextField fullWidth type="text" name="drugs" value={medication.drugs} placeholder="Enter Drugs" label="Drugs" onChange={handleChange} />
            <TextField fullWidth type="text" name="allergies" value={medication.allergies} placeholder="Enter Allergies" label="Allergies" onChange={handleChange} />
            <Button type="submit">Save</Button>
        </FormWrapper>
    )
};

export default PatientMedication;