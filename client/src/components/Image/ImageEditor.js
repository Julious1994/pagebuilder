import React from 'react';
import Modal from 'react-modal';
import Cropper from 'react-cropper';

import 'cropperjs/dist/cropper.css';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.7)';
const customStyles = {
	content: {
		top: '20%',
		left: '20%',
		right: '20%',
		bottom: 'auto',
		zIndex: '1000',
	},
	overlay: {
		zIndex: '1000',
	}
};

function ImageEditor({ isOpen, onClose, src, ...props }) {
	const cropperRef = React.useRef();

	function handleSaveImage() {
		if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
      return;
    }
		props.onImageChange(cropperRef.current.getCroppedCanvas().toDataURL());
		onClose && onClose();
	}

	function handleLeftRotate() {
		cropperRef.current.rotate(-90);
	}

	function handleRightRotate() {
		cropperRef.current.rotate(90);
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles}
			ariaHideApp={false}
		>
			<Cropper
				ref={e => cropperRef.current = e}
				src={src}
				style={{ height: 400, width: '100%' }}
			/>
			<button type="button" onClick={handleSaveImage}>Save</button>
			<button type="button" onClick={handleLeftRotate}>Left</button>
			<button type="button" onClick={handleRightRotate}>RIght</button>
		</Modal>
	)
}

export default ImageEditor;
