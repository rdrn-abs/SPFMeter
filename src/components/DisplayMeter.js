import { React, useEffect, useRef } from 'react';
import SPFDial from './SPFDial';
import SPFManager from '../services/SPFManager';
import { peek } from '@laufire/utils/debug';

const handleResize = (context) => {
	const { setState, data: container } = context;

	setState((prevState) => ({
		...prevState,
		containerProps: {
			width: peek(container.current.clientWidth),
			height: container.current.clientWidth,
		},
	}));
};

// eslint-disable-next-line max-lines-per-function
const DisplayMeter = (context) => {
	const container = useRef();

	// eslint-disable-next-line react/destructuring-assignment

	useEffect(() => {
		window.addEventListener('resize',
			() => handleResize({ ...context, data: container }));
		handleResize({ ...context, data: container });
	}, []);

	return (
		<div>
			<div 	ref={ container } className="dial-container">
				<SPFDial { ...context }/>
			</div>
			<div
				className="dial-container"
				onMouseDown={ (event) => SPFManager.updateLocalMousePos({
					...context, dataLocal: event,
				}) }
			/>
		</div>
	);
};

export default DisplayMeter;
