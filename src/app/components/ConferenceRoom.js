import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../styles/css/index.css";
import ReactDOM from "react-dom";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import Tile from "./Tile";
import ScreenShareMode from "./ScreenShareMode";
import { Actions as ConferenceActions } from "../actions/ConferenceActions";
import { Actions as ParticipantActions } from "../actions/ParticipantActions";
import TilePiP from "./TilePiP";
import hangUp from "../../static/images/hang-up.svg";

@connect((state) => {
  return {
    conferenceStore: state.voxeet.conference,
    participantsStore: state.voxeet.participants,
  };
})
class ConferenceRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLaunch: false,
      layoutType: "record",
    };
  }

  launchConferenceTestCat() {
    const layoutType = document.getElementById("select-layout-test").value;
    const conferenceAccessTokenTest = document.getElementById("conferenceAccessTokenTest").value;
    const conferenceNameCatTest = document.getElementById("conferenceNameCatTest")
      .value;
    const userInfo = { user: {} };
    const constraints = {
      video: false,
      audio: false,
    };
    const initialized = this.props.dispatch(
      ConferenceActions.initialize(
        this.props.consumerKey,
        this.props.consumerSecret
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.join(conferenceNameCatTest, constraints, conferenceAccessTokenTest, {
            name: "Mixer",
            externalId: "Mixer_record",
          })
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  launchConferenceTest() {
    const layoutType = document.getElementById("select-layout-test").value;
    const conferenceNameTest = document.getElementById("conferenceNameTest")
      .value;
    const userInfo = { user: {} };
    const constraints = {
      video: false,
      audio: false,
    };
    const initialized = this.props.dispatch(
      ConferenceActions.initialize(
        this.props.consumerKey,
        this.props.consumerSecret
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.join(conferenceNameTest, constraints, {
            name: "Mixer",
            externalId: "Mixer_record",
          })
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  launchReplayConferenceTestCat() {
    const layoutType = document.getElementById("select-layout-test").value;
    const conferenceIdReplayTestCat = document.getElementById("conferenceIdReplayTestCat").value;
    const conferenceAccessTokenReplayTest = document.getElementById("conferenceAccessTokenReplayTest").value;
    const initialized = this.props.dispatch(
      ConferenceActions.initialize(
        this.props.consumerKey,
        this.props.consumerSecret,
        { name: "Mixer", externalId: "Mixer_" }
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.replay(conferenceIdReplayTestCat, 0, conferenceAccessTokenReplayTest, {
            name: "Mixer",
            externalId: "Mixer_record",
          })
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  launchReplayConferenceTest() {
    const layoutType = document.getElementById("select-layout-test").value;
    const conferenceIdTest = document.getElementById("conferenceIdTest").value;
    const userInfo = { user: { type: "user" } };
    const initialized = this.props.dispatch(
      ConferenceActions.initialize(
        this.props.consumerKey,
        this.props.consumerSecret,
        { name: "Mixer", externalId: "Mixer_" }
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.replay(conferenceIdTest, 0, {
            name: "Mixer",
            externalId: "Mixer_record",
          })
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  launchConference() {
    const accessToken = document.getElementById("accessToken").value;
    const refreshToken = document.getElementById("refreshToken").value;
    const userData = document.getElementById("userData").value;
    const mediaRecorderUrl = document.getElementById("mediaRecorderUrl").value;
    const refreshUrl = document.getElementById("refreshUrl").value;
    const conferenceId = document.getElementById("conferenceId").value;
    const thirdPartyId = document.getElementById("thirdPartyId").value;
    const layoutType = document.getElementById("layoutType").value;
    const catToken = document.getElementById("catToken").value;
    const language = document.getElementById("language").value;
    let userParams = null;
    let externalId = "Mixer_" + layoutType;
    if (language.length > 0) {
      userParams = {
        user: { params: { listenerLanguage: language } },
      };
      externalId = "Mixer_" + layoutType + "_" + language;
    } else {
      userParams = {};
    }
    const constraints = {
      video: false,
      audio: false,
    };
    const initialized = this.props.dispatch(
      ConferenceActions.initializeWithToken(
        accessToken,
        refreshToken,
        refreshUrl
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.join(
            conferenceId,
            constraints,
            catToken,
            {
              name: "Mixer",
              externalId: externalId,
              thirdPartyId: thirdPartyId,
            },
            userData,
            userParams,
            mediaRecorderUrl,
            thirdPartyId,
            language
          )
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  launchReplayConference() {
    const accessToken = document.getElementById("accessToken").value;
    const refreshToken = document.getElementById("refreshToken").value;
    const userData = document.getElementById("userData").value;
    const catToken = document.getElementById("catToken").value;
    const language = document.getElementById("language").value;
    const mediaRecorderUrl = document.getElementById("mediaRecorderUrl").value;
    const refreshUrl = document.getElementById("refreshUrl").value;
    const conferenceId = document.getElementById("conferenceId").value;
    const thirdPartyId = document.getElementById("thirdPartyId").value;
    const layoutType = document.getElementById("layoutType").value;
    let userParams = null;
    let externalId = "Mixer_" + layoutType;
    if (language.length > 0) {
      userParams = {
        user: { params: { listenerLanguage: language } },
      };
      externalId = "Mixer_" + layoutType + "_" + language;
    } else {
      userParams = {};
    }
    const initialized = this.props.dispatch(
      ConferenceActions.initializeWithToken(
        accessToken,
        refreshToken,
        refreshUrl
      )
    );
    initialized.then(() =>
      this.props
        .dispatch(
          ConferenceActions.replay(
            conferenceId,
            0,
            catToken,
            {
              name: "Mixer",
              externalId: externalId,
              thirdPartyId: thirdPartyId,
            },
            userData,
            userParams,
            mediaRecorderUrl,
            thirdPartyId,
            language
          )
        )
        .then(() => this.setState({ isLaunch: true, layoutType: layoutType }))
    );
  }

  hangup() {
    this.props.dispatch(ConferenceActions.leave()).then(() => {
      this.props.dispatch(ParticipantActions.clearParticipants());
    });
    this.setState({ isLaunch: false });
  }

  render() {
    const { participants } = this.props.participantsStore;
    const { isDemo, consumerKey, consumerSecret } = this.props;
    const {
      screenShareMode,
      conferenceEnded,
      filePresentationMode,
      videoPresentationMode,
    } = this.props.conferenceStore;
    const { isLaunch } = this.state;
    let count = -1;
    let participantConnected = participants.filter((p) => p.isConnected);
    return (
      <div>
        <audio id="recordedAudio"></audio>
        {isDemo && !isLaunch && (
          <div>
            <div className="container-test">
              <h1>Dolby Mixer Layout Testing</h1>
              {(consumerKey == null || consumerSecret == null) && (
                <div className="keys-missing-test">
                  Missing consumerKey / consumerSecret inside index.js
                </div>
              )}
              <div>
                <h3>Layout type</h3>
                <select id="select-layout-test" className="select-layout-test">
                  <option value="record">Recording layout</option>
                  <option value="replay">Replay layout</option>
                  <option value="stream">Stream layout</option>
                  <option value="hls">HLS layout</option>
                </select>
              </div>
              <div>
                <h3>Live conference</h3>
                <input
                  placeholder="Conference alias"
                  id="conferenceNameTest"
                  name="conferenceNameTest"
                />
                <button
                  id="joinConferenceTest"
                  onClick={this.launchConferenceTest.bind(this)}
                >
                  Join conference
                </button>
              </div>
              <div>
                <h3>Replay conference</h3>
                <input
                  placeholder="Conference Id Replay"
                  id="conferenceIdTest"
                  name="conferenceIdTest"
                />
                <button
                  id="replayConferenceTest"
                  onClick={this.launchReplayConferenceTest.bind(this)}
                >
                  Replay conference
                </button>
              </div>
              <div>
                <h3>Live protected conference</h3>
                <input
                  placeholder="Conference alias"
                  id="conferenceNameCatTest"
                  name="conferenceNameCatTest"
                />
                <input
                  placeholder="Conference Access Token"
                  id="conferenceAccessTokenTest"
                  name="conferenceAccessTokenTest"
                />
                <button
                  id="joinConferenceCatTest"
                  onClick={this.launchConferenceTestCat.bind(this)}
                >
                  Join Protected conference
                </button>
              </div>
              <div>
                <h3>Replay Protected conference</h3>
                <input
                  placeholder="Conference Id Replay"
                  id="conferenceIdReplayTestCat"
                  name="conferenceIdReplayTestCat"
                />
                <input
                  placeholder="Conference Access Token"
                  id="conferenceAccessTokenReplayTest"
                  name="conferenceAccessTokenReplayTest"
                />
                <button
                  id="replayConferenceTest"
                  onClick={this.launchReplayConferenceTestCat.bind(this)}
                >
                  Replay protected conference
                </button>
              </div>
            </div>
          </div>
        )}
        {!isLaunch && conferenceEnded && (
          <div className="conference-ended-picto">
            <div id="conferenceEndedVoxeet"></div>
          </div>
        )}
        {isLaunch ? (
          conferenceEnded ? (
            <div className="conference-ended-picto">
              <div id="conferenceEndedVoxeet"></div>
            </div>
          ) : screenShareMode ||
            filePresentationMode ||
            videoPresentationMode ? (
            <div
              className="tiles-container"
              data-number-user={participantConnected.length}
            >
              <div id="conferenceStartedVoxeet"></div>
              <div>
                {(screenShareMode || filePresentationMode) &&
                  !videoPresentationMode &&
                    <TilePiP />
                }
                {participantConnected.length > 0 ? (
                  <ScreenShareMode
                    screenShareMode={screenShareMode}
                    filePresentationMode={filePresentationMode}
                    videoPresentationMode={videoPresentationMode}
                    participants={participants}
                  />
                ) : (
                  <div className="conference-empty">
                    <div className="wave -one"></div>
                    <div className="wave -two"></div>
                    <div className="wave -three"></div>
                    <div className="title">
                      Waiting for other participants...
                    </div>
                  </div>
                )}
              </div>
              <div className="hangup-button">
                <button onClick={this.hangup.bind(this)}>
                  <img src={hangUp} />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="tiles-container"
              data-number-user={participantConnected.length}
            >
              <div id="conferenceStartedVoxeet"></div>
              <div id="tile-list" className="tiles-list-generic">
                {participantConnected.length > 0 ? (
                  participantConnected.map((participant, i) => {
                    count = count + 1;
                    return (
                      <Tile
                        key={i}
                        participantConnected={participantConnected.length}
                        nbParticipant={count}
                        participant={participant}
                      />
                    );
                  })
                ) : (
                  <div className="conference-empty">
                    <div className="wave -one"></div>
                    <div className="wave -two"></div>
                    <div className="wave -three"></div>
                    <div className="title">
                      Waiting for other participants...
                    </div>
                  </div>
                )}
              </div>
              {isDemo && (
                <div className="hangup-button">
                  <button onClick={this.hangup.bind(this)}>
                    <img src={hangUp} />
                  </button>
                </div>
              )}
            </div>
          )
        ) : (
          <div>
            <input
              type="hidden"
              value="accessToken"
              id="accessToken"
              name="accessToken"
            />
            <input
              type="hidden"
              value="refreshToken"
              id="refreshToken"
              name="refreshToken"
            />
            <input
              type="hidden"
              value="catToken"
              id="catToken"
              name="catToken"
            />
            <input
              type="hidden"
              value="voxeet"
              id="conferenceId"
              name="conferenceId"
            />
            <input type="hidden" value="voxeet" id="userData" name="userData" />
            <input type="hidden" value="en" id="language" name="language" />
            <input
              type="hidden"
              value="voxeet"
              id="mediaRecorderUrl"
              name="mediaRecorderUrl"
            />
            <input
              type="hidden"
              value="refreshUrl"
              id="refreshUrl"
              name="refreshUrl"
            />
            <input
              type="hidden"
              value="1234"
              id="thirdPartyId"
              name="thirdPartyId"
            />
            <input
              type="hidden"
              value="stream"
              id="layoutType"
              name="layoutType"
            />
            <button
              id="joinConference"
              onClick={this.launchConference.bind(this)}
            >
              Join conference
            </button>
            <button
              id="replayConference"
              onClick={this.launchReplayConference.bind(this)}
            >
              Replay conference
            </button>
          </div>
        )}
      </div>
    );
  }
}

ConferenceRoom.propTypes = {
  isDemo: PropTypes.bool,
  consumerKey: PropTypes.string,
  consumerSecret: PropTypes.string,
};

ConferenceRoom.defaultProps = {
  isDemo: false,
};

export default ConferenceRoom;
