import React from 'react';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
  badge: {
    clipPath: "circle()",
    width: 11,
    height: 11,
    display: 'flex',
    backgroundColor: '#44b700',
    color: '#44b700',
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

export default function Online() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        variant="dot"
      >
      </StyledBadge>
    </div>
  );
}