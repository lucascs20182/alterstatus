import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import fecharJanela from '../../../assets/fecharJanela.png';
import '../styles.css';

const useStyles = makeStyles((theme) => ({
  paperModal: {
    border: '2px solid #000',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 350,
    height: 140,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -150,
    marginTop: -150, 
  },

    fecharJanela: {
      width: 20,
      height: 20,
      marginLeft: 315,
      marginTop: 7
    }
  }));

export default function ModalCargo({ children }) {
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
          <img className={classes.fecharJanela} src={fecharJanela} onClick={handleClose}/>
            <div className="usuario">
              <p>Cargo:</p>
            <input type="text" name="name" />
            //colocar drop
             </div>
          </center>
          <center>
          <button className="buttonModalClose" type="submit" onClick={handleClose}>
            Atualizar
          </button>
          </center>
        </div>

      </Modal>
    </div>
  );
}