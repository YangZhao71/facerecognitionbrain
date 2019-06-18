import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
		this.setState({box});
	}

	render() {
		const {imageUrl, box, route} = this.state;
		const {onRouteChange, onInputChange, onButtonSubmit} = this;
		return (
	    <div className="App">
	    	<Particles className='particles'
	    		params={particlesOptions} 
	    	/>
	    	<div className='flex justify-between'>
    			<Logo />
	      	<Navigation route={route} onRouteChange={onRouteChange}/>
      	</div>
	    	{route === 'home'
	    		?	<div>
				      <Rank /> 
				      <ImageLinkForm 
				      	onInputChange={onInputChange} 
				      	onButtonSubmit={onButtonSubmit}
				      />
				      <FaceRecognition box={box} imageUrl={imageUrl}/>
				    </div>
				  : (route === 'signin' 
				    	? <Signin onRouteChange={onRouteChange}/>
			      	: <Register onRouteChange={onRouteChange}/>
				  	)
				}
	    </div>
	  );
	}
}

export default App;
