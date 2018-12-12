import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { projectDataSelector } from '../selectors';
import { Link } from 'react-router-dom';

const styles = {
  link: {
    textDecoration: 'none'
  },
  card: {
    width: 250,
    height: 100,
    margin: 10,
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }
};

function Project(props) {
  const { classes, project } = props;
  const { _id, name } = project;
  return (
    <Link className={classes.link} to={`/projects/${_id}`}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant={'subheading'}>{name}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

const mapStateToProps = (state, props) => {
  const { projectId } = props;
  return {
    project: projectDataSelector(projectId)(state)
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Project));
