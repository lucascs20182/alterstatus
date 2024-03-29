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

import { removerSquad, obterSquads, obterDadosSquad } from '../../../services/ApiSquad';

export default function ModalDeletarSquad({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    squad: '',
    name: 'hai',
  });

  const [squads, setSquads] = React.useState(null);
  const [squadSelecionado, setSquadSelecionado] = React.useState(-1);
  const [usuariosDoSquad, setUsuariosDoSquad] = React.useState([]);

  const handleChange = (event) => {
    const name = event.target.name;

    setState({
      ...state,
      [name]: event.target.value,
    });

    setSquadSelecionado(event.target.value);
  };

  const history = useHistory();

  const handleOpen = () => {
    obterEquipes();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const obterEquipes = () => {

    obterSquads()
      .then((resposta) => {
        setSquads(resposta.data);
      })
      .catch((erro) => {
        alert("Erro ao obter squad! Verifique o console.");
        console.error(erro);
      })

  }

  const handleSim = (e) => {    
    removerSquad(squadSelecionado)
      .then((resposta) => {
        alert("Equipe Excluída!");

        history.go(0);
      })
      .catch((erro) => {
        alert("Equipe não pode ser removida com usuários dentro.");
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

        <form className={classes.form} onSubmit={e => e.preventDefault()} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 className={classes.titleModal}>Atenção!!!</h3>
            <h4 className={classes.subtitleModal}>Você deseja deletar o equipe do Alterstate?</h4>
            <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Equipe:</InputLabel>
                <Select
                  native
                  value={state.squad}
                  onChange={handleChange}
                  label="Equipe"
                  inputProps={{
                    name: 'squad',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem equipe</option>

                  {squads ?
                    squads.map(squad => (
                      <option value={squad.id}>{squad.nome}</option>
                    ))
                    :
                    ''
                  }
                </Select>
              </FormControl>
          </center>
          <DialogActions className={classes.dialogActions}>
            <button className="buttonDeletar" onClick={handleSim} >
              Sim
            </button>
            <button className="buttonConfirmar" onClick={handleClose} >
              Não
            </button>
          </DialogActions>
        </form>
      </Dialog>
      </div>            
    </div>
  );
}