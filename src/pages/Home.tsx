import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import useContract from '../hooks/useContract'
import { useMetaMask } from '../connectors/metaMask'
import { parse } from 'path'


export const Home = () => {

    const contract = useContract()
    
    const { useIsActive} = useMetaMask
    const isActive = useIsActive()

    const [fileItems, setFileItems] = React.useState([] as any)

    useEffect(() => {
        if (isActive) {
            contract?.totalSupply().then(async (result:any)=>{
                let items = [] as any
                for (let i = 0; i < result.toNumber(); i++) {
                    await contract?.nftMetadata(i).then((result:any)=>{
                        items.push({
                            id: i,
                            ipfsHash: result[0],
                            fileHash: result[1],
                            fileName: result[2],
                            fileSizeKB: parseInt(result[3]._hex),
                            keys: result[4].split(';').filter((key:string) => key !== ''),
                            values: result[5].split(';').filter((value:string) => value !== ''),
                            ext: result[2].split('.').pop(),
                        })
                        console.log(items.length)
                    }).catch((err:any)=>{
                        console.log('nftMetadata', err)
                    })
                }
                console.log(items.length)
                setFileItems(items)
            }).catch((err:any)=>{
                console.log('totalSupply', err)
            })
        }
    }, [isActive])

  const logos = [
    { ext : 'jpg', url: '/assets/imageIcon.png' },
    { ext : 'jpeg', url: '/assets/imageIcon.png' },
    { ext : 'png', url: '/assets/imageIcon.png' },
    { ext : 'pdf', url: '/assets/pdfIcon.png' },
    { ext : 'doc', url: '/assets/docIcon.png' },
    { ext : 'docx', url: '/assets/docIcon.png' },
    { ext : 'txt', url: '/assets/txtIcon.png' },
    { ext : 'ppt', url: '/assets/pptIcon.png' },
    { ext : 'pptx', url: '/assets/pptIcon.png' },
    { ext : 'xls', url: '/assets/xlsIcon.png' },
    { ext : 'xlsx', url: '/assets/xlsIcon.png' },
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

        {fileItems.map((item:any) => (
            <Grid key={item.id} item xs={6} sm={4} md={4} lg={2} textAlign='center' margin={4} paddingY={4} border={2} borderRadius='1.5rem' >
                <Box component="img" src={logos.find((logo:any) => logo.ext === item.ext)?.url}
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
                    Nombre : {item.fileName}
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
