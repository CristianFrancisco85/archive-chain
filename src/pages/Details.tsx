import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, TextField, Typography } from '@mui/material'


export const Details = () => {

    const theme = useTheme()

  return (
    <>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: '2rem',
      }}>
        
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained" color='success' sx={{
                marginX: '1rem',
                width: '40%',
                height: '2.5rem',
            }}>
                Descargar
            </Button>
            <Button variant="contained" color='warning' sx={{
                marginX: '1rem',
                width: '40%',
                height: '2.5rem',
            }}>
                Transferir
            </Button>
        </Box>


        <Typography variant="h4" component="div"
            sx={{
                flexGrow: 1,
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginY: '1rem',
            }}
        >
            Metadata
        </Typography>

        <TextField fullWidth disabled label="Hash IPS" variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} />
        <TextField fullWidth disabled label="Bloque" variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} />
        <TextField fullWidth disabled label="Nombre Archivo" variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} />
        <TextField fullWidth disabled label="Tamaño" variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} />
        <TextField fullWidth disabled label="Extension" variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} />

        <Typography variant="h4" component="div"
            sx={{
                flexGrow: 1,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginY: '1rem',
            }}
        >
            Etiquetas
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

            <TextField fullWidth disabled label="Key" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} />
            <TextField fullWidth disabled label="Value" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} />
        
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

            <TextField fullWidth disabled label="Key" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} />
            <TextField fullWidth disabled label="Value" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} />
        
        </Box>

      </Box>
        
    </>
  )
}
