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
    e.preventDefault();

    obterDadosSquad(squadSelecionado)
      .then((resposta) => {
        setUsuariosDoSquad(resposta.data.usuarios)
      })
      .catch((erro) => {
        alert("Erro ao obter usuarios do squad! Verifique o console.");
        console.error(erro);
      })

    console.log(usuariosDoSquad.length);

    if (usuariosDoSquad.length == 0) {

      console.log(squadSelecionado);
      removerSquad(squadSelecionado) //Dando erro Bad Request 400, Pq meu deus do céu?
        .then((resposta) => {
          alert("Squad Excluido!!");

          history.go(0);
        })
        .catch((erro) => {
          alert("Erro ao remover o Squad!");
          console.error(erro);
        })
    } else {
      alert("Não se pode deletar um squad com usuários ainda nele");
    }

    setOpen(false);
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