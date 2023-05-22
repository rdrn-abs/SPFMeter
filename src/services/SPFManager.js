const straightAngle = 180;
const centum = 100;
const twoSeventy = 270;

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
	const theta = straightAngle - (angleRad * straightAngle / Math.PI);

	return roundValue(
		theta, 0, straightAngle, twoSeventy
	);
};

const findNeedlePosition = (context) => {
	const { config: { maxDialValue }} = context;

	return calculateMousePosition(context) * maxDialValue / straightAngle;
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
		= calculateMousePosition(context) * (centum / straightAngle);

	const foundSegment = spfDictionary.find((obj) =>
		mousePosPercent <= obj.segment);

	return foundSegment;
};
const SPFManager = { updateLocalMousePos,
	findSegment, findNeedlePosition };

export default SPFManager;
