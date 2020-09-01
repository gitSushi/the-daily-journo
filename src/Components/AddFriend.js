//@ts-nocheck
import React from "react";
import { connect } from "react-redux";

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleIconInput = this.toggleIconInput.bind(this);
  }

  componentDidMount() {}

  toggleIconInput() {
    document.getElementsByClassName("share")[1].classList.add("rotate-to-hide");
    document.getElementsByClassName("the-form")[1].classList.add("slide-down");
  }

  render() {
    return (
      <div className="form-container">
        <div className="share" onClick={this.toggleIconInput}>
          <span>
            <i className="fas fa-user-friends fa-2x"></i>
          </span>
        </div>
        <div className="the-form">
          <form onSubmit={this.props.addFriend}>
            <label htmlFor="friend-choice">Add a friend : </label>
            <input
              list="friend-data-list"
              name="friendChoice"
              id="friend-choice"
            />
            <datalist id="friend-data-list">
              {this.props.collections.map((e, i) => (
                <option key={i} value={e.user} />
              ))}
            </datalist>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddFriend);