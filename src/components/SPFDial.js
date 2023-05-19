import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import SPFManager from '../services/SPFManager';

const lowerRingWidth = 70;
const higherRingWidth = 100;
// eslint-disable-next-line max-lines-per-function
const SPFDial = (context) => {
	const { config: { customLabels, paddingForLabel, maxDialValue },
		state: { containerProps }} = context;
	const media = window.matchMedia('(max-width: 550px)');
	const ringWidth = media.matches ? lowerRingWidth : higherRingWidth;
	const two = 2;

	return (
		<ReactSpeedometer
			forceRender={ true }
			width={ containerProps.width - two * paddingForLabel }
			height={ containerProps.height - two * paddingForLabel }
			maxValue={ maxDialValue }
			needleTransitionDuration={ 300 }
			needleTransition="easeLinear"
			value={ SPFManager.findNeedlePosition(context) }
			customSegmentLabels={ customLabels }
			ringWidth={ ringWidth }
			textColor="#212121"
			segments={ customLabels.length }
			paddingHorizontal={ paddingForLabel }
			paddingVertical={ paddingForLabel }
			labelFontSize="31px"
			valueTextFontSize="37px"
			valueTextFontWeight="500"
			currentValueText="SPF"
		/>
	);
};

export default SPFDial;
