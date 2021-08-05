import React, { useState } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import { useStyles } from './Styles'

import { mudarNomeDoSquad } from '../../../utils/Storage';
import { editarNomeDeSquad } from '../../../services/ApiSquad';
import '../styles.css';

export default function ModalCriarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [novoNome, setNovoNome] = useState('');

  // const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditarNome = (e) => {
    e.preventDefault();
    editarNomeDeSquad(mudarNomeDoSquad(), novoNome)
      .then((resposta) => {
        history.go(0);
      })
      .catch((erro) => {
        alert("Erro! Verifique o console.");
        console.error(erro);
        // setCarregar(false);
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Alterar nome da Equipe" arrow>
        <button className="buttonModal" type="submit" onClick={handleOpen}>
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

          <form className={classes.form} onSubmit={e => e.preventDefault()} >
            <center>
              <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
              <h3 className={classes.titleModal} >Alterar nome da equipe</h3>
              <TextField
                className={classes.field}
                name="Novo nome"
                label="Novo nome"
                variant="outlined"
                size="small"
                color="secondary"
                onChange={e => setNovoNome(e.target.value)}
              />

            </center>

            <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
              <button className="buttonConfirmar" onClick={handleEditarNome}>
                Alterar
              </button>
            </DialogActions>
          </form>
        </Dialog>
    </div>
  );
}