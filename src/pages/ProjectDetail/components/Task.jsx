import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { DndContext } from '../constants';
import styled from 'styled-components';
import { taskDataSelector } from '../selectors';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';
import { deleteListSuccess, deleteTask, deleteTaskSuccess } from '../actions';
import IconButton from '@material-ui/core/IconButton/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '../../../components/base/Modal';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { noop } from 'lodash';

const styles = {
  setting: {
    position: 'absolute',
    right: 4,
    top: 4,
    padding: 4,
    backgroundColor: '#ebeef0',
    borderRadius: 0
  }
};

class Task extends React.PureComponent {
  state = {
    anchorEl: null,
    show: false
  };

  componentDidUpdate(prevProps) {
    const { action } = this.props;
    if (prevProps.action !== action) {
      if (deleteTaskSuccess.is(action)) {
        this.handleModalClose();
      }
    }
  }

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalOpen = () => {
    this.setState({ show: true });
  };

  handleModalClose = () => {
    this.setState({ show: false });
  };

  handleDeleteClick = () => {
    this.handleModalOpen();
    this.handleMenuClose();
  };

  onDeleteTask = () => {
    const {
      dispatchDeleteTask = noop,
      listId,
      projectId,
      index,
      taskId
    } = this.props;
    dispatchDeleteTask({ listId, projectId, taskId, taskIndex: index });
  };

  isLoading = () => deleteTask.is(this.props.action);

  renderMenu = () => {
    const { anchorEl } = this.state;
    return (
      <Menu
        id={`task_menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem style={styles.menuItem} onClick={this.handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Delete" />
        </MenuItem>
      </Menu>
    );
  };

  renderModal = () => {
    const loading = this.isLoading();
    const { show } = this.state;
    return (
      <Modal
        fullWidth
        show={show}
        handleClose={this.handleClose}
        title={'Confirm'}
        content={
          <React.Fragment>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this task?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ width: 80 }}
                disabled={loading}
                onClick={this.handleModalClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ width: 80 }}
                disabled={loading}
                onClick={this.onDeleteTask}
                color="primary"
                autoFocus
              >
                {loading && (
                  <CircularProgress style={{ marginRight: 8 }} size={14} />
                )}{' '}
                OK
              </Button>
            </DialogActions>
          </React.Fragment>
        }
      />
    );
  };

  render() {
    const {
      taskData: { _id, name },
      index
    } = this.props;
    console.log(_id);
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        {this.renderMenu()}
        {this.renderModal()}
        <Draggable index={index} draggableId={_id} type={DndContext.CARD}>
          {(provided, snapshot) => (
            <Container
              innerRef={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={'task'}
            >
              <IconButton
                style={styles.setting}
                className={'setting-icon-task'}
                aria-haspopup="true"
                aria-owns={anchorEl ? `task_menu` : undefined}
                onClick={this.handleMenuOpen}
              >
                <EditIcon style={{ fontSize: 16 }} />
              </IconButton>
              <span style={{ wordWrap: 'break-word', marginRight: 10 }}>
                {name}
              </span>
            </Container>
          )}
        </Draggable>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 200px;
  padding: 10px;
  margin: 10px 0;
  background-color: white;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  &:first-child {
    margin-top: 0;
  }
  ,
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background-color: ghostwhite;
  }
`;

const mapStateToProps = (state, props) => {
  const { taskId, projectId } = props;
  return {
    taskData: taskDataSelector({ projectId, taskId })(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchDeleteTask: req => dispatch(deleteTask(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Task));
