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
import { usernameValidator, passwordValidator } from 'utils/validators';
import { Link } from 'react-router-dom';
import { isEqual, get } from 'lodash';

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

class SignIn extends React.Component {
  FormComponent = props => {
    const { classes, loading } = this.props;
    this.form = props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <Field
                title="Username or Email"
                name="emailOrUserName"
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
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
            <div className={classes.textContainer}>
              Don't have account? Click <Link to="sign-up">here</Link> to create
              one.
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.error, prevProps.error)) {
      const status = get(this.props, 'error.status');
      if (status === 'USER_NAME_IS_NOT_EXIST') {
        this.form.setFieldError(
          'emailOrUserName',
          'This user is not exist. Please check and try again.'
        );
      } else if (status === 'EMAIL_IS_NOT_EXIST') {
        this.form.setFieldError(
          'emailOrUserName',
          'Your email is not exist. Please check and try again.'
        );
      } else if (status === 'PASSWORD_INCORRECT')
        this.form.setFieldError(
          'password',
          'Your password is incorrect. Please check and try again.'
        );
    }
    // this.props.resetSignIn();
  }

  handleSubmit = values => {
    this.props.resetSignIn();
    this.props.handleSignIn(values);
  };

  render() {
    return (
      <Formik
        initialValues={{ emailOrUserName: '', password: '' }}
        render={this.FormComponent}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withStyles(styles)(SignIn);
