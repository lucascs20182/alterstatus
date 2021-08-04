import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModalListaDeCargos from '../Modal/ModalListaDePapeis/ModalListaDePapeis';
import ModalStatus from '../Modal/ModalStatus/ModalStatus';
import ModalDeletar from '../Modal/ModalDeletar/ModalDeletar';

const useStyles = makeStyles({
  pontinhos: {
    marginBottom: -40
  },
});

const ITEM_HEIGHT = 48;


export default function PositionedTooltips(props) {
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
      <Grid container justifyContent="flex-end" style={{ marginLeft: 5 }}>
        <Grid item>
          <Tooltip title="menu">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon style={{ color: '#000' }}/>
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            style={{
              marginTop: 35,
            }}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.0,
                width: '18ch',
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ModalListaDeCargos usuarioId={props.usuarioId}>Editar papel</ModalListaDeCargos>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ModalStatus usuarioId={props.usuarioId}>Editar status</ModalStatus>
            </MenuItem>
            <ModalDeletar usuarioId={props.usuarioId}>
              <MenuItem onClick={handleClose}>
                Deletar
              </MenuItem>
            </ModalDeletar>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
}
