import React, { useState, useEffect } from 'react';
import '../styles.css';
import '../../../styles/login.css';

import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

import { useStyles } from './Styles'
import { obterTokenDaStorage, removerAutenticacao } from '../../../utils/Storage';
import { obterDadosUsuario, editar } from '../../../services/ApiUsuario';

export default function ModalPerfil({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [usuarioLogado, setUsuarioLogado] = useState({});
  const [representacaoImagem, setRepresentacaoImagem] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');

  const handleFile = (e) => {
    const content = e.target.result;
    setRepresentacaoImagem(content);
  }

  const handleChangeFile = (img) => {
    if (img.size > 421888) { // definir tamanho máximo de img
      alert('Imagem grande demais!');

      return;
    }

    setImagem(img);

    const fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsDataURL(img);
  }

  const handleConfirmar = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const novoUsuario = {
      "id_usuario": usuarioLogado.id
    }

    if (nome != "") {
      novoUsuario.nome = nome;
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

    if (imagem != null) {
      formData.append('file', imagem);
    }

    editar(formData)
      .then((resposta) => {
        if (senha != "") {
          removerAutenticacao();
        }

        history.go(0);
      })
      .catch((erro) => {
        alert("Erro ao criar usuário! Verifique o console.");
        console.error(erro);
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let [, idUsuario] = obterTokenDaStorage();

    obterDadosUsuario(idUsuario)
      .then((resposta) => {
        const usuario = resposta.data;

        setUsuarioLogado(usuario);
        setRepresentacaoImagem(usuario.url);
      })
      .catch((erro) => {
        alert("Erro! Verifique o console.");
        console.error(erro);
      })
  }, []);

  return (
    <>
      {usuarioLogado == null ?
        ''
        :
        <div>
          <Tooltip title="Ver perfil" arrow>
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

            <form className={classes.form} 
              onSubmit={e => handleConfirmar(e)} >
              <center>
                <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
                <h3 className={classes.titleModal}>Perfil</h3>


                <h3 className={classes.avatar}>
                  <img className={classes.user} src={representacaoImagem} />
                </h3>

                <div className={classes.root}>

                  {
                    /* value={''} para resetar valor do input
                    e garantir que o evento onChange sempre aconteça
                    para tratativas de tamanho etc.               
                    */
                  }
                  <input accept="image/*" className={classes.input} id="icon-button-file"
                    type="file" value={''} onChange={e => handleChangeFile(e.target.files[0])} />
                  <label htmlFor="icon-button-file">
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                      <AddAPhoto />
                    </IconButton>
                  </label>
                </div>

                <TextField
                  className={classes.field}
                  name="Nome"
                  label={usuarioLogado.nome}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <TextField
                  className={classes.field}
                  id="standard-password-input"
                  name="Senha"
                  label={'Nova senha'}
                  variant="outlined"
                  type="password"
                  size="small"
                  color="secondary"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />

                <TextField
                  name="Status"
                  label={usuarioLogado.status}
                  variant="outlined"
                  type="string"
                  size="small"
                  color="secondary"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </center>

              <DialogActions className={classes.dialogActions}>
                <button className="buttonConfirmar" onClick={handleClose} >
                  Confirmar
                </button>
              </DialogActions>
            </form>
          </Dialog>

        </div>
      }
    </>

  );
}