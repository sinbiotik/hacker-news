import { Box, Breadcrumbs, Container, Fab, Link, Typography } from "@mui/material"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useParams } from "react-router-dom"
import { useEffect } from "react"

import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { Publication } from "../components/Publication"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchPublication } from "../store/publicationSliсe"

export function PublocationPage() {
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const {publication, loading, error} = useAppSelector(state => state.publication)  

  useEffect(() => {    
    dispatch(fetchPublication(id))        
  }, [])
  
  return(
    <Container>
      <div className="breadcrumbs" role="presentation" >
        <Breadcrumbs
         aria-label="breadcrumb"
         sx={{ maxWidth: 'lg', marginX: 'auto'}}
        >        
          <Link underline="hover" color="black" href="/">
            Hacker News
          </Link>        
          <Typography color="text.primary">About</Typography>
        </Breadcrumbs>
      </div>

      <Box>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {publication && <Publication publication={publication}/>}       
      </Box>

      {!loading &&
      <Fab color="primary" aria-label="add" onClick={() => dispatch(fetchPublication(id))}>
        <RestartAltIcon />
      </Fab>}
    </Container>    
  )  
}