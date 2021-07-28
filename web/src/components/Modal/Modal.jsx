import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import "../Modal/styles.css"

const useStyles = makeStyles((theme) => ({
  paperModal: {
    width: 500,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },


}));

export default function SimpleModal({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
        <button className="buttonModal" type="submit" onClick={handleOpen}>
          {children}
        </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paperModal}>
          <center>
            <div className="usuario">
              <h3>Fulano</h3>
            </div>
            <div className="cargo">
              <p>Bombeiro</p>
            </div>
            <div className="status">
              <input type="text" name="name" />
            </div>
          </center>
          <center>
          <button className="button" type="submit" onClick={handleClose}>
            fechar
          </button>
          </center>
        </div>

      </Modal>
    </div>
  );
}