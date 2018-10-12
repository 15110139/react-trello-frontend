import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    height: 100,
    margin: 10
  }
};

function Project(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant={'title'}>Project 1</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Project);
