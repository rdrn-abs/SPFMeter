import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import SPFManager from '../services/SPFManager';

const two = 2;
const fontValFactor = 17;
const ringWidthFactor = 6;
const fontColor = '#212121';

const dialStyles = (context) => {
	const { config:	{ customLabels, paddingForLabel, maxDialValue }} = context;

	return {
		textColor: fontColor,
		segments: customLabels.length,
		paddingHorizontal: paddingForLabel,
		paddingVertical: paddingForLabel,
		labelFontSize: '50px',
		valueTextFontWeight: '500',
		currentValueText: 'SPF',
		maxValue: maxDialValue,
		needleTransitionDuration: 300,
		needleTransition: 'easeLinear',
		customSegmentLabels: customLabels,
	};
};

const SPFDial = (context) => {
	const { config: { paddingForLabel }, state: { containerProps }} = context;
	const fontVal = `${ Math.round(containerProps.width / fontValFactor) }px`;

	return (
		<ReactSpeedometer
			{ ...{
				...dialStyles(context),
				forceRender: true,
				width: containerProps.width - (two * paddingForLabel),
				height: containerProps.height - (two * paddingForLabel),
				value: SPFManager.findNeedlePosition(context),
				ringWidth: containerProps.width / ringWidthFactor,
				valueTextFontSize: fontVal,
			}		}
		/>
	);
};

export default SPFDial;
