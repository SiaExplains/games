import React, { Component } from 'react';
import './shell.css';
class ShellComponent extends Component {
    isBallUnderMe = () => {
        const { canGuess, myIndex } = this.props;
        if (!canGuess) return;
        this.props.checkWinningIndex(myIndex);
    };

    render() {
        return (
            <div
                onClick={this.isBallUnderMe}
                role='button'
                className={this.props.hasBall ? 'shell-win' : 'shell'}
                style={{
                    transform: `translateX(${this.props.x}px) translateY(${this.props.y}px)`,
                    transition: `transform ${this.props.speed}ms`
                }}
            ></div>
        );
    }
}

export default ShellComponent;
