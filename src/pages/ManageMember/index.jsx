import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSelector } from '../../redux/selectors/userSelector';

function ManageMember() {
    const user = useSelector(userSelector);

    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        getAccounts();
    }, []);

    function getAccounts() {
        fetch('http://localhost:8080/api/admin/get-all-members', {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setAccounts([]);
                    return;
                }
                setAccounts(data.allMembers);
            })
            .catch((err) => {
                console.log(err);
                setAccounts([]);
            });
    }

    function getBanned() {
        return accounts.filter((account) => account?.isBanned === true);
    }
    function handleBan(account) {
        fetch('http://localhost:8080/api/admin/ban', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: account._id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                getAccounts();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleUnBan(account) {
        fetch('http://localhost:8080/api/admin/unban', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: account._id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return;
                }
                getAccounts();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Quản lý thành viên</h2>
            <div className="grid grid-cols-2 gap-16">
                <div>
                    <h3 className="text-lg font-semibold">Tất cả thành viên</h3>
                    <div className="mt-3 space-y-3">
                        {accounts?.map((account) => (
                            <div className="flex items-center" key={account?._id}>
                                <Link to={'/profile/' + account?._id} className="flex flex-1 items-center">
                                    <img
                                        className="block h-10 w-10 rounded-full border object-cover"
                                        src={account?.avatar}
                                    />
                                    <div className="flex-1 space-y-1 pl-3">
                                        <p className="font-semibold leading-4">{account.name}</p>
                                        <p className="font-sm w-full leading-4 text-gray-700">{account.email}</p>
                                    </div>
                                </Link>
                                {account?.isBanned ? (
                                    <button
                                        className={clsx(
                                            'flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10'
                                        )}
                                        onClick={() => handleUnBan(account)}
                                    >
                                        Bỏ cấm
                                    </button>
                                ) : (
                                    <button
                                        className={clsx(
                                            'flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600'
                                        )}
                                        onClick={() => handleBan(account)}
                                    >
                                        Cấm
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Đã cấm</h3>
                    <div className="mt-3 space-y-3">
                        {getBanned()?.map((account) => (
                            <div className="flex items-center" key={account?._id}>
                                <Link to={'/profile/' + account?._id} className="flex flex-1 items-center">
                                    <img
                                        className="block h-10 w-10 rounded-full border object-cover"
                                        src={account?.avatar}
                                    />
                                    <div className="flex-1 space-y-1 pl-3">
                                        <p className="font-semibold leading-4">{account.name}</p>
                                        <p className="font-sm w-full leading-4 text-gray-700">{account.email}</p>
                                    </div>
                                </Link>
                                {account?.isBanned ? (
                                    <button
                                        className={clsx(
                                            'flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10'
                                        )}
                                        onClick={() => handleUnBan(account)}
                                    >
                                        Bỏ cấm
                                    </button>
                                ) : (
                                    <button
                                        className={clsx(
                                            'flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600'
                                        )}
                                        onClick={() => handleBan(account)}
                                    >
                                        Cấm
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageMember;
