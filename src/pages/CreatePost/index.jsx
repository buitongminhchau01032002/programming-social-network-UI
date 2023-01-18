import { useFormik } from 'formik';
import * as Yup from 'yup';
import CategoryInput from './CategoryInput';
import PostContentEditor from './PostContentEditor';

const validationSchema = Yup.object({
    title: Yup.string().required('Trường này bắt buộc'),
});

function CreatePost() {
    const formik = useFormik({
        initialValues: {
            title: '',
            tag: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Tạo bài đăng</h2>

            <form className="grid grid-cols-3 gap-7" onSubmit={formik.handleSubmit}>
                {/* LEFT */}
                <div className="col-span-2">
                    <div className="mb-6">
                        <label className="font-semibold">Tiêu đề</label>
                        <input
                            name="title"
                            type="text"
                            className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                            placeholder="Tiêu đề bài viết"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold">Nội dung</label>
                        <div className="text-editor mt-1">
                            <PostContentEditor
                                initialValue="Nội dung bài viết ... "
                                onChangeContent={(content) => console.log(content)}
                            />
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
                </div>

                {/* RIGHT */}
                <div>
                    <div className="mb-6">
                        <label className="font-semibold">Chủ đề</label>
                        <CategoryInput className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500" />
                    </div>
                    <div className="mb-6">
                        <label className="font-semibold">Tag</label>
                        <input
                            type="text"
                            name="tag"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tag}
                            className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                            placeholder="tag..."
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
