import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { convert as convertHTMLtoText } from 'html-to-text';
import CategoryInput from './CategoryInput';
import PostContentEditor from './PostContentEditor';
import TagInput from './TagInput';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import ImageInput from './ImageInput';

const validationSchema = Yup.object({
    title: Yup.string().required('Trường này bắt buộc').min(4, 'Tiêu đề phải ít nhất 4 kí tự'),
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
    categoryId: Yup.string().required('Trường này bắt buộc'),
    tagName: Yup.string().required('Trường này bắt buộc'),
});

function CreatePost() {
    const formik = useFormik({
        initialValues: {
            title: 'Tiêu đề',
            content: 'Nhập nội dung',
            categoryId: '',
            tagId: '',
            tagName: '',
            images: [],
        },
        validationSchema,
        onSubmit: handleSubmit,
    });
    const user = useSelector(userSelector);

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setTouched({ ...formik.touched, content: true });
        console.log('set touch');
    }, []);

    function handleSubmit(values) {
        const formData = new FormData();
        // Object.keys(values).forEach((key) => {
        //     formData.append(key, values[key]);
        // });

        Object.keys(values).forEach((key) => {
            if (key !== 'images') {
                formData.append(key, values[key]);
            } else {
                if (values.images.length > 0) {
                    values.images.forEach((image) => {
                        formData.append('images', image);
                    });
                }
            }
        });

        createPost(formData);
    }
    const createPost = async (formData) => {
        try {
            const res = await fetch('http://localhost:8080/api/post', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
                body: formData,
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(formik.values);

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Tạo bài đăng</h2>

            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-7">
                    {/* LEFT */}
                    <div className="col-span-2">
                        <div className="mb-4">
                            <label className="font-semibold">Tiêu đề</label>
                            <input
                                name="title"
                                type="text"
                                className={clsx('text-input mt-1', {
                                    invalid: formik.errors.title && formik.touched.title,
                                })}
                                placeholder="Tiêu đề bài viết"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            <div
                                className={clsx('invisible text-sm', {
                                    '!visible text-red-500': formik.errors.title && formik.touched.title,
                                })}
                            >
                                {formik.errors.title || 'No error message'}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold">Nội dung</label>
                            <div
                                className={clsx('text-editor mt-1 rounded-sm', {
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
                                className={clsx('invisible text-sm', {
                                    '!visible text-red-500': formik.errors.content && formik.touched.content,
                                })}
                            >
                                {formik.errors.content || 'No er'}
                            </div>
                        </div>

                        <div className="mb-4">
                            <ImageInput formik={formik} formikField="images" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <div className="mb-4">
                            <label className="font-semibold">Chủ đề</label>
                            <CategoryInput
                                name="categoryId"
                                className={clsx('text-input mt-1', {
                                    invalid: formik.errors.categoryId && formik.touched.categoryId,
                                })}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.categoryId}
                            />
                            <div
                                className={clsx('invisible text-sm', {
                                    '!visible text-red-500': formik.errors.categoryId && formik.touched.categoryId,
                                })}
                            >
                                {formik.errors.categoryId || 'No er'}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold">Tag</label>
                            <TagInput
                                formik={formik}
                                formikFieldId="tagId"
                                formikFieldName="tagName"
                                className={clsx('text-input mt-1', {
                                    invalid: formik.errors.tagName && formik.touched.tagName,
                                })}
                                categoryId={formik.values.categoryId}
                            />
                            <div
                                className={clsx('invisible text-sm', {
                                    '!visible text-red-500': formik.errors.tagName && formik.touched.tagName,
                                })}
                            >
                                {formik.errors.tagName || 'No er'}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                >
                    <span className="pr-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 pt-0.5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    Tạo bài đăng
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
