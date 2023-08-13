'use client';
import Icon from "@mdi/react";
import {mdiFolderEdit} from "@mdi/js";
import style from "./Admin.module.css"
import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {UserFetch, UserAccess} from "@/app/admin/api/user";

export default function Admin() {

    const [page, setPage] = React.useState(0);
    const [rowsPePage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState<UserAccess[]>([]);


    useEffect(() => {
        UserFetch()
            .then(userAccess => {
                setData(userAccess);
                console.log(userAccess)
            })
            .catch(error => {
                console.error('Error', error)
            });
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper sx={{width: '50%', overflow: 'hidden', backgroundColor: '#2196f3'}}>
            <TableContainer sx={{maxHeight: 200}}>
                <Table stickyHeader={true} aria-label="stickyHeader table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align={'center'}
                                style={{minWidth: 170}}
                            >
                                Nome
                            </TableCell>
                            <TableCell
                                align={'center'}
                                style={{minWidth: 170}}
                            >
                                Email
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell align={'center'}>{item.name}</TableCell>
                                <TableCell align={'center'}>{item.email}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPePage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
