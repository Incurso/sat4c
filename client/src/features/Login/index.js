import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Container, TextField, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { clearState, loginUser, loginSelector } from './loginSlice'
import toast from 'react-hot-toast'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  label: {
    color: 'lightgray',
    '&.Mui-focused': {
      color: 'lightgray'
    }
  }
}))

const Login = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(loginSelector)
  const classes = useStyles()

  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }

    if (isSuccess) {
      dispatch(clearState())
      history.push('/')
    }
  }, [dispatch, errorMessage, history, isError, isSuccess])

  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Container maxWidth='xs'>
          <Typography variant='h1' align='center'>SAT:4C</Typography>
          <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              InputLabelProps={{ className: prefersDarkMode ? classes.label : null }}
              variant='outlined'
              margin='dense'
              autoFocus
              fullWidth
              type='text'
              label='Username'
              placeholder='Username'
              {...register('username', { required: true })}
            />
            <TextField
              InputLabelProps={{ className: prefersDarkMode ? classes.label : null }}
              variant='outlined'
              margin='dense'
              fullWidth
              type='password'
              label='Password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              disabled={isFetching}
            >
              Login
            </Button>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login