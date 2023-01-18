import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import * as Yup from 'yup';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, useFormik } from 'formik';

function Verify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    let success = 'Đăng nhập thành công';
    let error = 'Đăng nhập thất bại';

    const showSuccessNoti = () => toast.success(success);
    const showErorrNoti = () => toast.error(error);

    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            roleID: '638f9713d35c2b66f0e75768',
        },
        validationSchema,
        onSubmit: handleSignUp,
    });

    //
    function handleSignUp(values) {
        setLoading(true);
        fetch('http://localhost:5000/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setLoading(false);
                    showSuccessNoti();
                    bacsicForm.resetForm();
                    bacsicForm.values.RePassword = '';
                } else {
                    setLoading(false);
                    console.log(values);
                    showErorrNoti();
                }
            })
            .catch(() => {
                setLoading(false);
                console.log(values);
                showErorrNoti();
            });
    }
    //

    return (
        <>
            <div>
                <ToastContainer hideProgressBar />
                <section className="bg-blue-400 ">
                    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                        <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-green-600 ">
                            <img
                                className="mr-2 h-8 w-8"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                alt="logo"
                            />
                            Mạng xã hội lập trình
                        </a>
                        <div className=" w-[448px] rounded-lg bg-white shadow">
                            <div className="space-y-4 p-8">
                                <h1 className="text-center text-2xl font-semibold text-gray-900">Đăng ký tài khoản</h1>

                                <form onSubmit={form.handleSubmit}></form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Verify;
