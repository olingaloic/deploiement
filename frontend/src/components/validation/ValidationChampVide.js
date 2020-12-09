import React, { Component } from 'react';

class ValidationChamp extends Component {
    
    render() {
        const {field} = this.props;
        return (
            <div>
                <div  className="text-danger">Veuillez saisir { field } valide</div>
            </div>
        );
    }
}

export default ValidationChamp;