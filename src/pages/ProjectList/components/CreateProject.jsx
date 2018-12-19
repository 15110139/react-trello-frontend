import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Field } from 'formik';
import TextInput from 'components/Formik/TextInput';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { projectsDataSelector, actionSelector } from '../selectors';
import {
  createProject,
  createProjectFail,
  createProjectSuccess,
  resetProject
} from '../actions';
import { toJS } from 'utils/toJS';
import { findKey, isEqual } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grow from '@material-ui/core/Grow/Grow';
import Modal from 'components/base/Modal';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  card: {
    width: 250,
    height: 100,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    display: 'inline'
  },
  input: {
    width: 120,
    marginRight: 10,
    float: 'left'
  },
  button: {
    'box-shadow': `
    0px 1px 3px 0px rgba(0, 0, 0, 0.2), 
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
    0px 2px 1px -1px rgba(0, 0, 0, 0.12)
    `
  }
};

const nameValidate = (value, projects) => {
  if (!value) return "Please enter project's name";
  if (findKey(projects, project => project.name === value))
    return 'This project is already exist';
};

class CreateProject extends React.Component {
  state = {
    show: false
  };

  handleOpen = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });

  FormComponent = props => {
    this.form = props;
    const { projects } = this.props;
    const loading = this.isLoading();

    return (
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <Field
            autoFocus
            margin="dense"
            validate={value => nameValidate(value, projects)}
            name="name"
            title="Project"
            component={TextInput}
            autoComplete={'off'}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ width: 80 }}
            onClick={this.handleClose}
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            style={{ width: 80 }}
            onClick={props.handleSubmit}
            color="primary"
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={14} style={{ marginRight: 6 }} />
            )}
            OK
          </Button>
        </DialogActions>
      </form>
    );
  };

  handleSubmit = values => {
    this.props.dispatchCreateProject(values);
  };

  isLoading = () => createProject.is(this.props.action);

  componentDidUpdate(prevProps) {
    const { action, dispatchResetProject } = this.props;
    if (!isEqual(action, prevProps.action)) {
      if (createProjectSuccess.is(action) || createProjectFail.is(action)) {
        if (this.state.show) {
          this.handleClose();
          dispatchResetProject();
        }
      }
    }
  }

  renderModal = () => {
    const { show } = this.state;
    const loading = this.isLoading();
    return (
      <Modal
        fullWidth
        show={show}
        handleClose={this.handleClose}
        title={'Create Project'}
        content={
          <Formik
            initialValues={{
              name: ''
            }}
            render={this.FormComponent}
            onSubmit={this.handleSubmit}
          />
        }
      />
    );
  };

  render() {
    const { classes, index } = this.props;
    return (
      <React.Fragment>
        {this.renderModal()}
        <Grow in={true} timeout={100 * index}>
          <Button
            className={`${classes.card} ${classes.button}`}
            onClick={this.handleOpen}
          >
            <AddIcon />
          </Button>
        </Grow>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    action: actionSelector(state),
    projects: projectsDataSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateProject: req => dispatch(createProject(req)),
    dispatchResetProject: () => dispatch(resetProject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(withStyles(styles)(CreateProject)));
