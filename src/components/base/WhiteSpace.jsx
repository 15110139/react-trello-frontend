import React from 'react';

class WhiteSpace extends React.Component {
  render() {
    let sizePx = 0;
    switch (this.props.size) {
      case 'xs': {
        sizePx = 4;
        break;
      }
      case 'sm': {
        sizePx = 8;
        break;
      }
      case 'md': {
        sizePx = 16;
        break;
      }
      case 'lg': {
        sizePx = 24;
        break;
      }
      default: {
        break;
      }
    }
    return <div style={{ marginTop: sizePx / 2, marginBottom: sizePx / 2 }} />;
  }
}

export default WhiteSpace;
