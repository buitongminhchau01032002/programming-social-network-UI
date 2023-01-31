import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import * as Yup from 'yup';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, useFormik } from 'formik';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().required('Vui lòng nhập email!'),
});

function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const showSuccessNoti = () => toast.success('Link đổi mật khẩu đang được gửi tới email của bạn!');
    const showErorrNoti = () => toast.error(error);

    const form = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: handleForgot,
    });

    function handleForgot(values) {
        fetch('http://localhost:8080/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                showSuccessNoti();
            })
            .catch((error) => {
                () => toast.error(error);
            });
    }

    return (
        <>
            <div>
                <ToastContainer hideProgressBar />
                <section className=" ">
                    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                        <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-green-600 ">
                            <img
                                className="mr-2 h-8 w-8"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                alt="logo"
                            />
                            Mạng xã hội lập trình
                        </a>
                        <div className=" w-[448px] rounded-lg  shadow-2xl">
                            <div className="space-y-4 p-8">
                                <h1 className="text-center text-2xl font-semibold text-gray-900">
                                    Tìm tài khoản của bạn
                                </h1>

                                <form onSubmit={form.handleSubmit}>
                                    <div className="mb-2">
                                        <label htmlFor="username" className="mb-1 block font-medium text-gray-900 ">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className={clsx('text-input w-full py-2', {
                                                invalid: form.touched.email && form.errors.email,
                                            })}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            value={form.values.email}
                                            placeholder="email"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100': form.touched.email && form.errors.email,
                                            })}
                                        >
                                            {form.errors.email || 'No message'}
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-blue btn-md mt-4 w-full"
                                        disabled={!form.dirty || loading}
                                    >
                                        {!loading ? (
                                            <span>Tìm kiếm</span>
                                        ) : (
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-4 w-4 animate-spin"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                    />
                                                </svg>
                                                <span className="ml-1">Đang tìm kiếm</span>
                                            </div>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default ForgotPassword;
