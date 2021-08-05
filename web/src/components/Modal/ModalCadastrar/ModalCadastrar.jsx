import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './Styles'
import '../styles.css';

import { cadastrar, mudarUsuarioDeSquad } from '../../../services/ApiUsuario';

import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

export default function ModalCadastrar({ children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [squadAtiva,] = useState(obterSquadAtivaDaStorage());

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

    if (nome != "") {
      novoUsuario.nome = nome;
    }

    if (username != "") {
      novoUsuario.username = username;
    }

    if (senha != "") {
      novoUsuario.senha = senha;
    }

    if (status != "") {
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
            alert("Erro ao adicionar usuário na squad! Verifique o console.");
            console.error(erro);
          })

        history.go(0); // manda para home e dá reload
      })
      .catch((erro) => {
        alert("Erro ao criar usuário! Verifique o console.");
        console.error(erro);
      });

    // limpa o formulário
    setNome('');
    setUsername('');
    setSenha('');
    setStatus('');
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
        className={classes.dialog}
      >

        <form className={classes.form} onSubmit={e => handleCadastrar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} color="secondary" onClick={handleClose} />
            <h3 className={classes.titleModal}>Cadastro</h3>
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

          <DialogActions className={classes.dialogActions}>
            <button className="buttonConfirmar" color="secondary" onClick={handleClose} >
              Cadastrar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}