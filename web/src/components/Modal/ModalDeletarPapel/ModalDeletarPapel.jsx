import React from 'react';

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { useStyles } from './Styles'
import '../styles.css';

import { obterDadosSquad } from '../../../services/ApiSquad';
import { removerCargo } from '../../../services/ApiCargo';
import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

export default function ModalDeletarSquad({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    squad: '',
    name: 'hai',
  });

  const [cargos, setCargos] = React.useState(null);
  const [cargoSelecionado, setCargoSelecionado] = React.useState(-1);

  const handleChange = (event) => {
    const name = event.target.name;

    setState({
      ...state,
      [name]: event.target.value,
    });

    setCargoSelecionado(event.target.value);
  };

  const history = useHistory();

  const handleOpen = () => {
    listarPapeis();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const listarPapeis = () => {
    obterDadosSquad(obterSquadAtivaDaStorage())
      .then((resposta) => {
        setCargos(resposta.data.cargos);
      })
      .catch((erro) => {
        alert("Erro ao obter equipe! Verifique o console.");
        console.error(erro);
      })
  }

  const handleSim = (e) => {
    e.preventDefault();

    // remover cargo aqui
    removerCargo(cargoSelecionado)
      .then((resposta) => {
        alert("Cargo Excluido!!");

        history.go(0);
      })
      .catch((erro) => {
        alert("Erro ao remover papel!");
        console.error(erro);
      })
  }

  return (
    <div>
      <Button disableElevation className="buttonModal" type="submit" style={{ width: "100%", textTransform: 'none', }} onClick={handleOpen}>
        {children}
      </Button>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >

          <form className={classes.form} onSubmit={e => handleSim(e)} >
            <center>
              <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
              <h3 className={classes.titleModal}>Deletar papel</h3>
              <h4 className={classes.subtitleModal}>Você deseja deletar esse papel?</h4>


              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Papel:</InputLabel>
                <Select
                  native
                  value={state.squad}
                  onChange={handleChange}
                  label="Papel"
                  inputProps={{
                    name: 'squad',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem papel</option>

                  {cargos ?
                    cargos.map(squad => (
                      <option value={squad.id}>{squad.nome}</option>
                    ))
                    :
                    ''
                  }
                </Select>
              </FormControl>
            </center>

            <DialogActions className={classes.dialogActions}>
              <button className="buttonConfirmar" onClick={handleClose} >
                Confirmar
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}