import md5 from 'md5'
import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import IconButton from '@mui/material/IconButton'
import { Add, Remove } from '@mui/icons-material'
import { useIPFS } from '../hooks/useIPFS'
import { useMetaMask } from '../connectors/metaMask'
import useContract from '../hooks/useContract'
import { formatEther } from 'ethers/lib/utils'
import { useNavigate } from 'react-router-dom'

export const Upload = () => {

    const navigate = useNavigate()
    const {uploadFileIPFS} = useIPFS()
    const contract = useContract()
    
    const { useIsActive, useProvider, useAccount } = useMetaMask
    const isActive = useIsActive()
    const provider = useProvider()
    const account = useAccount()

    const [file, setFile] = useState(null) as any
    const [metadata, setMetadata] = useState({
        nombre: '',
        size: 0,
        ext: '',
        tags: [] as Array<{key: string, value: string}>
    })

    const handleChange = async (file: any) => {
        if (!file) return
        setFile(file)
        setMetadata({
            ...metadata,
            nombre: file.name,
            size: file.size,
            ext: file.type,
        })
    }

    const handleUpload = async () => {
        if (!isActive) {
            alert('Conecta tu wallet primero')
            return
        }
        else{
            const IPFSRes = await uploadFileIPFS(file)
            if (IPFSRes) {
                contract?.createNFT(IPFSRes.path,md5(file),metadata.nombre,metadata.size,
                metadata.tags.map((tag) => tag.key),metadata.tags.map((tag) => tag.value)
                ).then((result:any)=>{
                    alert('NFT creado')
                    navigate('/')
                }).catch((err:any)=>{
                    alert('Error al crear NFT, intenta de nuevo')
                    console.log('createNFT', err)
                })
            }
        }

    }

    const handleUpload2 = async () => {

        if(isActive && account && provider && contract){
            provider?.getBalance(account).then((result)=>{
                console.log('balance', Number(formatEther(result)))
            })
            contract.totalSupply().then((result:any)=>{
                console.log('totalSupply', result)
            })
            contract.nftMetadata(0).then((result:any)=>{
                console.log('nftMetadata', result)
            })
        }
    }



    const handleAddTag = () => {
        setMetadata({...metadata, tags: [...metadata.tags, {key: '', value: ''}]})
    }

    const handleDeleteTag = (index: number) => {
        setMetadata({...metadata,tags: metadata.tags.filter((tag, i) => i !== index)})
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
        
            <MuiFileInput fullWidth value={file} onChange={handleChange} inputProps={{ accept: '.png, .jpeg .jpg, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .mp3, .mp4, .avi, .mov, .mkv, .zip, .rar, .7z' }}
                placeholder="Selecciona un archivo" sx={{marginY:2, width: {xs: '100%', md: '50%'}}}
            />        

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

            <TextField fullWidth required label="Nombre" variant="outlined" sx={{marginY:2, width: {xs: '100%', md: '50%'}}} 
                value={metadata.nombre} onChange={(e) => setMetadata({...metadata, nombre: e.target.value})}
            />
            <TextField fullWidth required disabled name='size' variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} 
                value={metadata.size + ' KB'}
            />
            <TextField fullWidth required disabled name='ext' variant="standard" sx={{marginY:2, width: {xs: '100%', md: '30%'}}} 
                value={metadata.ext} 
            />

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

            {metadata.tags.map((tag, index) => (
                <Box key={index} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TextField fullWidth name='tag1' label="Key" variant="outlined" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}} 
                        value={tag.key} onChange={(e) => setMetadata({...metadata, tags: metadata.tags.map((t, i) => i === index ? {...t, key: e.target.value} : t)})}
                    />
                    <TextField fullWidth name='tag2' label="Value" variant="outlined" sx={{marginY:2, marginX:1, width: {xs: '50%', md: '30%'}}}
                        value={tag.value} onChange={(e) => setMetadata({...metadata, tags: metadata.tags.map((t, i) => i === index ? {...t, value: e.target.value} : t)})}
                    />
                    <IconButton aria-label="delete" onClick={() => handleDeleteTag(index)}>
                        <Remove color='error' />
                    </IconButton>
                </Box>
            ))}

            <Button variant="contained" color='success' sx={{
                marginTop: '1rem',
                width: {xs: '10%', md: '2%'},
                height: '2.5rem',
                marginX: '1rem',
            }}
                onClick={handleAddTag}
            >
                <IconButton aria-label="upload picture" component="span">
                    <Add color='inherit' />
                </IconButton>

            </Button>

            <Button variant="contained" color='secondary' sx={{
                marginTop: '5rem',
                width: {xs: '100%', md: '20%'},
                height: '3rem',
            }}
                onClick={handleUpload}
            >
                Subir Archivo
            </Button>

        </Box>
        </>
    )
}
