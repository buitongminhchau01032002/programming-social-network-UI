const USER = {
    displayName: 'Nguyễn Văn A',
    avatar: 'https://picsum.photos/100/100',
};

function Header() {
    const user = false;
    return (
        <header className="fixed flex h-14 w-full items-center justify-between border-b bg-white px-16">
            <div>LOGO</div>

            {/* SEARCH */}
            <div className="flex h-9 min-w-[520px] rounded-md border border-gray-400 focus-within:!border-primary hover:border-gray-500">
                <input className="h-full flex-1 rounded-md px-3 outline-none" placeholder="Tìm kiếm bài viết..." />
            </div>

            {/* ACTION GROUP */}
            {user ? (
                <div className="flex items-center space-x-3">
                    <button className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
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

                    <div className="flex items-center space-x-1">
                        <button className="h-9 w-9 overflow-hidden rounded-full ring-primary hover:ring-2">
                            <img className="h-full w-full object-contain" src={USER.avatar} />
                        </button>
                        <button className="hover:text-primary-dark">
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
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <button className="flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white">
                        Đăng kí
                    </button>
                    <button className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                        Đăng nhập
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
