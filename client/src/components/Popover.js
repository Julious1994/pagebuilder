import React from 'react';
import Popover from 'react-tiny-popover';


class Popover extends React.Component {
	render() {
		const { isOpen, content } = this.props;
		return (
			<Popover
					isOpen={isOpen}
					position={['top', 'bottom']} // preferred position
					content={content}
			>
				{
					this.props.children
				}
			</Popover>
		)
	}
}

export default Popover;
