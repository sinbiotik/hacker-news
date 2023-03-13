import { useState } from 'react'
import {Typography, Card, CardContent, Button } from "@mui/material"
import { IArticle } from "../models"
import { Link } from 'react-router-dom'

interface ArticleCardProps {
  article: IArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [details, setDetails] = useState(false)
  const datePublication = new Date(article.time * 1000).toLocaleDateString("en-US")
  return(
    <Card
      className='article-card'      
      sx={{ mb:1,'&:hover': { transform: 'rotateY(10deg)'}}}      
    >
      <CardContent sx={{ pt:0, '&:last-child': { pb: 0 }}}>
        <Typography >          
          <Link
            to={`/about/${article.id}`}            
          >            
            { article.title }
          </Link>     
          <Button
            sx={{mx: 1, my: 1}}
            size="small"          
            onClick={() => setDetails(prev => !prev)}            
          >
            { details? 'Hide Details' : 'Details' }         
          </Button>
        </Typography>
        
        {details && 
          <>
            <Typography>
              <span>
              Rating: <strong>{ article.score }</strong>   
              </span>
              <span>
                |  Author nic: <strong>{article.by}</strong> 
              </span>
              <span>
                |  Date of publication: {datePublication}
              </span>        
            </Typography>
          </>
        }
      </CardContent>
    </Card>
  )
}