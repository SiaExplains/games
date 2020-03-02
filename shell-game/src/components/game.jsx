import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Container,
  Col,
  Row,
  Badge,
  InputGroup,
  Label
} from "reactstrap";
import SampleBoard from "./board/board";

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      levels: [
        { key: 0, title: "Easy", speed: 400, shells: 3, step: 3 },
        { key: 1, title: "Normal", speed: 300, shells: 4, step: 5 },
        { key: 2, title: "Hard", speed: 200, shells: 5, step: 6 }
      ],
      currentLevel: {
        key: 0,
        title: "Easy",
        speed: 400,
        shells: 3,
        step: 3
      },
      gameMessage: ""
    };
  }

  changeValue = e => {
    let lev = this.state.levels.find(
      l => l.title === e.currentTarget.textContent
    );
    this.setState({ currentLevel: lev });
  };

  toggleLevel = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  startTheGame = () => {
    const { currentLevel } = this.state;
    this.refs.child.gameStart(currentLevel);
  };

  setMessageCallback = msg => {
    this.setState({
      gameMessage: msg
    });
  };

  render() {
    const { currentLevel } = this.state;

    return (
      <Container fluid className="App">
        <Row>
          <Col>
            <h1>Shell Game</h1>
            <h6>
              <Badge color="success" className="text-wrap text-left p-2">
                Based on wikipedia: <br />
                The shell game is portrayed as a gambling game, but in reality,
                when a wager for money is made, it is almost always a confidence
                trick used to perpetrate fraud. In confidence trick slang, this
                swindle is referred to as a short-con because it is quick and
                easy to pull off.
              </Badge>
            </h6>

            <a href="https://en.wikipedia.org/wiki/Shell_game">
              <h6> For more information</h6>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.startTheGame} color="info">
              Shuffling
            </Button>
          </Col>
          <Col>
            <Label color="danger">{this.state.gameMessage}</Label>
          </Col>
          <Col>
            <InputGroup>
              <Label>Level: </Label>
              &nbsp;
              <Dropdown
                size="sm"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleLevel}
              >
                <DropdownToggle caret>
                  {!currentLevel ? "Choose Level" : currentLevel.title}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.levels.map(lev => (
                    <DropdownItem key={lev.key} onClick={this.changeValue}>
                      {lev.title}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <SampleBoard ref="child" messageHandle={this.setMessageCallback} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameComponent;
