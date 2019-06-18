import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
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
			density: {enable: true, value_area: 500}
		}
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: { enable: true, mode: 'repulse'},
			onclick: { enable: true, mode: 'push'}
		},
		modes: {
			repulse: {distance: 180},
			push: {particles_nb: 10}
		}
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin'
		}
	}

	onRouteChange = (route) => {
		this.setState({route: route});
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
		).then(response => this.displayFaceBox(this.calculateFaceLocation(response))
	  ).catch(err => console.log(err));
	}

	calculateFaceLocation = (data) => {
			const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
			const image = document.getElementById('inputImage');
			const width = Number(image.width);
			const height = Number(image.height);
			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: (1 - clarifaiFace.right_col) * width,
				bottomRow: (1 - clarifaiFace.bottom_row) * height
			}
		}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box});
	}

	render() {
		return (
	    <div className="App">
	    	<Particles className='particles'
	    		params={particlesOptions} 
	    	/>
	    	{this.state.route === 'signin' 
		    	? <div>
		    			<Logo />
		    			<Signin onRouteChange={this.onRouteChange}/>
		    		</div>
	      	: <div>
	      			<div className='flex justify-between'>
			    			<Logo />
				      	<Navigation onRouteChange={this.onRouteChange}/>
			      	</div>
				      <Rank /> 
				      <ImageLinkForm 
				      	onInputChange={this.onInputChange} 
				      	onButtonSubmit={this.onButtonSubmit}
				      />
				      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
				    </div>
				}
	    </div>
	  );
	}
}

export default App;
