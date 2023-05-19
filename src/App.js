import React, { useState } from 'react';
import './App.scss';
import DisplayText from './components/DisplayText';
import DisplayMeter from './components/DisplayMeter';

const App = (context) => {
	const [state, setState] = useState({
		localMouse: { x: 100, y: 160 },
		inputText: 0,
		containerProps:
		{ width: 300, height: 300, offsetLeft: 0, offsetTop: 0 },
	});

	const extendedContext = { ...context, state, setState };

	return (
		<div className="App container">
			<DisplayText { ...extendedContext }/>
			<DisplayMeter { ...extendedContext }/>
		</div>);
};

export default App;
