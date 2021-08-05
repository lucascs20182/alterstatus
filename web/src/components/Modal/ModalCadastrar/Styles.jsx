import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 230,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 15,
  },

  dialog: {
    width: "100%"
  },

  form: {
    width: "270px", 
    height: "370px"
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -5
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center',
  },

}));