import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';
function Verify() {
    const navigate = useNavigate();
    console.log(token);
    let success = 'Đã xác nhận tài khoản thành công';
    let error = 'Đăng ký thất bại';

    const showSuccessNoti = () => toast.success(success);
    const showErorrNoti = () => toast.error(error);
    function handleVerify(values) {
        fetch('http://localhost:8080/api/verification/' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error) {
                    // showErorrNoti();
                    console.log(resBody.error);
                } else {
                    showSuccessNoti();
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
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
                <section className=" ">
                    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                        <button
                            type="submit"
                            className="btn btn-green btn-md mt-4 w-full"
                            onClick={() => {
                                handleVerify();
                            }}
                        >
                            Xác nhận tạo tài khoản
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Verify;
