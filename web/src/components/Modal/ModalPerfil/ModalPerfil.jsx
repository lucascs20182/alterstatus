import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalSquad from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import user from '../../../assets/user.svg';
import fecharJanela from '../../../assets/fecharJanela.png';


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 300,
    height: 450,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -150,
    marginTop: -250,
  },

  fechar: {
    width: 30,
    height: 30,
  },

  buttonCriarSquad: {
    marginTop: 16,
    width: 110,
    height: 30,
    borderRadius: 8,
    background: '#094B89',
    color: '#4997bb',
    fontSize: 15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    border: 0,

    transition: 'filter 0.2s',

  },

  barra: {
    width: 230,
    height: 20,
  },

  fecharJanela: {
    width: 20,
    height: 20,
    marginLeft: 270,
    marginTop: 5
  },

  user: {
    width: "100px",
    height: "100px",
    marginBottom: -10,
  },

  avatar: {
    backgroundColor: "#094B89",
    clipPath: 'circle(25%)',
    padding: "7px",
    margin: 10,
  },
}));

export default function ModalPerfil({ children }) {
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
      <Button type="submit" onClick={handleOpen}>
        {children}
      </Button>

      <ModalSquad
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <center>
            <div>
              <img className={classes.fecharJanela} src={fecharJanela} onClick={handleClose} />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <p className={classes.titulo}>Atualizar nome: </p>
            <input className={classes.barra} type="text" name="name" />
            <p className={classes.titulo}> Atualizar cargo: </p>
            <input className={classes.barra} type="text" name="name" />
            <p className={classes.titulo}>Atualizar status: </p>
            <input className={classes.barra} type="text" name="name" />
            <Button className={classes.buttonCriarSquad} type="submit" onClick={handleClose}>
              <p>Concluído</p>
            </Button>


          </center>
        </div>

      </ModalSquad>
    </div>
  );
}