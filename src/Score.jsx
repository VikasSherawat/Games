import React from 'react';

class Score extends React.Component{
    render(){
        return(
            <div className={this.props.class}>
            {this.props.value}
            </div>
        );
    }
}

export default Score;