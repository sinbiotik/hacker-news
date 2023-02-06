import { useEffect } from 'react'
import Card from '@mui/material/Card/Card'

import { Comment } from './Comment'
import { ErrorMessage } from './ErrorMessage'
import { Loader } from './Loader'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchComments } from '../store/commentsSliсe'


interface CommensBlockProps {
  kids?: number[]
}

export function CommensBlock({kids}: CommensBlockProps) {
  const {comments, loading, error} = useAppSelector(state => state.comments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchComments(kids))
  }, [kids])

  return(
    <Card sx={{ ml:3, mr:1, mb:1 }}>
      {loading && <Loader /> }
      {error && <ErrorMessage error={error} />}
      
      {kids &&
        kids.map(kid =>
         comments[kid] && <Comment comment={comments[kid]} key={kid}/>
        )
      }
    </Card>
    
  )
}