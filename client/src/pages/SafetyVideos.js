import React from "react";
import { Component } from "react";

let WatchVideo = 'https://www.youtube.com/watch?v=';

class SafetyVideos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        fetch('api/videos')
            .then(res => res.json())
            .then(videos => {
                this.setState({videos : videos});
            });
    }

    render(){
        return (
            <div className="videos">
                {
                    this.state.videos.map(video =>(
                        <a className="video-info" href={WatchVideo + video.videoID} target='_blank' rel="noreferrer">
                            <img src = {video.thumbnail.url} alt ="Video"/>
                            <h1>{video.title}</h1>
                            <h2>{video.channelTitle}</h2>
                            <p>{video.description}</p>                      
                        </a>
                    ))
                }
            </div>
        )
    }
}

export default SafetyVideos;