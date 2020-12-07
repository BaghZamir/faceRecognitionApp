import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
	return(
		<div className='flex-c ma'>
			<div className='absolute mt2 image-container'>
				<img id='inputimage' src={imageUrl} width='500px' height='auto' max-width='100%' />
				<div className='bounding-box' style={{width: box.width, height: box.height, left: box.left, top: box.top}} ></div>
			</div>
		</div>
	);
};

export default FaceRecognition;