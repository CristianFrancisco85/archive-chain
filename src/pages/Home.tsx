import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'


export const Home = () => {

  const theme = useTheme()

  const items= [
    { id: 1, name: 'Archivo1.jpg', url: '/assets/imageIcon.png' },
    { id: 2, name: 'Archivo2.pdf', url: '/assets/pdfIcon.png' },
    { id: 3, name: 'Archivo3.jpg', url: '/assets/imageIcon.png' },
    { id: 4, name: 'Archivo4.pdf', url: '/assets/pdfIcon.png' },
    { id: 5, name: 'Archivo5.jpg', url: '/assets/imageIcon.png' },
    { id: 6, name: 'Archivo6.pdf', url: '/assets/pdfIcon.png' },
    { id: 7, name: 'Archivo7.jpg', url: '/assets/imageIcon.png' },
    { id: 8, name: 'Archivo8.pdf', url: '/assets/pdfIcon.png' },
    { id: 9, name: 'Archivo9.jpg', url: '/assets/imageIcon.png' },
    { id: 10, name: 'Archivo10.pdf', url: '/assets/pdfIcon.png' },
  ]

  return (
    <>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: '2rem',
      }}>

      <Box>

        <TextField fullWidth required name='nombre' label="Buscar Archivo" variant="outlined" sx={{marginY:2}} />

        <Typography variant="h4" component="div"
            sx={{
                flexGrow: 1,
                fontSize: '2rem',
                marginY: '1rem',
            }}
        >
            /home/usuario/dir1/.../dirN
        </Typography>
      </Box>
        
      <Grid container spacing={2} justifyContent='center' alignItems='center'>

        {items.map((item) => (
            <Grid item xs={6} sm={4} md={4} lg={2} textAlign='center' margin={4} paddingY={4} border={2} borderRadius='1.5rem' >
                <Box component="img" src={item.url} 
                    sx={{
                        width: '40%',
                        height: 'auto',
                        margin: 'auto',
                    }}
                />
                <Typography variant="h4" component="div" 
                    sx={{ 
                        flexGrow: 1,
                        fontSize: '1.25rem',
                        marginTop: '1rem',
                    }} 
                >
                    Nombre : {item.name}
                </Typography>
                <Button variant="contained" color='secondary' sx={{
                    marginTop: '1rem',
                }}>
                    Ver Detalles
                </Button>
            </Grid>
        ))}

      </Grid>
      </Box>
    </>
  )
}
