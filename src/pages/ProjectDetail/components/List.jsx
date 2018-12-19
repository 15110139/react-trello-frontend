import { Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
import Task from './Task';
import { DndContext } from '../constants';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';
import { listDataSelector } from '../selectors';
import AddCard from './AddCard';
import { isArray, get, compact, noop } from 'lodash';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import PlusIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import themeVariables from '../../../theme';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialogManager from 'components/base/ConfirmDialogManager';
import { deleteList, deleteListSuccess } from '../actions';
import { deleteProject, deleteProjectSuccess } from '../../ProjectList/actions';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import Button from '@material-ui/core/Button/Button';
import { Formik } from 'formik';
import Modal from '../../../components/base/Modal';

const styles = {
  menuItem: {
    '&:focus': {
      backgroundColor: themeVariables.palette.primary.main,
      '& $primary, & $icon': {
        color: themeVariables.palette.common.white
      }
    }
  }
};

class List extends React.PureComponent {
  state = {
    anchorEl: null,
    show: false
  };

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

  isLoading = () => deleteList.is(this.props.action);

  componentDidUpdate(prevProps) {
    const { action } = this.props;
    if (prevProps.action !== action) {
      if (deleteListSuccess.is(action)) {
        this.handleModalClose();
      }
    }
  }

  onDeleteList = () => {
    const { dispatchDeleteList = noop, listId, index, projectId } = this.props;
    dispatchDeleteList({ projectId, listIndex: index, listId });
  };

  handleDeleteClick = () => {
    this.handleModalOpen();
    this.handleMenuClose();
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
                Are you sure you want to delete this list?
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
                onClick={this.onDeleteList}
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

  renderMenu = () => {
    const { anchorEl } = this.state;
    const { _id } = get(this.props, 'listData', {});
    return (
      <Menu
        id={`list_menu`}
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

  render() {
    const { projectId, index, action } = this.props;
    const { anchorEl } = this.state;
    const { _id, name, tasks } = get(this.props, 'listData', {});
    return (
      <React.Fragment>
        {this.renderMenu()}
        {this.renderModal()}
        <Draggable
          type={DndContext.LIST}
          draggableId={_id}
          index={this.props.index}
        >
          {(provided, snapshot) => {
            return (
              <Container
                innerRef={provided.innerRef}
                {...provided.draggableProps}
              >
                <Title {...provided.dragHandleProps}>
                  {name}
                  <IconButton
                    onClick={this.handleMenuOpen}
                    aria-owns={anchorEl ? `list_menu` : undefined}
                    style={{ padding: 4 }}
                    aria-haspopup="true"
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Title>

                <Droppable droppableId={_id} type={DndContext.CARD}>
                  {(provided, snapshot) => {
                    return (
                      <CardList
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {isArray(tasks) &&
                          compact(tasks).map((id, index) => {
                            return (
                              <Task
                                key={id}
                                taskId={id}
                                listId={_id}
                                projectId={projectId}
                                index={index}
                                action={action}
                              />
                            );
                          })}
                        {provided.placeholder}
                      </CardList>
                    );
                  }}
                </Droppable>
                <AddCard listId={_id} projectId={projectId} />
              </Container>
            );
          }}
        </Draggable>
      </React.Fragment>
    );
  }
}

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #dfe3e6;
  padding: 10px 10px 0 20px;
  margin: 5px 5px 0 5px;
  font-weight: bold;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1);
`;

const Container = styled.div``;

export const CardList = styled.div`
  background-color: #dfe3e6;
  width: 220px;
  padding: 10px;
  margin: 5px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1);
  user-select: none;
  &:first-child {
    margin-top: 0;

  },
  &:nth-child(2) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    
  },
`;

const mapStateToProps = (state, props) => {
  const { listId, projectId } = props;
  return {
    listData: listDataSelector({ projectId, listId })(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchDeleteList: req => dispatch(deleteList(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(List));
