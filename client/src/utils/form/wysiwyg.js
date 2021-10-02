import React, { useEffect, useState } from 'react';

import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import htmlToDraft from 'html-to-draftjs';


const WYSIWYG = ({handleEditorState}) => {
    const [editorData, setEditorData] = useState({
        editorState: EditorState.createEmpty()
    });

    const onEditorStateChangeHandler = (editor) => {
        const HTMLdata = stateToHTML(editor.getCurrentContent());
        setEditorData({
            editorState: editor
        });
        handleEditorState(HTMLdata);
    }

    return (
        <Editor
            editorState={editorData.editorState}
            onEditorStateChange={onEditorStateChangeHandler}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
        />
    );
};

export default WYSIWYG;