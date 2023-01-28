import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { convert as convertHTMLtoText } from 'html-to-text';
import CategoryInput from '../../components/PostControl/CategoryInput';
import PostContentEditor from '../../components/PostControl/PostContentEditor';
import TagInput from '../../components/PostControl/TagInput';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import ImageInput from '../../components/PostControl/ImageInput';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    title: Yup.string().required('Trường này bắt buộc').min(4, 'Tiêu đề phải ít nhất 4 kí tự'),
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
    categoryId: Yup.string().required('Trường này bắt buộc'),
    tagName: Yup.string().required('Trường này bắt buộc'),
});

function EditPost() {
    const { postId } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const showSuccessNoti = () => toast.success('Chỉnh sửa bài đăng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    useEffect(() => {
        fetch('http://localhost:8080/api/posts/' + postId)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(error);
                    showErorrNoti();
                    setPost([]);
                    return;
                }
                setPost(data.post);
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
                setPost([]);
            });
    }, []);

    const updatePost = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            // check and create tag
            if (!values.tagId) {
                const res = await fetch('http://localhost:8080/api/tag', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user?.token,
                    },
                    body: JSON.stringify({
                        categoryId: values.categoryId,
                        name: values.tagName,
                    }),
                });
                const data = await res.json();
                if (data.error) {
                    throw data.error;
                }
                values.tagId = data.tag._id;
            }

            // Get form data
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (values[key] === formik.initialValues[key]) {
                    return;
                }
                if (key !== 'images') {
                    formData.append(key, values[key]);
                } else {
                    if (!values.images) {
                        return;
                    } else if (values.images.length > 0) {
                        values.images.forEach((image) => {
                            formData.append('images', image.file);
                        });
                    } else {
                        formData.append('images', null);
                    }
                }
            });

            // Update post

            const res = await fetch('http://localhost:8080/api/posts/' + postId + '/edit', {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
                body: formData,
            });
            const data = await res.json();
            if (data.error) {
                throw data.error;
            }

            showSuccessNoti();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            showErorrNoti();
        }
    };

    const formik = useFormik({
        initialValues: {
            title: post?.title || '',
            content: post?.content || '',
            categoryId: post?.category?._id || '',
            tagId: post?.tag?._id || '',
            tagName: post?.tag?.name || '',
            images: null,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: updatePost,
    });
    const user = useSelector(userSelector);

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Chỉnh sửa bài đăng</h2>

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
                            <ImageInput
                                formik={formik}
                                formikField="images"
                                edit={false}
                                initImage={post?.images || []}
                            />
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
                <div className="flex items-center">
                    <button
                        type="submit"
                        className={clsx(
                            'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                            {
                                'pointer-events-none opacity-50': !formik.dirty || loading,
                            }
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 pr-1"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                        Chỉnh sửa bài đăng
                    </button>

                    {loading && (
                        <div className="ml-4 flex items-center font-medium text-primary-dark">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 animate-spin"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                            <div className="ml-1">Đang chỉnh sửa bài đăng</div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default EditPost;
