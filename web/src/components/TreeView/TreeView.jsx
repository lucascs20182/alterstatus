import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalTrocarSquad from '../Modal/ModalTrocarSquad/ModalTrocarSquad'

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import { obterSquads } from '../../services/ApiSquad';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.50, 1),
  },
  labelIcon: {
    marginRight: theme.spacing(2),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 280,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  // useEffect(() => {
  //   obterSquads
  //     .then((resposta) => {
  //       console.log(resposta);
  //     })
  //     .catch((erro) => {
  //       alert("Erro! Verifique o console.");
  //       console.error(erro);
  //     });
  // }, []);

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['10']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 30 }} />}
    >
      <StyledTreeItem nodeId="1" labelText="Squads" color="#094B89" labelIcon={GroupOutlinedIcon} >
        <ModalTrocarSquad ><StyledTreeItem
          nodeId="2"
          labelText="NFStock"
          labelIcon={SupervisorAccountIcon}
          color="#094B89"
          bgColor="#e8f0fe"
          
        /></ModalTrocarSquad>
        <ModalTrocarSquad><StyledTreeItem
          nodeId="3"
          labelText="BimerUp"
          labelIcon={SupervisorAccountIcon}
          color="#094B89"
          bgColor="#e8f0fe"
        /></ModalTrocarSquad>
        <ModalTrocarSquad><StyledTreeItem
          nodeId="4"
          labelText="Shop"
          labelIcon={SupervisorAccountIcon}
          color="#094B89"
          bgColor="#e8f0fe"
        /></ModalTrocarSquad>
        <ModalTrocarSquad><StyledTreeItem
          nodeId="5"
          labelText="Financeiro"
          labelIcon={SupervisorAccountIcon}
          color="#094B89"
          bgColor="#e8f0fe"
        /></ModalTrocarSquad>
      </StyledTreeItem>
      <StyledTreeItem nodeId="8" labelText="Usuários" color="#1a73e8" labelIcon={PersonOutlineIcon} >
        <StyledTreeItem
          nodeId="9"
          labelText="gabriel.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="10"
          labelText="sthephanie.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="11"
          labelText="lucas.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="12"
          labelText="bernard.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="13"
          labelText="larissa.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="14"
          labelText="andre.dsn.pack"
          labelIcon={PersonIcon}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
      </StyledTreeItem>
    </TreeView>
  );
}