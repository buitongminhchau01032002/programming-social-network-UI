import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { userActions } from '../../redux/slices/userSlice';

import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { convert as convertHTMLtoText } from 'html-to-text';
import { useCallback, useRef, useState } from 'react';
import PostContentEditor from '../PostControl/PostContentEditor';
import UserWithAvatarAndName from '../UserWithAvatarAndName/UserWithAvatarAndName';
import clsx from 'clsx';

const validationSchema = Yup.object({
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
});

function ReplayDialog({ comment, onClickOutside, postId, onCreatedComment }) {
    const user = useSelector(userSelector);

    const [loading, setLoading] = useState(false);

    const formik = useFormik({ initialValues: { content: '' }, validationSchema, onSubmit: handleSubmit });

    function handleSubmit(values) {
        setLoading(true);
        fetch('http://localhost:8080/api/comment', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user?.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: values.content,
                postId,
                parentCommentId: comment._id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                onCreatedComment && onCreatedComment();
                formik.resetForm();
                onClickOutside();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50" onClick={onClickOutside}>
            <form
                onSubmit={formik.handleSubmit}
                className="flex min-w-[600px] flex-col space-y-3 rounded border bg-white p-3"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-center text-lg font-semibold">Trả lời bình luận</p>
                {/* <div className="rounded ">
                    <div className="flex items-center">
                        <UserWithAvatarAndName user={comment.author} />
                        <div className="ml-4 text-xs text-gray-600">{moment(comment.createdAt).fromNow()}</div>
                    </div>
                </div> */}
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
