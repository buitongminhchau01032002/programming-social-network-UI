import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { userActions } from '../../redux/slices/userSlice';

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

function CreateCommentInPost() {
    const user = useSelector(userSelector);

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
                <div>Đăng nhập để viêt bình luận</div>
            )}
        </>
    );
}

export default CreateCommentInPost;
