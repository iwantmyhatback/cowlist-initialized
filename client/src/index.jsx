import React from "react";
import ReactDOM from "react-dom";
var Promise = require("bluebird");
// import getCows from "./query";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      currentCow: { cowName: null }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.fetcher();
  }

  fetcher() {
    fetch("http://localhost:3000/api/cows")
      .then(res => res.json())
      .then(result => {
        this.setState({ cows: result });
      })
      .then(() => {
        console.log(this.state.currentCow);
      });
  }

  poster(data) {
    fetch("http://localhost:3000/api/cows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      this.fetcher();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var newCow = { cowName: event.target.name.value, cowDescription: event.target.description.value };
    this.poster(newCow);
  }

  handleClick(event) {
    console.log(event.target.key);
    this.setState({ currentCow: this.state.cows[event.target.id] });
  }

  render() {
    return (
      <div>
        <CurrentCow name={this.state.currentCow.cowName} desc={this.state.currentCow.cowDescription} />
        <form onSubmit={this.handleSubmit}>
          <label>
            New Cow:
            <input type="text" name="name" />
            <input type="text" name="description" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <CowList list={this.state.cows} clicker={this.handleClick} />
      </div>
    );
  }
}

var CurrentCow = props => (
  <div>
    <div>
      {props.name} &nbsp;&nbsp;
      {props.desc}
    </div>
  </div>
);

var CowList = props => {
  // console.log(props.clicker);
  let mapped = props.list.map((cow, i) => (
    <div key={i}>
      <Cow name={cow.cowName} desc={cow.cowDescription} loc={i} clicker={props.clicker} />
    </div>
  ));

  return mapped;
};

var Cow = function(props) {
  // console.log(props.name);
  return (
    <div onClick={props.clicker}>
      <div id={props.loc}>{props.name}</div>
    </div>
  );
};

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

//
