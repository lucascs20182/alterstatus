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
    marginTop: 10,
    textAlign: "center",
    margin: 20,
    backgroundColor: "#D6D6D6",
    width: "170px",
    height: "180px",
    borderRadius: "2px",
    boxShadow: "0px 0.5px 0.5px 0.5px rgba(00, 00, 25, 0.3)",
  },

  info: {
    display: 'block',
    maxWidth: "200px",
    height: "200px",
  },

  avatar: {
    backgroundColor: "#094B89",
    clipPath: "circle()",
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
    fontSize: 15,
  },

  cargo: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
    wordBreak: "break-word",
    fontSize: 14,
  },

  status: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
    wordBreak: "break-word",
    fontSize: 14,
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
        Projeto-aplicado-Alterdata-grupo-4</h3>
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
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Offline />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Ausente />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Ocupado />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Online />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Ausente/>Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Ocupado />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Offline />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Ocupado />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Online />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
              <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
            </div>
            <h3 className={classes.nome}><Online />Guilherme.dsn.pack</h3>
            <p className={classes.cargo}>cargo</p>
            <p className={classes.status}>status</p>
          </div>
        </div>
        <div className={classes.root}>
          <div className={classes.info}>
            <div>
              <ButtonCard />
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

