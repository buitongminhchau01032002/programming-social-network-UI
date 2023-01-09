import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';

function SampleLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    function handleLogin(e) {
        e.preventDefault();
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error) {
                    console.log('Đăng nhập không thành công');
                    console.log(resBody);
                    alert(JSON.stringify(resBody, null, 2));

                    return;
                }

                const user = resBody.user;
                user.token = resBody.token;
                dispatch(userActions.login(user));
                console.log(user);
                alert(JSON.stringify(user, null, 2));
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={form.email}
                onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value,
                    })
                }
                placeholder="email"
            />
            <input
                type="password"
                onChange={(e) =>
                    setForm({
                        ...form,
                        password: e.target.value,
                    })
                }
                placeholder="mat khau"
            />
            <button type="submit" className="border">
                Dang nhap
            </button>
        </form>
    );
}

export default SampleLogin;
