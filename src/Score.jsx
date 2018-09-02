import React from 'react';

class Score extends React.Component{
    render(){
        return(
            
            <h1 className="score">{this.props.value}</h1>
        );
    }
}

export default Score;