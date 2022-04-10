import React from "react";
import { Component } from "react";

const keywords = require('../json/VideoSearchList.json');

let WatchVideo = 'https://www.youtube.com/watch?v=';

class SafetyVideos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: keywords,
            videos: []
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter = (searchQuery) => {
        console.log(searchQuery);
        for (var i = 0; i < searchQuery.length; i++) {
            this.renderVideos(searchQuery[i].replace(" ", "+"));
        }
    }

    componentDidMount() {
       fetch('api/videos')
            .then(res => console.log(res));   
    }

    renderVideos(keyword) {
        fetch('api/videos?keyword='+keyword)
            .then(res => res.json())
            .then(videos => {
                this.setState({videos: videos})
            });
    }

    render(){
        return (
            <>
            <div className = "filters">
                {
                    Object.keys(this.state.keywords).map(key => (
                        <button onClick={() => this.handleFilter(this.state.keywords[key])}>{key}</button>
                    ))
                }
            </div>
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
            </>
        )
    }
}

export default SafetyVideos;