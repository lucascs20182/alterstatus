import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from '../Modal/Modal'

const useStyles = makeStyles({
  pontinhos: { 
    marginBottom: -40
  },
});

const ITEM_HEIGHT = 48;

const options = [
  'Editar status',
  'Editar cargo',
  'Excluir membro',
];

export default function PositionedTooltips() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.pontinhos}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Tooltip title="menu">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              style={{ marginTop: 35, 
              marginLeft: 25}}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.0,
                  width: '18ch',
                },
              }}
            >
                <MenuItem  onClick={handleClose}>
                <Modal>Editar status</Modal>
                </MenuItem>
                <MenuItem  onClick={handleClose}>
                Editar status
                </MenuItem>
                <MenuItem  onClick={handleClose}>
                Editar status
                </MenuItem>
            </Menu>
        </Grid>
      </Grid>
    </div>
  );
}
