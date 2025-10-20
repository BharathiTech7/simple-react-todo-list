
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, { Fragment } from 'react'

const TodoDetails = ({todoDetails,openDialog,setTodoDetails,setOpenDialog}) => {
  return <Fragment>
    <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
        <DialogTitle>{todoDetails?.todo}</DialogTitle>
        <DialogActions>
            <Button onClick={()=>{setTodoDetails(null);setOpenDialog(false)}}>Close</Button>
        </DialogActions>
    </Dialog>
  </Fragment>
}

export default TodoDetails
