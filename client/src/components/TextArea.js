import React from 'react';

function TextArea(props) {
	const { value, onChange } = props;
	return (
		<textarea
			onChange={(e) => console.log(e.target.value)}
		>
			{value}
		</textarea>
	)
}

export default TextArea;
