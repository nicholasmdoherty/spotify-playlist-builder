import React from "react";
import { HashRouter, Route } from "react-router-dom";
import LoginPage from "./modules/spotify-sign-in/LoginPage";
import SpotifyLogoutButton from "./modules/spotify-sign-in/SpotifyLogoutButton";
import { getCookie } from "./common/constants";
import "./App.css";
import Navbar from "./common/components/Navbar";
import { connect } from "react-redux";
import { setSpotifyApiAction } from "./redux/actions/apiActions";
import Profile from "./modules/profile/Profile";
import { Container, Row } from "react-bootstrap";

function App(props) {
  let loggedIn = false;
  let token = getCookie("spotifyAccessToken");

  if (token !== "") {
    loggedIn = true;
    props.setSpotifyApi(token);
  }

  return (
    <HashRouter>
      <div className="d-flex" id="app-wrapper">
        {loggedIn ? (
          <div id="playlists-view-wrapper">
            <Navbar />
            <Container>
              <Row>
                <Profile />
              </Row>

              <Row>
                <h2> Logged in</h2>
                <SpotifyLogoutButton />
              </Row>
            </Container>
          </div>
        ) : (
          <LoginPage />
        )}
      </div>
    </HashRouter>
  );
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    setSpotifyApi: accessToken => dispatch(setSpotifyApiAction(accessToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
