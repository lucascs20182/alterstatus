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
import ModalCadastrar from '../Modal/ModalCadastrar/ModalCadastrar';
import { PostAdd } from '@material-ui/icons';
import ModalCriarSquad from '../Modal/ModalPapel/ModalPapel';


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

  title: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
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
      <div className={classes.title}>
        {/* icone de adicionar squad */}
        <ModalCriarSquad >
          <PostAdd color="secondary"/>
        </ModalCriarSquad>

        {/* icone de adicionar usuario */}
        <ModalCadastrar>
          <PersonAddIcon color="secondary" style={{marginRight: 5,}}/>
        </ModalCadastrar>
        <h2 style={{marginRight: 5,}} >
          Pack
        </h2>

      </div>

      {/* Campo onde vão ficar os usuarios da squad */}
      
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
      </div>
    </div>
  );
}

