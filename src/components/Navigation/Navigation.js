import React from 'react';
function Navigation({onRouteChange}) {
	return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p className='f3 dim black pa3 pointer link' onClick={() => onRouteChange('signin')}>Sign Out</p>
		</nav>
	);
}
export default Navigation;