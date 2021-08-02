import { alpha, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    height: "215px",
  },

  avatar: {
    clipPath: 'circle(26%)',
    height: 70,
    marginBottom: 15
  },


  user: {
    height: 70
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