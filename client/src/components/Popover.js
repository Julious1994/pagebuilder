import React from 'react';
import Popover from 'react-tiny-popover';


class PopoverWrapper extends React.Component {
	render() {
		const { isOpen, content } = this.props;
		const dest = document.getElementById("editor-content");
		return (
			<Popover
					isOpen={isOpen}
					position={['top', 'bottom']} // preferred position
					content={content}
					contentDestination={dest}
			>
				{
					this.props.children
				}
			</Popover>
		)
	}
}

export default PopoverWrapper;
