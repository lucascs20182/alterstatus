import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 270,
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
    width: "320px", 
    height: "210px"
  },

  titleModal: {
    color: "#f44336", 
    textAlign: 'center',
    marginTop: -5
  },

  subtitleModal: {
    marginTop: 2
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: -20
  },

}));