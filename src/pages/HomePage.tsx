import { ArticleCard } from "../components/ArticleCard";
import { useEffect } from "react";
import { Box, Breadcrumbs, Container, Fab, Link } from "@mui/material"
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchArticles } from "../store/articlesSlise";

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
      <div className="breadcrumbs" role="presentation" >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ maxWidth: 'lg', marginX: 'auto' }}
        >        
          <Link underline="hover" color="black" href="/">
            Hacker News
          </Link>         
        </Breadcrumbs>
      </div> 

      <Box component="div" sx={{display: 'flex', flexDirection: 'column' }}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {articles.map(article =>
           <ArticleCard article={article} key={article.id}/>
          )}
        
        {!loading &&
        <Fab color="primary" aria-label="add" onClick={() => dispatch(fetchArticles())}>
          <RestartAltIcon />
        </Fab>} 
      </Box>
    </Container>    
  )
}
