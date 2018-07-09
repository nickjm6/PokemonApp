import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = { message: "Welcome"}
    }

    render() {
        return (
        <div class="container">
          <div class="jumbotron" style={{textAlign: "center"}}>
            <h1>{this.state.message}</h1>
          </div>
        </div>
        )
    }
};

ReactDOM.render(<Header />, document.getElementById("root"))
