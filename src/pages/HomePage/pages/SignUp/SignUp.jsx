import React from 'react';
import { Formik, Field } from 'formik';
import TextInput from 'components/Formik/TextInput';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  usernameValidator,
  passwordValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  confirmPasswordValidator
} from 'utils/validators';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  textContainer: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 14
  }
});

class SignUp extends React.Component {
  FormComponent = props => {
    const { classes, loading } = this.props;
    const password = get(props, 'values.password', '');
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign Up</Typography>
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <Field
                title="Firstname"
                name="firstName"
                component={TextInput}
                validate={firstNameValidator}
              />
              <Field
                title="Lastname"
                name="lastName"
                component={TextInput}
                validate={lastNameValidator}
              />
              <Field
                title="Email"
                name="email"
                component={TextInput}
                validate={emailValidator}
              />
              <Field
                title="Username"
                name="username"
                component={TextInput}
                validate={usernameValidator}
              />
              <Field
                title="Password"
                name="password"
                type="password"
                component={TextInput}
                validate={passwordValidator}
              />
              <Field
                title="Retype Password"
                name="confirm_password"
                type="password"
                component={TextInput}
                validate={value => confirmPasswordValidator(value, password)}
              />
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign up
              </Button>
            </form>
            <div className={classes.textContainer}>
              Already have account? Click <Link to="sign-in">here</Link> to Sign
              In.
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  };

  handleSubmit = values => {
    this.props.handleSignIn(values);
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          confirm_password: ''
        }}
        render={this.FormComponent}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withStyles(styles)(SignUp);
