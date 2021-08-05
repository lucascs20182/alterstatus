import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  squadTitle: {
    marginBottom: "3px", 
    wordBreak: "break-word", 
    marginTop: 30
  },

  title: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 0,
  },
  
  subtitle: {
    marginBottom: 0,
    marginTop: 5,
    color: "#000",
    fontStyle: "bold"
  },

  buttons: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  root: {
    display: 'table',
    textAlign: "center",
    marginRight: 20,
    marginTop: 10,
    backgroundColor: "#D6D6D6",
    width: "160px",
    height: "230px",
    borderRadius: "2px",
    boxShadow: "0px 1px 1px 1px rgba(00, 00, 25, 0.3)",
  },

  info: {
    display: 'block',
    maxWidth: "180px",
    height: "190px",
  },

  avatar: {
    clipPath: 'circle(26%)',
    height: 70,
    marginBottom: 10,
    marginTop: 10,
  },

  user: {
    height: 70
  },

  nome: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: -5,
    wordBreak: "break-word",
    fontSize: 13,
    color: "#000",
  },

  cargo: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
    color: "#000",
  },

  status: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
    color: "#000",
  },

  Button: {
    marginRight: theme.spacing(2),
  },
}))