import React from 'react';
class Square extends React.Component {
    render(){
        return (
            <img className="square"
              src={this.props.src}
              onClick={this.props.onClick}
              alt={this.props.src}
            />
          );
    }
}

export default Square;