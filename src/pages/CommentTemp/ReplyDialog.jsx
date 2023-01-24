import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { convert as convertHTMLtoText } from 'html-to-text';
import { useCallback, useRef, useState } from 'react';
import PostContentEditor from '../../components/PostControl/PostContentEditor';
import UserWithAvatarAndName from '../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import clsx from 'clsx';

const BUTTONS = ['bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

const validationSchema = Yup.object({
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
});

function ReplayDialog({ comment, onClickOutside, onSubmit }) {
    const editor = useRef(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({ initialValues: { content: '' }, validationSchema, onSubmit: handleSubmit });

    function handleSubmit(values) {
        // onClickOutside();
        console.log(values.content);
        // handle create comment
    }

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setTouched({ ...formik.touched, content: true });
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClickOutside}>
            <form
                onSubmit={formik.handleSubmit}
                className="flex min-w-[600px] flex-col space-y-3 rounded border bg-white p-3"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center text-lg font-semibold">Trả lời bình luận</p>
                <div className="rounded ">
                    <div className="flex items-center">
                        <UserWithAvatarAndName user={comment.author} />
                        <div className="ml-4 text-xs text-gray-600">{moment(comment.createdAt).fromNow()}</div>
                    </div>

                    <p className="mt-2 text-gray-600">{comment.content}</p>
                </div>
                <div>
                    <div
                        className={clsx('text-editor rounded-sm', {
                            'ring-1 ring-red-500': formik.errors.content && formik.touched.content,
                        })}
                    >
                        <PostContentEditor
                            setFormik={handleChangeContent}
                            initValue={formik.initialValues.content}
                            setTouch={setTouchContent}
                        />
                    </div>
                    <div
                        className={clsx('hidden text-sm', {
                            '!block text-red-500': formik.errors.content && formik.touched.content,
                        })}
                    >
                        {formik.errors.content || 'No er'}
                    </div>
                </div>
                <button
                    type="submit"
                    className={clsx(
                        'flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                        {
                            'pointer-events-none opacity-50': !formik.dirty || loading,
                        }
                    )}
                >
                    Trả lời bình luận
                </button>
            </form>
        </div>
    );
}

export default ReplayDialog;
