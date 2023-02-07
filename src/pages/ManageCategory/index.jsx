import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSelector } from '../../redux/selectors/userSelector';
import CategoryInput from './CategoryInput';

function ManageCategory() {
    const user = useSelector(userSelector);
    const [categoryName, setCategoryName] = useState('');
    const showCreateNoti = () => toast.success('Tạo thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        fetch('http://localhost:8080/api/categories', {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setCategories([]);
                    return;
                }
                setCategories(data.categories);
            })
            .catch((err) => {
                console.log(err);
                setCategories([]);
            });
    }

    function createCategory() {
        fetch(`http://localhost:8080/api/category`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    showErorrNoti();
                    return;
                }
                setCategoryName('');
                showCreateNoti();
                getCategories();
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
            });
    }

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Quản lý chủ đề</h2>
            <div className="grid grid-cols-2 gap-16">
                <div>
                    <h3 className="text-lg font-semibold">Tất cả chủ đề</h3>
                    <div className="mt-3 space-y-3">
                        {categories?.map((category) => (
                            <CategoryInput category={category} key={category._id} onChange={getCategories} />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Tạo chủ đề mới</h3>

                    <input
                        type="text"
                        className="text-input mt-2"
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                        placeholder="Tên chủ đề"
                    />
                    <button
                        onClick={() => createCategory()}
                        className="mt-3 flex h-9 w-full min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        Tạo chủ đề
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageCategory;
