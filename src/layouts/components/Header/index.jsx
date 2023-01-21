import { useDispatch, useSelector } from 'react-redux';
import { Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { userSelector } from '../../../redux/selectors';
import { userActions } from '../../../redux/slices/userSlice';
import Search from './Search';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    return (
        <header className="fixed flex h-14 w-full items-center justify-between border-b bg-white px-16">
            <Link to="/">LOGO</Link>

            {/* SEARCH */}
            <Search />

            {/* ACTION GROUP */}
            {user ? (
                <div className="flex items-center space-x-3">
                    <Link
                        to="/create-post"
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
                    </Link>

                    <div className="flex items-center space-x-1">
                        <button className="h-9 w-9 overflow-hidden rounded-full ring-primary hover:ring-2">
                            <img className="h-full w-full object-contain" src={user?.avatar} />
                        </button>

                        <Popover className="relative">
                            <Popover.Button as="button" className="outline-none hover:text-primary-dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Popover.Button>

                            <Popover.Panel className="absolute top-full right-0 z-10 w-80 translate-y-3 space-y-3 rounded-lg border bg-white p-3 shadow-xl">
                                <button className="flex w-full items-center border-b pb-2">
                                    <div className="w-1h-11 h-11 overflow-hidden rounded-full">
                                        <img className="h-full w-full object-contain" src={user?.avatar} />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-left font-bold">{user?.name}</p>
                                        <p className="text-left text-sm text-gray-600">{user?.email}</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => dispatch(userActions.logout())}
                                    className="flex h-9 w-full min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                >
                                    Đăng xuất
                                </button>
                            </Popover.Panel>
                        </Popover>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link
                        to="/signup"
                        className="flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white"
                    >
                        Đăng ký
                    </Link>
                    <Link
                        to="/login"
                        className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/sample-login"
                        className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        Đăng nhập sample
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
