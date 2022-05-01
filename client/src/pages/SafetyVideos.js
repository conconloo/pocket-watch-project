import React from "react";
import { Component } from "react";
import ShowVideo from "../components/ShowVideo";
import FilterButtons from "../components/FilterButtons";
import LoadingSpinner from "../components/LoadingSpinner";

const keywords = require('../json/VideoSearchList.json');
let WatchVideo = 'https://www.youtube.com/watch?v=';

class SafetyVideos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: keywords,
            videos: [],
            showFilters: false,
            showVideos: false,
            loading: false,
            myclass: 'filtersbtn',
            currKey: ''
        }
        this.handleFilter = this.handleFilter.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.toggleVideos = this.toggleVideos.bind(this);
    }

    handleFilter = (searchQuery, key) => {
        console.log(searchQuery);
        this.setState({videos : [], currKey : key, loading: true});
        this.toggleFilters();
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
                let myvideos = this.state.videos;
                this.setState({
                    videos: myvideos.concat(videos),
                    showVideos: true,
                    loading: false
                })
            });
    }

    toggleFilters(){
        this.setState({
            showFilters: !this.state.showFilters
        })
    }

    toggleVideos() {
        this.setState({
            showVideos: !this.state.showVideos
        })
    }

    render(){
        return (
            <div className="videopage">
                <div className="header">
                    <h1>Safety Videos</h1>
                    <FilterButtons toggleFilters={this.toggleFilters}/>
                    <div className='filters'>
                        {this.state.showFilters ?
                            Object.keys(this.state.keywords).map(key => (
                                <>
                                <button onClick={() => this.handleFilter(this.state.keywords[key], key)}>{key}</button>
                                </>
                            ))
                            : ''
                        }
                    </div>
                </div>
                <div className="selectfilterby">
                    <h1>{this.state.currKey ? this.state.currKey : "" }</h1>
                </div>
                <div className="videos">
                    {this.state.loading ?
                        <LoadingSpinner/>
                        :
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
            </div>
        )
    }
}

export default SafetyVideos;