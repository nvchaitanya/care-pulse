import { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FormWrapper } from '../../common/common.styles.js';
import "./Demographics.scss";

const PatientDemographics = () => {
    const [demographics, setDemographics] = useState({
        firstname: '',
        lastname: '',
        dob: '',
        gender: '',
        ethnicity: '',
        education: '',
        occupation: '',
        address: '',
        contact: '',
        medical_history: '',
        family_medical_history: '',
        surgeries: '',
        insurance_provider: ''
    })

    const handleChange = (e) => {
        setDemographics({
            ...demographics,
            [e.target.name]: e.target.value
        })
    }

    return (
        <FormWrapper justifyContent="flex-start" px="10px 20px">
            <TextField className="input-field" type="text" name="firstname" value={demographics.firstname} placeholder="Enter First Name" label="First Name" onChange={handleChange} />
            <TextField className="input-field" type="text" name="lastname" value={demographics.lastname} placeholder="Enter Last Name" label="Last Name" onChange={handleChange} />
            <TextField className="input-field" type="text" name="dob" value={demographics.dob} placeholder="Enter Date of Birth" label="Date of Birth" onChange={handleChange} />
            <FormControl className="input-field">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    name="gender"
                    value={demographics.gender}
                    label="Gender"
                    onChange={handleChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="transgender">Transgender</MenuItem>
                </Select>
            </FormControl>
            <TextField className="input-field" type="text" name="ethnicity" value={demographics.ethnicity} placeholder="Enter Ethnicity" label="Ethnicity" onChange={handleChange} />
            <TextField className="input-field" type="text" name="education" value={demographics.education} placeholder="Enter Education" label="Education" onChange={handleChange} />
            <TextField className="input-field" type="text" name="occupation" value={demographics.occupation} placeholder="Enter Occupation" label="Occupation" onChange={handleChange} />
            <TextField className="input-field" type="text" name="address" value={demographics.address} placeholder="Enter Address" label="Address" onChange={handleChange} />
            <TextField className="input-field" type="text" name="contact" value={demographics.contact} placeholder="Enter Mobile Number" label="Contact" onChange={handleChange} />
            <TextField className="input-field" type="text" name="medical_history" value={demographics.medical_history} placeholder="Enter Medical History" label="Medical History" onChange={handleChange} />
            <TextField className="input-field" type="text" name="family_medical_history" value={demographics.family_medical_history} placeholder="Enter amily Medical History" label="Family Medical History" onChange={handleChange} />
            <TextField className="input-field" type="text" name="surgeries" value={demographics.surgeries} placeholder="Enter Surgeries" label="Surgeries" onChange={handleChange} />
            <TextField className="input-field" type="text" name="insurance_provider" value={demographics.insurance_provider} placeholder="Enter Insurance Provider" label="Insurance Provider" onChange={handleChange} />
            <Button type="submit" variant='outlined'>Save</Button>
        </FormWrapper>
    )
};

export default PatientDemographics;