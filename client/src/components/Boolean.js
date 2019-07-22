import React from 'react';
import Switch from 'react-switch';

function BooleanSwitch(props) {
	return (
		<Switch
			onChange={props.onChange}
			checked={props.value}
			checkedIcon={false}
			uncheckedIcon={false}
		/>
	)
}

export default BooleanSwitch;
