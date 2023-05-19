/* eslint-disable no-magic-numbers */

const updateLocalMousePos = (context) => {
	const { data, setState,
		state: { containerProps: { offsetLeft, offsetTop }}} = context;

	setState((prevState) => ({
		...prevState,
		localMouse:
		{
			x: data.clientX - offsetLeft,
			y: data.clientY - offsetTop,
		},
	}));
};

const calculateMousePosition = (context) => {
	const {
		state: { localMouse,
			containerProps: { width, height }},
	} = context;
	const half = 0.5;
	const needleOriginX = width * half;
	const needleOriginY = height * half;
	const angleRad = Math.atan2(needleOriginY - localMouse.y,
		localMouse.x - needleOriginX);
	const theta = 180 - (angleRad * 180 / Math.PI);

	return roundValue(
		theta, 0, 180, 270
	);
};

const findNeedlePosition = (context) => {
	const { config: { maxDialValue }} = context;

	return calculateMousePosition(context) * maxDialValue / 180;
}
	;

const getMaxVal = (
	val, maxVal, limit
) => (val > maxVal && val < limit
	? maxVal
	: val);

const roundValue = (
	val, minVal, maxVal, limit
) =>
	(val < minVal || val > limit
		? minVal
		: getMaxVal(
			val, maxVal, limit
		)
	);

const findSegment = (context) => {
	const { config: { spfDictionary }} = context;
	const mousePosPercent
		= calculateMousePosition(context) * (100 / 180);

	const foundSegment = spfDictionary.find((obj) =>
		mousePosPercent <= obj.segment);

	return foundSegment;
};
const SPFManager = { updateLocalMousePos,
	findSegment, findNeedlePosition };

export default SPFManager;
