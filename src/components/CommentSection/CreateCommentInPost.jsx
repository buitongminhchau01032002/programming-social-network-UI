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
import { Link } from 'react-router-dom';

const BUTTONS = ['bold', 'italic', 'underline', 'link', 'ul', 'eraser'];

const validationSchema = Yup.object({
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
});

function CreateCommentInPost({ postId, onCreatedComment }) {
    const user = useSelector(userSelector);

    const [loading, setLoading] = useState(false);

    const formik = useFormik({ initialValues: { content: '' }, validationSchema, onSubmit: handleSubmit });

    function handleSubmit(values) {
        // onClickOutside();
        fetch('http://localhost:8080/api/comment', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user?.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: values.content,
                postId,
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
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);

    return (
        <>
            {user ? (
                <form className="flex space-x-2" onSubmit={formik.handleSubmit}>
                    <div className="h-9 w-9 overflow-hidden rounded-full">
                        <img src={user?.avatar} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
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
                        <button
                            type="submit"
                            className={clsx(
                                'mt-2 flex h-9 w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                                {
                                    'pointer-events-none opacity-50': !formik.dirty || loading,
                                }
                            )}
                        >
                            Bình luận
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p className="mb-2 font-semibold">Đăng nhập để viêt bình luận</p>
                    <Link
                        to="/login"
                        className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        Đăng nhập
                    </Link>
                </div>
            )}
        </>
    );
}

export default CreateCommentInPost;
