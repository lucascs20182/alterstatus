import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import '../styles.css';
import '../../../styles/login.css'

import { cadastrar, mudarUsuarioDeSquad } from '../../../services/ApiUsuario';

import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: '#094B89',
  },
  field: {
    marginBottom: 15,
  }
}));
export default function SimpleModal({ children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [squadAtiva, ] = useState(obterSquadAtivaDaStorage());
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCadastrar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const novoUsuario = {}
    if(nome != "") {
      novoUsuario.nome = nome;
    }
    if(username != "") {
        novoUsuario.username = username;
    }
    if(senha != "") {
        novoUsuario.senha = senha;
    }
    if(status != "") {
        novoUsuario.status = status;
    }
    const novoUsuarioJSON = JSON.stringify(novoUsuario);
    const blob = new Blob([novoUsuarioJSON], {
      type: 'application/json'
    })
    formData.append('usuario', blob);

    cadastrar(formData)
      .then((resposta) => {
        const idUsuarioCriado = resposta.data.id;

        mudarUsuarioDeSquad(idUsuarioCriado, squadAtiva)
          .then((resposta) => {
            alert("Usuário cadastrado!");
            // console.log(resposta);
          })
          .catch((erro) => {
            alert("Erro ao adicionar usuário na equipe! Verifique o console.");
            console.error(erro);
          })

        history.go(0); // manda para home e dá reload
      })
      .catch((erro) => {
          alert("Erro ao criar usuário! Verifique o console.");
          console.error(erro);
      });
  }
  return (
    <div>
      <Tooltip title="Cadastrar membro" arrow>
        <button className="buttonModal" color="secondary" onClick={handleClickOpen}>
          {children}
        </button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >
        <form className="form" style={{ width: "270px", height: "370px" }} onSubmit={e => handleCadastrar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Cadastro</h3>
            <TextField
              className={classes.field}
              name="Nome"
              label="Nome"
              variant="outlined"
              size="small"
              color="secondary"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              className={classes.field}
              name="Username"
              label="Username"
              variant="outlined"
              size="small"
              color="secondary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.field}
              id="standard-password-input"
              name="Password"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              color="secondary"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <TextField
              name="Status (Opcional)"
              label="Status (Opcional)"
              variant="outlined"
              type="string"
              size="small"
              color="secondary"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </center>
          <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Cadastrar
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}