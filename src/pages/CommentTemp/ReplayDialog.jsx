import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const BUTTONS = ['bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

function ReplayDialog({ comment, onClickOutside }) {
    const editor = useRef(null);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70" onClick={onClickOutside}>
            <div className="min-w-[600px]" onClick={(e) => e.stopPropagation()}>
                <JoditEditor
                    ref={editor}
                    key="contentEditor"
                    config={{
                        buttons: BUTTONS,
                        buttonsMD: BUTTONS,
                        buttonsSM: BUTTONS,
                    }}
                    tabIndex={1}
                    // onBlur={}
                    // onChange={}
                />
            </div>
        </div>
    );
}

export default ReplayDialog;
