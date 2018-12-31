'use-strict'

import React from 'react';
import './loading.scss';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 15,
        };
    }

    render() {
        if (!this.props.active) {
            return null;
        }
        const boxClass = 'loading open-box';
        return (
            <div className={boxClass}>
                <div className="loading-text">
                    <span className="loading-text-words">L</span>
                    <span className="loading-text-words">O</span>
                    <span className="loading-text-words">A</span>
                    <span className="loading-text-words">D</span>
                    <span className="loading-text-words">I</span>
                    <span className="loading-text-words">N</span>
                    <span className="loading-text-words">G</span>
                </div>
            </div>
        );
    }
}

export default Loading;