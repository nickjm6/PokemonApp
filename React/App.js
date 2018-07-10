import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Alert, Jumbotron} from 'react-bootstrap';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = { message: "Welcome"}
    }

    render() {
        return (
        <div className="container">
          <Jumbotron style={{textAlign: "center", marginTop: 50 + "px"}}>
            <Alert bsStyle="success">Hello</Alert>
            <h1>{this.state.message}</h1>
            <Button bsStyle="info">Nothing Happens!</Button>
          </Jumbotron>
        </div>
        )
    }
};

ReactDOM.render(<Header />, document.getElementById("root"))
