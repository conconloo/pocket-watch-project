import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Popup(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you in danger?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you start to feel unsafe, press and hold the blue Hold Until Safe button. Once you let go, you will be asked to confirm that you are safe.
            If you do not confirm your safety within 10 seconds, your location will be sent to police with an emergency message.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Got it.</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Popup