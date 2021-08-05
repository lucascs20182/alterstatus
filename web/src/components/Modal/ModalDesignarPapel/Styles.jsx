import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 230,
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
    width: "270px", 
    height: "290px"
  },

  formControl:{
    width: "220px",
    marginBottom: 25
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -5
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: -25,
  }

}));