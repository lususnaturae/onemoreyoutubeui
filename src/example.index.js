/**
 * Created by marco on 5.6.2016.
 */
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// apikey to youtube
const API_KEY = 'yourownapikey';

// YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
//    console.log(data);
// });

// Create a new component. This component should produce
// some html

    //const and => is ES2016 and
    // html type code is actually JSX
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

    }
    
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });

            //same as this.setState({ videos: videos })
        });
    }

    render() {
        // not more frequently than every 300ms
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'))
