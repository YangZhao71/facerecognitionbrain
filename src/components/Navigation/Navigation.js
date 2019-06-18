import React from 'react';
function Navigation({route, onRouteChange}) {
	return(route === 'home'
		? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 dim black pa3 pointer link' onClick={() => onRouteChange('signin')}>Sign Out</p>
			</nav>
		: (route === 'signin'
			? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p className='f3 dim black pa3 pointer link' onClick={() => onRouteChange('register')}>Register</p>
				</nav>
			: <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p className='f3 dim black pa3 pointer link' onClick={() => onRouteChange('signin')}>Sign In</p>
				</nav>
			)
	);
}
export default Navigation;