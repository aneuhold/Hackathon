import React from 'react';
import './components.css';

class ImageUpload extends React.Component {
    state = {
        tags: [],
        urlInput: "",
        url: ""
    }

    callAPIHandler = (url) => {
        const Clarifai = require('clarifai');
        
        const app = new Clarifai.App({
            apiKey: '7a58f90bee4743879b6108d0272685bd'
        });

        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
            return generalModel.predict({url});
        })
        .then(response => {
            var concepts = response['outputs'][0]['data']['concepts']
            console.log(concepts);
            const imageTags = concepts.map((tag)=>tag.name);
            // console.log("tags",tags);
            this.setState({tags: imageTags});
        })
    }
    
    bindInput = (input) => {
        this.setState({urlInput: input})
    }
    selectURL = () => {
        let imageURL = this.state.urlInput.toString();
        
        this.setState({url: imageURL})
        this.callAPIHandler(imageURL);
    }

    render() {
        return(
            <div>
                <h2>Image Upload</h2>
                <div className="upload__options">
                    <div className="upload__url">
                        <div>Enter Image URL</div>
                        <input type="text" onChange={(e)=>this.bindInput(e.target.value)}/>
                        <button onClick={()=>this.selectURL()}>Select URL</button>
                    </div>
                    <div className="upload__link">
                        <div>Current image selected: </div>
                        <button>browse</button>
                    </div>
                </div>
                <div className="image__display">
                    <img src={this.state.url}></img>
                    
                    <h2>tags</h2>
                    <ul>
                    {this.state.tags.map((tag)=><li>{tag}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ImageUpload;