import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { projectDataSelector } from '../selectors';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { get, noop } from 'lodash';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import PlusIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import themeVariables from '../../../theme';
import { toJS } from 'utils/toJS';
import ConfirmDialogManager from 'components/base/ConfirmDialogManager';
import Grow from '@material-ui/core/Grow/Grow';
import { createProjectSuccess } from '../actions';
import './style.css';
import AddMemberModal from './AddMemberModal/AddMemberModal';

const styles = {
  link: {
    textDecoration: 'none'
  },
  cardHeader: {
    padding: 0
  },
  card: {
    width: 250,
    height: 100,
    margin: 10,
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  menuItem: {
    '&:focus': {
      backgroundColor: themeVariables.palette.primary.main,
      '& $primary, & $icon': {
        color: themeVariables.palette.common.white
      }
    }
  }
};

class Project extends React.PureComponent {
  state = {
    anchorEl: null,
    showMoreButton: false,
    openAddMemberModal: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDeleteClick = () => {
    this.handleClose();
    ConfirmDialogManager.show({
      title: 'Confirm',
      content: 'Are you sure you want to delete this project ?',
      buttons: [
        {
          title: 'Cancel',
          onClick: () => {
            ConfirmDialogManager.close();
          }
        },
        {
          title: 'OK',
          onClick: () => {
            const {
              dispatchDeleteProject = noop,
              projectId,
              index
            } = this.props;
            dispatchDeleteProject({ projectId, projectIndex: index });
            ConfirmDialogManager.close();
          }
        }
      ]
    });
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem style={styles.menuItem} onClick={this.handleModalOpen}>
          <ListItemIcon>
            <PlusIcon />
          </ListItemIcon>
          <ListItemText inset primary="Add member" />
        </MenuItem>
        <MenuItem style={styles.menuItem}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Edit" />
        </MenuItem>
        <MenuItem style={styles.menuItem} onClick={this.handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Delete" />
        </MenuItem>
      </Menu>
    );
  };

  handleUserPress = user => {};

  handleModalOpen = () => this.setState({ openAddMemberModal: true });

  handleModalClose = () => this.setState({ openAddMemberModal: false });

  renderModal = () => {
    const { openAddMemberModal } = this.state;
    return (
      <AddMemberModal
        open={openAddMemberModal}
        onUserPress={this.handleUserPress}
        onClose={this.handleModalClose}
      />
    );
  };

  render() {
    const { project = {}, index, action } = this.props;
    const { _id, name, members } = project;
    const memberCount = get(members, 'length', 0);
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        {this.renderMenu()}
        {this.renderModal()}
        <Grow
          in={true}
          timeout={createProjectSuccess.is(action) ? 100 : 100 * index}
        >
          <Card style={styles.card} className={'card'}>
            <CardContent>
              <CardHeader
                style={styles.cardHeader}
                action={
                  <IconButton
                    className={'more-icon'}
                    onClick={this.handleClick}
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                  >
                    <MoreHorizIcon />
                  </IconButton>
                }
                title={
                  <Link style={styles.link} to={`/projects/${_id}`}>
                    <Typography variant={'subheading'}>{name}</Typography>
                  </Link>
                }
                subheader={`${memberCount} ${
                  memberCount > 1 ? 'members' : 'member'
                }`}
              />
            </CardContent>
          </Card>
        </Grow>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { projectId } = props;
  return {
    project: projectDataSelector(projectId)(state)
  };
};

export default connect(mapStateToProps)(toJS(Project));
