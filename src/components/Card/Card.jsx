import React from 'react'
import user from '../../assets/user.svg'
import fonts from '../../fonts/Fonts.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  root: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto",
    backgroundColor: "#D6D6D6",
    width: "170px",
    height: "170px",
    paddingTop: "0.2px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingBottom: "5px",
    borderRadius: "2px",
    boxShadow: "0px 0.5px 0.5px 0.5px rgba(00, 00, 25, 0.3)",
  },
  
  info: {
    display: "block",
    maxWidth: "200px",
    height: "200px",
  },

  avatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#094B89",
    clipPath: "circle()",
    padding: "7px",
    margin: 15,
  },

  user: {
    width: "40px",
    height: "35px",
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

}))


export default function CardMembros(props) {
  const classes = useStyles();

  // const {id, nome, cargo, status} = props.cards; 

  return (
    <div>
      <h1 style={{ textAlign: 'center', }}>Squad aleatório</h1>
      <div className={classes.root}>
        <h3 className={classes.avatar}><img className={classes.user} src={user} /></h3>
        <h3 className={classes.nome}>Guilherme.dsn.pack</h3>
        <p className={classes.cargo}>cargo</p>
        <p className={classes.status}>status</p>
      </div>
    </div>
  );
}

