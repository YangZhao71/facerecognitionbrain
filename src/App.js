import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import 'tachyons';

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
		}
	}

	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onButtonSubmit = () => {
		console.log('click');
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
	      {/*<FaceRecognition />*/}
	    </div>
	  );
	}
}

export default App;
