import React, { Component } from 'react';

class ValidationDate extends Component {
    render() {
        const {field} = this.props;
        return (
            <div>
                <div className="badge alert-danger">{ field }</div>
            </div>
        );
    }
}

export default ValidationDate;