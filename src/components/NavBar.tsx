import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import { MetaMaskBtn } from './MetaMaskBtn'

const pages = [
    { name: 'Explorador', href: '/'},
    { name: 'Subir Archivo', href: '/upload'},
    { name: 'Detalle', href: '/details'},
]

export const NavBar = () => {
    
    const [sideMenu, setSideMenu] = useState(false)

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                width: 100,
                height: 70,
                paddingY: 1
            }}>
                <a href='/' >
                    <Box component="img" src='/assets/archive_logo.png' width={90} height={70} alt='Archive Chain Logo'/>
                </a>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                    key={page.name}
                    href={page.href}
                    sx={{ 
                        mx: 1, color: 'white', display: 'block', letterSpacing: '.2rem', alignSelf: 'center',
                        justifySelf: 'center',textAlign: 'center', 
                    }}
                    className='scale-up-hover'
                >
                    {page.name}
                </Button>
            ))}
            </Box>

            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                width: 60,
                height: 60,
                marginY: 1,
            }}>
                <MetaMaskBtn/>
            </Box>

            
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => setSideMenu(true)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    id="menu-appbar"
                    anchor="left"
                    open={sideMenu}
                    onClose={() => setSideMenu(false)}
                    keepMounted
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <Box sx={{ width: '60vw' }} role="presentation">
                        <List>
                        {pages.map((page) => (
                            <ListItem
                                key={page.name}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                                onClick={() => {
                                    window.location.href = page.href
                                    setSideMenu(false)
                                }}
                            >
                                <ListItemText >{page.name}</ListItemText>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
            
            <Box sx={{
                display: { xs: 'flex', md: 'none' },
                width: 60,
                height: 50,
                marginY: 2
            }}>
                <Box component="img" src='/assets/archive_logo.png' width={50} height={50} alt='Archive Chain Logo'/>
            </Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
            ARCHIVE CHAIN
            </Typography>

            <Box sx={{
                display: { xs: 'flex', md: 'none' },
                width: 60,
                height: 60,
                marginY: 1,
                justifyContent: 'center',
            }}>
                <MetaMaskBtn/>
            </Box>
            


        </Toolbar>
        </Container>
    </AppBar>
    )
}
