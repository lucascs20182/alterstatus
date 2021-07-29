import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import fecharJanela from '../../../assets/fecharJanela.png';
import '../styles.css';

const useStyles = makeStyles((theme) => ({

  paperModal: {
    border: '2px solid #000',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 350,
    height: 130,
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
    },

    buttonModal: {
      height: 30,
      backgroundColor: "transparent",
      borderColor: "transparent",
      fontSize: 16,
  },
  
   buttonModalClose: {
    flexDirection: "row",
    marginTop: 16,
    marginRight: 20,
    width: 100,
    height: 35,
    borderRadius: 8,
    background: "#E83F5B",
    color: "#FFF",
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: 0,
    transition: "filter 0.2s",
  },

  buttonRecusar: {
    flexDirection: "row",
    marginTop: 16,
    width: 100,
    height: 35,
    borderRadius: 8,
    background: "#094B89",
    color: "#FFF",
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: 0,
    transition: "filter 0.2s",
  },

  buttonModalDeletar:{
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    borderRadius: "50%",
  },
  
  usuario: {
    fontSize: "medium",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: "60%",
    marginTop: -30,

  },
  
  editarUsuario: {
    height: 17,
    width: 17,

  },
  
  cargo: {
    fontSize: "small",
    alignContent: "center",
    justifyContent: "center"
  },
  
  editarCargo: {
    height: 13,
    width: 13,

  },
  
  status:{
    display: "medium",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: "50%",
  
  },
  
  confirmarStatus: {
    marginLeft: 5,
    height: 20,
    width: 20,
  
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
          <img className={classes.fecharJanela} src={fecharJanela} onClick={handleClose}/>
            <div className="usuario">
              <p>Você deseja deletar esse usuário?</p>
             </div>
          </center>
          <center>
            <div className={classes.buttonModalDeletar}>
          <button className={classes.buttonModalClose} type="submit" onClick={handleClose}>
            Sim
            </button>
          <button className={classes.buttonRecusar} type="submit" onClick={handleClose}>
            Não
          </button>
          </div>
          </center>
        </div>

      </Modal>
    </div>
  );
}