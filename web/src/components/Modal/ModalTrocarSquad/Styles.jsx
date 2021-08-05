import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 5,
  },

  dialog: {
    width: "100%"
  },

  form: {
    width: "290px", 
    height: "180px"
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -5 
  },

  subtitleModal: {
    marginBottom: 0,
    marginTop: 0
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center'
  },

}));