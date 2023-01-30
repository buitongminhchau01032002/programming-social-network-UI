import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function AuthLayout({ children }) {
    const location = useLocation();
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }
    }, [user, location.pathname]);
    return <>{children}</>;
}

export default AuthLayout;
