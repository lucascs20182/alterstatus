import React from 'react';
import fechar from '../assets/fechar.png'
import status from '../assets/status.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import './card.css';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 260,
    maxHeight:180,
    backgroundColor: " 	#D6D6D6",
    
  },
  media: {
    height: 0,
    paddingTop: '16.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor:" #094B89",
    marginTop:-10,
    marginBottom: -35,
    marginLeft: 90,
    width: 60,
    height: 60,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);



  return (

    <Card className={classes.root}>
     <div>
        <img className = "editarFechar"src={fechar}/>
     </div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
    />
  
      <CardContent>
        <center>
  
     <div className= "usuario">
       <div>
       <h3 className="nome"> <img className="editarStatus" src={status}/> Fulano </h3>
         </div>
  
        <p className = "cargo">cargo</p>
        <p className = "status">almoçando</p>
   </div>
    </center>
     


      </CardContent>
        <IconButton aria-label="add to favorites">
        </IconButton>
    </Card>
  );
}