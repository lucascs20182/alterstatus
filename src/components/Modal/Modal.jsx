import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import lapis from '../assets/lapis.png'
import desligar from '../assets/desligar.png'
import icon from '../assets/icon.png'
import confirm from '../assets/confirm.png'
import fechar from '../assets/fechar.png'
import '../components/Modal.css'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return ( 
        console.log("oi")
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },

  
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
      
      <div style={modalStyle} className={classes.paper}>
       <img className ="fechar"src={fechar}/>
       <img className ="deslogar"src={desligar}/>
        <center>
        <img className="icone" src={icon}/>
     <div className="usuario">
        <h3>Fulando <img className="editarUsuario" src={lapis}/></h3>
       </div>
        <div className= "cargo">
        <p>Bombeiro <img className="editarCargo" src={lapis}/></p>
       </div>
        <div className = "status">
        <input type="text" name="name" /><img className= "confirmarStatus" src={confirm}/>
        </div>
        </center>
      <SimpleModal />
      </div>

  );

  return (
    <div>
      <center>
      <button className="button"  type="submit" onClick={handleOpen}>
        Confirmar
      </button>
      </center>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}