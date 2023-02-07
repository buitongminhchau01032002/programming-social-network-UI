import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSelector } from '../../redux/selectors/userSelector';

function CategoryInput({ category, onChange }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(category.name);
    const showUpdateNoti = () => toast.success('Chỉnh sửa thành công!');
    const showDeleteNoti = () => toast.success('Xoá sửa thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const user = useSelector(userSelector);

    function updateCategory() {
        fetch(`http://localhost:8080/api/categories/${category._id}/edit`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    showErorrNoti();
                    return;
                }
                setEditing(false);
                showUpdateNoti();
                onChange();
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
            });
    }

    function deleteCategory() {
        fetch(`http://localhost:8080/api/categories/${category._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    showErorrNoti();
                    return;
                }
                onChange();
                showDeleteNoti();
            })
            .catch((err) => {
                console.log(err);
                showErorrNoti();
            });
    }

    return !editing ? (
        <div className="flex">
            <div className="flex-1">{category.name}</div>
            <button
                onClick={() => setEditing(true)}
                className="flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10"
            >
                Sửa
            </button>
            {/* <button
                onClick={() => deleteCategory()}
                className="ml-2 flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Xoá
            </button> */}
        </div>
    ) : (
        <div className="flex items-center">
            <div className="mr-2 flex-1">
                <input type="text" className="text-input" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <button
                onClick={() => updateCategory()}
                className="flex h-7 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10"
            >
                Cập nhật
            </button>
            <button
                onClick={() => setEditing(false)}
                className="ml-2 flex h-7 items-center justify-center rounded-md bg-red-500 px-3 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Đóng
            </button>
        </div>
    );
}

export default CategoryInput;
