import React, { Component } from 'react'
import Square from './square'

class Board extends Component {


    renderSqaure(index) {
        return (
            <Square value={this.props.squares[index]}
                onClick={() => { this.props.onClick(index) }}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="border-row">
                    {this.renderSqaure(0)}
                    {this.renderSqaure(1)}
                    {this.renderSqaure(2)}
                </div>
                <div className="border-row">
                    {this.renderSqaure(3)}
                    {this.renderSqaure(4)}
                    {this.renderSqaure(5)}
                </div>
                <div className="border-row">
                    {this.renderSqaure(6)}
                    {this.renderSqaure(7)}
                    {this.renderSqaure(8)}
                </div>
            </div>
        )
    }
}

export default Board;