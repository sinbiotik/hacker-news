import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useEffect } from "react"
import { useAppDispatch } from '../hooks'
import { IArticle } from '../models'
import { fetchComments } from '../store/commentsSliсe'
import { CommensBlock } from './CommensBlock'

interface PublicationProps {
  publication: IArticle
}

export function Publication({ publication }: PublicationProps) {
  const datePublication = new Date(publication.time * 1000).toLocaleDateString("en-US")  
  const commentsCount = publication.kids?.length || 0
  const dispatch = useAppDispatch()
  
  useEffect(() => {    
    dispatch(fetchComments(publication.kids))  
  }, [publication.kids])

  return(
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb:4, mt:2 } }>
          {publication.title}
        </Typography>        
        <Typography variant="body1">
          Author nic: <strong>{publication.by}</strong>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date of publication: {datePublication}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Publication has <strong>{commentsCount}</strong> comments 
        </Typography>
      </CardContent>

      <CardActions>
        <a href={publication.url} target="_blank" rel="noreferrer">
          <Button size="small">Learn More</Button>
        </a>        
      </CardActions>

     <CommensBlock kids={publication.kids} /> 
    </Card>
  )
}