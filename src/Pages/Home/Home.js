import React from "react";
import { connect } from "react-redux";

function Home(props) {
  return (
    <div>
      <h1>Home page</h1>
      <p>Username:{props.username}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)