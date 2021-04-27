import React, { Component } from 'react'
import PropTypes from 'prop-types'

import userPlaceholder from '../../static/images/user-placeholder.png'

import AttendeesParticipantVideo from './AttendeesParticipantVideo'
import AttendeesParticipantVuMeter from './AttendeesParticipantVuMeter'

class TileVideo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant, stream, width } = this.props
        const photoUrl = participant.avatarUrl || userPlaceholder
        return (
            <span className="tile-video video-frame">
                { stream ?
                    <div className="stream-media">
                        <AttendeesParticipantVideo width={width} stream={stream} />
                    </div>
                    :
                    <AttendeesParticipantVuMeter participant={participant} width={80} height={80} customClass={"preview-avatar"} />
                }
            </span>
        )
    }
}

TileVideo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    participant: PropTypes.object.isRequired,
    stream: PropTypes.object
}

export default TileVideo
