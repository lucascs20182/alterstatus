import React from 'react';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    clipPath: "circle()",
    width: 11,
    height: 11,
    display: 'flex',
    backgroundColor: '#ff0000',
    color: '#ff0000',
    bottom: 25,
    left: 95,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Ocupado() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        variant="dot"
      >
      </StyledBadge>
    </div>
  );
}