import { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FormWrapper } from '../../common/common.styles.js';

const PatientMedication = () => {
    const [immunizationData, setImmunizationData] = useState({
        covid_19_vaccine: '',
        general_vaccines: '',
    })

    return (
        <FormWrapper>
            <TextField fullWidth type="text" name="covid_19_vaccine" value={user.covid_19_vaccine} placeholder="Enter COVID-19 vaccine" label="COVID-19 vaccine" onChange={handleChange} />
            <TextField fullWidth type="text" name="general_vaccines" value={user.general_vaccines} placeholder="Enter General Vaccine" label="General Vaccine" onChange={handleChange} />
            <Button type="submit">Save</Button>
        </FormWrapper>
    )
};

export default PatientMedication;