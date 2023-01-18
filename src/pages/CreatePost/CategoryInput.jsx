import { useEffect, useRef, useState } from 'react';

function CategoryInput({ ...props }) {
    const [categories, setCategories] = useState([]);
    const selectElem = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/categories')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error) {
                    setCategories([]);
                    return;
                }
                setCategories(resJson.categories);
            })
            .catch((error) => {
                console.log(error);
                setCategories([]);
            });
    }, []);

    return (
        <select {...props} ref={selectElem}>
            <option value="" disabled>
                -- Chọn chủ đề --
            </option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
export default CategoryInput;
