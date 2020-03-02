import React, { Component } from 'react';
import SampleShell from '../shell/shell';
import { Container } from 'reactstrap';
import './board.css';

class BoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shellsData: [],
            numberOfShells: 4,
            intervalId: 0,
            gameStarted: false,
            stepsToFinish: 0,
            transitionSpeed: 0,
            boardHeight: 380,
            shellSize: 150,
            ballUnderIndex: -1,
            lastShellProps: null
        };
    }

    componentDidMount() {
        let intervalId = setInterval(() => {
            let { numberOfShells, gameStarted, stepsToFinish } = this.state;
            if (!gameStarted || stepsToFinish === 0) {
                this.setState({
                    gameStarted: false
                });
                return;
            }
            let newShellPositions = [];
            for (var i = 0; i < numberOfShells; i++) {
                newShellPositions.push({
                    ...this.generatePosition(),
                    borderColor: '1px dimrey solid',
                    index: i
                });
            }

            this.setState({
                shellsData: newShellPositions,
                stepsToFinish: stepsToFinish - 1
            });
        }, 1000);

        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    gameStart = shellsProps => {
        setTimeout(() => {
            let newShellPositions = [];
            let winningIndex = Math.floor(Math.random() * shellsProps.shells);
            for (var i = 0; i < shellsProps.shells; i++) {
                let hasBall = i === winningIndex;
                newShellPositions.push({
                    ...this.generatePosition(),
                    hasBall: hasBall,
                    borderColor: '1px dimgrey solid',
                    index: i
                });
            }

            this.setState({
                shellsData: newShellPositions,
                gameStarted: true,
                numberOfShells: shellsProps.shells,
                transitionSpeed: shellsProps.speed,
                stepsToFinish: shellsProps.step,
                ballUnderIndex: winningIndex,
                lastShellProps: shellsProps
            });
        }, shellsProps.step);
    };

    generatePosition = () => {
        const { boardHeight, shellSize } = this.state;
        let boardWidth = window.innerWidth - 30;
        return {
            x: Math.floor(Math.random() * (boardWidth - shellSize)),
            y: Math.floor(Math.random() * (boardHeight - shellSize))
        };
    };

    checkWinningIndex = clickedIndex => {
        let { shellsData, ballUnderIndex } = this.state;
        let cloneShellData = [...shellsData];

        cloneShellData = cloneShellData.map(sh => {
            sh.borderColor = '1px dimgrey solid';
            return sh;
        });
        let winnerShell = cloneShellData.find(
            sh => sh.index === ballUnderIndex
        );
        if (ballUnderIndex === clickedIndex) {
            winnerShell.borderColor = '10px yellowgreen solid';
            this.props.messageHandle('You won, you found the ball!');
        } else {
            winnerShell.borderColor = '1px dimgrey solid';
            this.props.messageHandle('Wrong guess!');
            cloneShellData[ballUnderIndex].borderColor =
                '10px yellowgreen solid';
            cloneShellData[ballUnderIndex].hasBall = true;
            setTimeout(() => {
                this.gameStart(this.state.lastShellProps);
            }, 1500);
        }
        this.setState({
            shellsData: cloneShellData
        });
    };

    render() {
        let {
            shellsData,
            stepsToFinish,
            transitionSpeed,
            ballUnderIndex,
            gameStarted
        } = this.state;

        return (
            <Container fluid>
                <div
                    className='board'
                    style={{
                        height: this.state.boardHeight,
                        width: this.state.boardWidth
                    }}
                >
                    {shellsData.map((sh, index) => (
                        <SampleShell
                            key={index}
                            x={sh.x}
                            y={sh.y}
                            hasBall={sh.hasBall}
                            myIndex={index}
                            speed={transitionSpeed}
                            winningIndex={ballUnderIndex}
                            canGuess={!gameStarted && stepsToFinish === 0}
                            checkWinningIndex={this.checkWinningIndex}
                            borderColor={sh.borderColor}
                        />
                    ))}
                </div>
            </Container>
        );
    }
}
export default BoardComponent;
