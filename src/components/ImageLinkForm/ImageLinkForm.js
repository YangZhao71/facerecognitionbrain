import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange, onButtonSubmit}) {
	return(
		<div>
			<p className='f3'>
				{'This magic brain will detect faces in your picture. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input 
						type='text' 
						className='f4 pa2 w-70 center shadow-5' 
						onChange={onInputChange}
					/>
					<button 
						className='f4 grow link w-30 ph3 pv2 dib white shadow-5' 
						onClick={onButtonSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}
export default ImageLinkForm;