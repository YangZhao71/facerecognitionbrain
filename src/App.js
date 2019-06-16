import React from 'react';
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
function App() {
  return (
    <div className="App">
    	<Particles className='particles'
    		params={particlesOptions} 
    	/>
      <Navigation />
      <Logo />
      <Rank /> 
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
