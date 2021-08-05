import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 245,
    marginTop: 5,
    color: '#094B89',
  },

  dialog: {
    width: "100%" 
  },

  field: {
    marginBottom: 5,
  },

  form: {
    width: "280px", 
    height: "300px"
  },

  formControl:{
    width: "220px",
    marginBottom: 25,
    marginTop: 5,
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -1
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: -25,
  }

}));