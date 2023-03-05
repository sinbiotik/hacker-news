import { ArticleCard } from "../components/ArticleCard";
import { useEffect } from "react";
import { Box, Breadcrumbs, CardMedia, Container, Fab, Link } from "@mui/material"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchArticles } from "../store/articlesSliсe";
import logo from "../img/hacker-news-logo.png";

export function HomePage() {
  const dispatch = useAppDispatch()
  const {articles, error, loading} = useAppSelector(state => state.articles)
  
  useEffect(() => {      
    setInterval(() => {
      dispatch(fetchArticles())
    }, 60000)
    if (articles.length > 0) {
      return      
    }
    dispatch(fetchArticles())
  }, [dispatch])

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
        </Breadcrumbs>
      </Box> 

      <Box component="div" sx={{display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1}}>
          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
        </Box>
        {articles.map(article =>
           <ArticleCard article={article} key={article.id}/>
          )}        
        {!loading &&
        <Fab
          sx={{ marginX: 'auto' }} color="primary" aria-label="add" 
          onClick={() => {dispatch(fetchArticles())}}
        >
          <RestartAltIcon />
        </Fab>} 
      </Box>
    </Container>    
  )
}

