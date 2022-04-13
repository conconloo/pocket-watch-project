import React, { Component } from 'react'

let WatchVideo = 'https://www.youtube.com/watch?v=';

class ShowVideo extends Component {
    render() {
        return (
            <div>
                {this.props.showVideo &&
                    <section id="videos">
                        <div className='videos'>
                        {
                            this.props.videos.map(video =>(
                                <a className="video-info" href={WatchVideo + video.videoID} target='_blank' rel="noreferrer">
                                    <img src = {video.thumbnail.url} alt ="Video"/>
                                    <h1>{video.title}</h1>
                                    <h2>{video.channelTitle}</h2>
                                    <p>{video.description}</p>
                                </a>
                            ))
                        }
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default ShowVideo;