import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import useContract from '../hooks/useContract'


export const Details = () => {

    const params = useParams()
    const contract = useContract()

    const [metadata, setMetadata] = useState({} as any)


    useEffect(() => {
        const i = parseInt(params.id!)

        contract?.nftMetadata(i).then(async (result:any)=>{
            const archive = {
                id: i,
                ipfsHash: result[0],
                fileHash: result[1],
                fileName: result[2],
                fileSizeKB: parseInt(result[3]._hex)/1000,
                keys: result[4].split(';').filter((key:string) => key !== ''),
                values: result[5].split(';').filter((value:string) => value !== ''),
                ext: result[2].split('.').pop(),
                owner: await contract?.ownerOf(i)
            }
            setMetadata(archive)            

        }).catch((err:any)=>{
            console.log('nftMetadata', err)
        })
    }, [params.id, contract])

    const handleDownload = async () => {
        await fetch(`https://ipfs.io/ipfs/${metadata.ipfsHash}`)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', metadata.fileName)
            document.body.appendChild(link)
            link.click()
            link.parentNode?.removeChild(link)
            alert('Archivo descargado')
        })
    }


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
            }} onClick={handleDownload}>
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

        <p > Hash IPFS </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.ipfsHash} />
        <p> Checksum MD5 </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.fileHash} />
        <p> Dueño Actual </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.owner} />
        <p> Nombre del Archivo </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.fileName} />
        <p> Tamaño en KB </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.fileSizeKB} />
        <p> Extensión </p>
        <TextField fullWidth disabled variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} value={metadata.ext} />

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


        {metadata.keys?.map((key:string, index:number) => (
            <Box key={index} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextField fullWidth disabled label="Key" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} value={key} />
                <TextField fullWidth disabled label="Value" variant="standard" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} value={metadata.values[index]} />
            </Box>
        ))}


      </Box>
        
    </>
  )
}
