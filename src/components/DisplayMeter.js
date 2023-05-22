import React, { useEffect, useRef } from 'react';
import SPFDial from './SPFDial';
import SPFManager from '../services/SPFManager';

const handleResize = (context) => {
	const { setState, data: container } = context;

	setState((prevState) => ({
		...prevState,
		containerProps: {
			width: container.current.clientWidth,
			height: container.current.clientWidth,
			offsetLeft: container.current.offsetLeft,
			offsetTop: container.current.offsetTop,
		},
	}));
};
const updateLocalMousePos = (context) => (event) =>
	SPFManager.updateLocalMousePos({ ...context, data: event });

const DisplayMeter = (context) => {
	const container = useRef();
	const extendedContext = { ...context, data: container };
	const handler = () => handleResize(extendedContext);

	useEffect(() => {
		window.addEventListener('resize',	handler);
		handler();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			{ ...{
				ref: container,
				className: 'dial-container',
				onClick: updateLocalMousePos(context),
			} }
		>
			<SPFDial { ...extendedContext }/>
		</div>
	);
};

export default DisplayMeter;
