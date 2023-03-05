import { Box, Breadcrumbs, CardMedia, Container, Fab, Link, Typography } from "@mui/material"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { Publication } from "../components/Publication"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchPublication } from "../store/publicationSliсe"
import logo from "../img/hacker-news-logo.png";

export function PublocationPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {publication, loading, error} = useAppSelector(state => state.publication)  

  useEffect(() => {    
    dispatch(fetchPublication(id))        
  }, [])
  
  return(
    <Container>
      <Box role="presentation"
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'start',
         padding: 1, backgroundColor: '#ff6600'
        }}
      >
        <CardMedia
          component="img"            
          sx={{ height: 30, width: 30, mx: 1,
            backgroundColor: 'white', border: 2,  borderColor: 'white'}}
          image={logo}
          alt={'logo'}
        /> 
        <Breadcrumbs
         aria-label="breadcrumb"
         sx={{ maxWidth: 'lg'}}
        >         
          <Link underline="hover" color="black" href="/">
            Hacker News
          </Link>        
          <Typography color="text.primary">About</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', py: 1, justifyContent: 'center'}}>
          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
        </Box>
        {publication && <Publication publication={publication}/>}
        {!loading &&
          <Fab
            sx={{ marginX: 'auto' }} color="primary" aria-label="add"
            onClick={() => dispatch(fetchPublication(id))}>
            <RestartAltIcon />
          </Fab>
        }
      </Box>
    </Container>    
  )  
}