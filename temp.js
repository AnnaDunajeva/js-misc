import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

class HelloUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Jon Doe",
      friends: ["Jake Lingwall", "Sarah Drasner", "Merrick Christensen"]
    }
    this.handleChange = this.handleChange.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.changeName = this.changeName.bind(this)
  }
  changeName(newName) {
    this.setState({
      name: newName
    })
  }
  addFriend(friend) {
    this.setState(function(state) {
      return {
        friends: state.friends.concat([friend])
      };
    })
  }
  render() {
    return (
      <div>
        <h3>Name: {this.state.name}</h3>
        <ChangeName changeOldName={this.changeName} />
        <AddFriend addNewFriend={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
}

class ChangeName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: ""
    }
    this.handleNewName = this.handleNewName.bind(this);
    this.updateName = this.updateName.bind(this);
  }
  handleNewName(event) {
    this.setState({
      newName: event.target.value
    })
  }
  updateName() {
    this.props.changeOldName(this.state.newName);
    this.setState({
      newName: ""
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newName}
          onChange={this.handleNewName}
        />
        <button onClick={this.updateName}>Change Name</button>
      </div>
    )
  }
}

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriend: ""
    };
    this.handleNewFriend = this.handleNewFriend.bind(this);
    this.updateFriendList = this.updateFriendList.bind(this);
  }
  handleNewFriend(event) {
    this.setState({
      newFriend: event.target.value
    })
  }
  updateFriendList() {
    this.props.addNewFriend(this.state.newFriend);
    this.setState({
      newFriend: ""
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.friend}
          onChange={this.handleNewFriend}
        />
        <button onClick={this.updateFriendList}>Add Friend</button>
      </div>
    )
  }
}

class ShowList extends React.Component {
  render() {
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {this.props.names.map(friend => (
            <li>{friend}</li>
          ))}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<HelloUser />, document.getElementById("app"));
