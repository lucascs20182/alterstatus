import React from 'react'
import Online from '../../components/Status/StatusOnline';
import Offline from '../../components/Status/StatusOffline';
import Ausente from '../../components/Status/StatusAusente';
import Ocupado from '../../components/Status/StatusOcupado';
import ButtonCard from '../Button/ButtonMenu'
import user from '../../assets/user.svg'
import fonts from '../../fonts/Fonts.css'
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../Modal/Modal'
import { PostAdd } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  }, 

  root: {
    display: 'table',
    textAlign: "center",
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "#D6D6D6",
    width: "170px",
    height: "180px",
    borderRadius: "2px",
    boxShadow: "0px 1px 1px 1px rgba(00, 00, 25, 0.3)",
  },

  info: {
    display: 'block',
    maxWidth: "200px",
    height: "200px",
  },

  avatar: {
    backgroundColor: "#094B89",
    clipPath: 'circle(26%)',
    padding: "7px",
    margin: 10,
  },

  user: {
    width: "40px",
    height: "38px",
  },

  nome: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
    wordBreak: "break-word",
    fontSize: 13,
  },

  cargo: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
  },

  addPessoa: {
    height: 35,
    width: 35,
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 10,
    paddingBottom: 6,
    alignSelf: 'center',
  },

  addCargo: {
    height: 35,
    width: 35,
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    alignSelf: 'center',
  },

  status: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
  },

  Button: {
    marginRight: theme.spacing(2),
  },
}))


export default function CardMembros(props) {
  const classes = useStyles();

  // const {id, nome, cargo, status} = props.cards; 

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
      <IconButton className={classes.addCargo}
          aria-label="show more"
          aria-haspopup="true"
          color="secondary"
        >
          <PostAdd />
        </IconButton>
        <IconButton className={classes.addPessoa}
          aria-label="show more"
          aria-haspopup="true"
          color="secondary"
        >
          <Modal><PersonAddIcon /></Modal>
        </IconButton>
        Projeto-aplicado-Alterdata-grupo-4-Front-Back
      </h3>
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Online />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
      </div>
    </div>
  );
}

