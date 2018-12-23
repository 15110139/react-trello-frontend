import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import userSearchContainer from 'components/SearchUser';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { noop, isEmpty, debounce } from 'lodash';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    // marginRight: theme.spacing.unit * 2,
    // marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    backgroundColor: '#E0E0E0',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
});

class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    };
    this.handleSearch = debounce(this.handleSearch, 500, {
      leading: false,
      trailing: true
    });
  }

  componentDidMount() {
    const { onSearch } = this.props;
    onSearch();
  }

  onSearchTextChange = e =>
    this.setState({ textSearch: e.target.value }, () =>
      this.handleSearch(this.state.textSearch)
    );

  handleSearch = textSearch => {
    this.props.onSearch({
      textSearch,
      pageSize: 10,
      pageIndex: 0
    });
  };

  renderSpinner = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <CircularProgress size={30} />
      </div>
    );
  };

  renderNotFound = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        No result found
      </div>
    );
  };

  renderUserList = () => {
    const {
      users = [],
      onUserPress = noop,
      isSearching = false,
      classes
    } = this.props;
    if (isSearching) return this.renderSpinner();
    if (!isSearching && isEmpty(users)) return this.renderNotFound();
    return (
      <List>
        {users.map(user => (
          <ListItem button onClick={() => onUserPress(user)} key={user._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${user.firstName} ${user.lastName} (${user.email})`}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  render() {
    const {
      classes,
      onClose = noop,
      users,
      open,
      isSearching,
      onUserPress = noop
    } = this.props;
    const { textSearch } = this.state;
    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        scroll={'paper'}
        fullWidth
      >
        <DialogTitle id="simple-dialog-title">Select user</DialogTitle>
        <DialogContent style={{ height: 500 }}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={textSearch}
              onChange={this.onSearchTextChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              height: '90%'
            }}
          >
            {this.renderUserList()}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default userSearchContainer(withStyles(styles)(AddMemberModal));
