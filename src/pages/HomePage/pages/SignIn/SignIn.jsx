import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Formik } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignIn extends React.Component {

  FormComponent(classes, values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting) {
    const emailError = errors.email && touched.email;
    const passwordError = errors.password && touched.password;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth error={emailError}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus error={emailError}
                value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                <FormHelperText error={emailError}>{emailError && errors.email}</FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth error={emailError}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password" type="password" id="password" autoComplete="current-password" error={passwordError}
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                />
                <FormHelperText error={passwordError}>{passwordError && errors.password}</FormHelperText>
              </FormControl>
              <Button

                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                onSubmit={handleSubmit}
                className={classes.submit}
                disabled={isSubmitting || emailError || !touched.email}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Formik initialValues={{ email: '', password: '' }} 
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Email is equired';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}>
        {
          ({
            values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => 
            this.FormComponent(classes, values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting)
        }
      </Formik>

    );
  }
}


export default withStyles(styles)(SignIn);
