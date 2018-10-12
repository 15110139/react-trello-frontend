import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Field } from 'formik';
import TextInput from 'components/Formik/TextInput';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    height: 100,
    margin: 10
  }
};

class AddProject extends React.Component {
  FormComponent = props => {
    return (
      <React.Fragment>
        <form>
          <Field
            name="project"
            title="Project"
            variant="outlined"
            component={TextInput}
          />
          <Button type="submit" variant="raised" color="primary">
            Add
          </Button>
        </form>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Formik render={this.FormComponent} />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(AddProject);
