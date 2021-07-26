import React from 'react'
import ButtonCard from '../Button/ButtonMenu'
import user from '../../assets/user.svg'
import fonts from '../../fonts/Fonts.css'
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';


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
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          color="secondary"
        >
          <PersonAddIcon
            style={{
              height: 35,
              width: 35,
            }}
          />
        </IconButton>
        Projeto-aplicado-Alterdata-grupo-4-Front-Back</h3>
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>André Ricardo Adami </h3>
            <p className={classes.cargo}>Jogador de CS</p>
            <p className={classes.status}>Usando Hack</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Sthephanie Soares Nogueira</h3>
            <p className={classes.cargo}>Estranha</p>
            <p className={classes.status}>Jogando zeldinha</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Gabriel Esteves</h3>
            <p className={classes.cargo}> Não está mais</p>
            <p className={classes.status}>Mexendo no Front</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Larissa</h3>
            <p className={classes.cargo}>Saiu</p>
            <p className={classes.status}>Foi beber vinho no Soberbo</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Lucas Cruz</h3>
            <p className={classes.cargo}>Discord</p>
            <p className={classes.status}>Falando de Squad</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard/>
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}>Bernard Muniz</h3>
            <p className={classes.cargo}>Discord</p>
            <p className={classes.status}>Indignado com as regras de negócio</p>
          </div>
        </div>
      </div>
    </div>

  );
}

