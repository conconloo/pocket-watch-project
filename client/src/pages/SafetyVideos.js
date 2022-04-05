import React from "react";
import { Component } from "react";

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
                        <a className="video-info" href={video.url}>
                            <img src = {video.thumbnail.url} />
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