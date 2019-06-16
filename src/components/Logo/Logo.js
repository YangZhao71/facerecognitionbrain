import React from 'react';
import Tilt from 'react-tilt';
import brain from './Logo.png';
import './Logo.css';

function Logo() {
	return(
		<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
 <div className="Tilt-inner pa3"> <img style={{ height:70, width:70}}src={brain} alt='logo' /> </div>
</Tilt>
	);
}
export default Logo;