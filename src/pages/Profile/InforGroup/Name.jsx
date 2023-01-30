import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../redux/slices/userSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
});

function Name({ user, currentUser, onChange, isOwner }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        const formData = new FormData();
        formData.append('name', values.name);
        setLoading(true);
        fetch('http://localhost:8080/api/users/change-info', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                dispatch(
                    userActions.update({
                        name: data.user.name,
                    })
                );
                onChange();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            <form className="mb-4" onSubmit={formik.handleSubmit}>
                <label className="font-semibold">Tên</label>
                <div className="mt-1 flex items-center space-x-1">
                    <input
                        name="name"
                        type="text"
                        className={clsx('text-input flex-1', {
                            invalid: formik.errors.name && formik.touched.name,
                            disabled: !isOwner,
                        })}
                        disabled={!isOwner}
                        placeholder="Tên hiển thị"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.dirty && (
                        <button
                            type="submit"
                            className={clsx(
                                'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark',
                                {
                                    'pointer-events-none opacity-50': loading,
                                }
                            )}
                        >
                            Cập nhật
                        </button>
                    )}
                </div>
                <div
                    className={clsx('invisible text-sm', {
                        '!visible text-red-500': formik.errors.name && formik.touched.name,
                    })}
                >
                    {formik.errors.name || 'No error message'}
                </div>
            </form>
        </div>
    );
}

export default Name;
