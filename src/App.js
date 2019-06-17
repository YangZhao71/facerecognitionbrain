import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '42a446a35f514789b5aa43660ae165ae'
});

const particlesOptions = {
  particles: {
		number: {
			value: 90,
			density: {
				enable: true,
				value_area: 500
			}
		}
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: {
				enable: true,
				mode: 'repulse'	
			},
			onclick: {
				enable: true,
				mode: 'push'
			}
		},
		modes: {
			repulse: {
				distance: 180
			},
			push: {
				particles_nb: 10
			}
		}
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models
		.predict(
			Clarifai.FACE_DETECT_MODEL, 
			this.state.input
		).then(
	    function(response) {
	      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
	    },
	    function(err) {
	      console.log(err);
	    }
	  );
	}

	render() {
		return (
	    <div className="App">
	    	<Particles className='particles'
	    		params={particlesOptions} 
	    	/>
	      <Navigation />
	      <Logo />
	      <Rank /> 
	      <ImageLinkForm 
	      	onInputChange={this.onInputChange} 
	      	onButtonSubmit={this.onButtonSubmit}
	      />
	      <FaceRecognition imageUrl={this.state.imageUrl}/>
	    </div>
	  );
	}
}

export default App;
