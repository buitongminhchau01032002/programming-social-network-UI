import { useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
    //   buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const PostContentEditor = ({ initialValue, onChangeContent }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={initialValue}
            config={config}
            tabIndex={1}
            //   onBlur={(newContent) => onChangeContent(newContent)}
            onChange={(newContent) => onChangeContent(newContent)}
        />
    );
};

export default PostContentEditor;
