import { useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { CommensBlock } from './CommensBlock'
import { IComment } from '../models'

interface CmmentProps {
  comment: IComment
}

export function Comment({comment}: CmmentProps) {
  const [commentChild, setcommentChild] = useState(false)  
  const commentsCount = comment.kids?.length || 0   
  
  return(
    <Card style={{ cursor: 'pointer' }}  variant="outlined">
      <CardContent
        onClick={() => {
          setcommentChild(prev => !prev)        
        }}
      >
        <Typography>{comment.by}</Typography>
        <Typography color="text.secondary">{comment.text}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong>{commentsCount}</strong> responses 
        </Typography>
      </CardContent>
      <>
        {commentChild && <CommensBlock kids={comment.kids} />}
      </>
    </Card>
  )
}