import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Field } from 'formik';
import TextInput from 'components/Formik/TextInput';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { projectsDataSelector, actionSelector } from '../selectors';
import { createProject, createProjectSuccess, resetProject } from '../actions';
import { toJS } from 'utils/toJS';
import { findKey, isEmpty } from 'lodash';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
    display: 'flex'
  },
  input: {
    flexGrow: 0.8
  },
  button: {
    flexGrow: 0.2
  }
};

const nameValidate = (value, projects) => {
  if (!value) return "Please enter project's name";
  if (findKey(projects, project => project.name === value))
    return 'This project is already exist';
};

class CreateProject extends React.Component {
  FormComponent = props => {
    this.form = props;
    const { projects, classes } = this.props;
    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <Field
            className={classes.input}
            validate={value => nameValidate(value, projects)}
            name="name"
            title="Project"
            placeholder="Project name"
            component={TextInput}
            floatingLabel={false}
          />
          <Button className={classes.button} type="submit" color="primary">
            Add
          </Button>
        </form>
      </React.Fragment>
    );
  };

  handleSubmit = values => {
    this.props.dispatchCreateProject(values);
  };

  handleClickAway = () => {
    const { touched, values, errors } = this.form;
    if (isEmpty(touched)) return;
    else if (!isEmpty(errors)) {
    } else if (!isEmpty(values.name)) {
      this.handleSubmit(values);
    }
  };

  componentDidUpdate() {
    const { resetForm } = this.form;
    const { action, dispatchResetProject } = this.props;
    if (createProjectSuccess.is(action)) {
      console.log('here');
      resetForm();
      dispatchResetProject();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Card className={classes.card}>
          <CardContent>
            <Formik
              initialValues={{
                name: ''
              }}
              render={this.FormComponent}
              onSubmit={this.handleSubmit}
            />
          </CardContent>
        </Card>
      </ClickAwayListener>
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
