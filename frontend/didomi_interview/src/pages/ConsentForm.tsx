import React from 'react';
import { useSignal, useComputed } from "@preact/signals-react";
import { v4 } from 'uuid';


import { TextField, Checkbox, FormControlLabel, Button, FormGroup, FormControl, Typography, Container, Paper } from '@mui/material';
import { ConsentType } from '../types';

const ConsentForm = () => {

    const defaultValueData: Omit<ConsentType, "id"> = {
        name: '',
        email: '',
        receiveNewsletter: false,
        showTargetedAds: false,
        contributeToStatistics: false,
    }

    const formData = useSignal({ ...defaultValueData });
    const isFormValid = useComputed(() => formData.value.name !== "" && formData.value.email !== "" && (formData.value.receiveNewsletter || formData.value.showTargetedAds || formData.value.contributeToStatistics))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;
        formData.value = {
            ...formData.value,
            [name]: name === 'receiveNewsletter' || name === 'showTargetedAds' || name === 'contributeToStatistics'
                ? checked
                : value,
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form data:', formData);

        const consent: ConsentType = { ...formData.value, id: v4() }

        fetch("/consents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(consent),
        })
            .then((response) => response.json())
            .then((data) => console.log("POST /consents Response:", data))
            .catch((error) => console.error("Error adding consent:", error))
            .finally(() => {
                formData.value = { ...defaultValueData }
            })
    };

    return (
        <Container maxWidth="sm">
            <FormControl component="fieldset" sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Give consent
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.value.name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.value.email}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <p>I agree to:</p>
                    <Paper elevation={2} sx={{ p: 2 }} >
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={formData.value.receiveNewsletter} onChange={handleChange} name="receiveNewsletter" />}
                                label="Receive newsletter"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={formData.value.showTargetedAds} onChange={handleChange} name="showTargetedAds" />}
                                label="Be shown targeted ads"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={formData.value.contributeToStatistics} onChange={handleChange} name="contributeToStatistics" />}
                                label="Contribute to anonymous visit statistics"
                            />
                        </FormGroup>

                    </Paper>
                    <Button type="submit" disabled={(!isFormValid.value)} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </FormControl>
        </Container>
    );
};

export default ConsentForm;
