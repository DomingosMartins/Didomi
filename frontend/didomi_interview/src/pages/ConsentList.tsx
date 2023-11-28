import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Container } from '@mui/material';
import { ConsentJSONResponse, ConsentType } from '../types';


const getConsentsText = (consent: ConsentType) => {
    const consents: Array<string> = []
    if (consent.receiveNewsletter) consents.push("Receive newsletter")
    if (consent.showTargetedAds) consents.push("Be shown targeted ads")
    if (consent.contributeToStatistics) consents.push("Contribute to anonymous visit statistics")

    return consents.join(", ")
}

const ConsentList: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const [consents, setConsents] = useState<Array<ConsentType>>([])

    useEffect(() => {
        const handlegetConsents = async () => {
            const response = await fetch("/consents")

            const { data }: ConsentJSONResponse = await response.json()
            if (data) setConsents(data)
        };

        handlegetConsents()
    }, [])

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Consents given for</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {consents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((consent) => (
                            <TableRow key={consent.id}>
                                <TableCell>{consent.name}</TableCell>
                                <TableCell>{consent.email}</TableCell>
                                <TableCell>{getConsentsText(consent)}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2]}
                component="div"
                count={consents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};

export default ConsentList;