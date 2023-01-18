import { useRef } from 'react';
import JoditEditor from 'jodit-react';

const BUTTONS = ['bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

const PostContentEditor = ({ initialValue, onChangeContent, onBlur }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={initialValue}
            config={{
                buttons: BUTTONS,
                buttonsMD: BUTTONS,
                buttonsSM: BUTTONS,
            }}
            tabIndex={1}
            onBlur={(newContent) => onBlur(newContent)}
            onChange={(newContent) => onChangeContent(newContent)}
        />
    );
};

export default PostContentEditor;
