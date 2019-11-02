import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
	position: relative;
`;

function EditableDiv(props) {
	const { editable = true, html, disabled } = props;
	const [editorState, setEditorState] = useState();

	function handleChange(e) {
		props.onChange && props.onChange(e.target.value);
	};

	function handleChange() {
		const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		props.onChange && props.onChange(html);
	}
	function htmlToEditorState(html) {
		const contentBlock = htmlToDraft(html);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		setEditorState(EditorState.createWithContent(contentState));
	}

	useEffect(() => {
		htmlToEditorState(html);
	}, [html]);

	return (
		<Container>
			<Editor
				readOnly={disabled}
				toolbarOnFocus
				editorState={editorState}
				toolbar={{
					options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link'],
				}}
				toolbarStyle={{
					position: 'absolute',
					width: '350%',
					top: '-7em',
					right: '-100%',
					...props.toolbarStyle
				}}
				onBlur={handleChange}
				onEditorStateChange={(state) => setEditorState(state)}
			/>
		</Container>
	);
}

export default EditableDiv;
