import { React, useState, useEffect } from 'react';
import './App.scss';
import SPFManager from './services/SPFManager';
import SPFLabels from './components/SPFLabels.js';

// eslint-disable-next-line max-lines-per-function
const App = (context) => {
	const [state, setState] = useState({
		globalMouse: { x: 0, y: 0 },
		localMouse: { x: 0, y: 0 },
		spf: 2,

	});

	const extendedContext = { ...context, state, setState };

	useEffect(() => {
		window.addEventListener('mousemove',
			(event) =>
				SPFManager.updateGlobalMousePos({
					...extendedContext,
					data: event,
				}));

		return () => {
			window.removeEventListener('mousemove',
				(event) =>
					SPFManager.updateGlobalMousePos({
						...context,
						data: event,
					}));
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div className="App">
		Ready to start.

		<SPFLabels { ...extendedContext }/>
	</div>;
};

export default App;
