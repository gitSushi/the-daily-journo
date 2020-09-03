import React from "react";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleIconInput = this.toggleIconInput.bind(this);
  }

  toggleIconInput() {
    document.getElementsByClassName("share")[0].classList.add("rotate-to-hide");
    document.getElementsByClassName("the-form")[0].classList.add("slide-down");
  }

  render() {
    return (
      <div className="form-container">
        <div className="share" onClick={this.toggleIconInput}>
          <span>
            <i className="fas fa-pen-nib fa-2x"></i>
          </span>
        </div>
        <div className="the-form">
          <form onSubmit={this.props.submit}>
            <label htmlFor="feel-like-sharing">Feel like sharing :</label>
            <input id="feel-like-sharing" type="text" name="changeInput" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddPost;
