import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: '#094B89',
  },

  dialog: {
    width: "100%" 
  },

  field: {
    marginBottom: 15,
  },

  avatar: {
    clipPath: 'circle(21%)',
    height: 102,
    margin: 0,
    padding: 0
  },

  user: {
    height: '92%'
  },

  input: {
    display: 'none',
  },

  form: {
    width: "270px", 
    height: "470px"
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -5 
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center'
  },

}));