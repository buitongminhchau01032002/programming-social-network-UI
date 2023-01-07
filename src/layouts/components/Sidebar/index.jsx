import { useEffect, useState } from 'react';

function Sidebar() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/categories')
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.categories) {
                    setCategories(resBody.categories);
                } else {
                    setCategories([]);
                }
            })
            .catch((err) => {
                console.log(err);
                setCategories([]);
            });
    }, []);
    return (
        <aside className="">
            {/* SECTION CATEGORY */}
            <section className="mt-4">
                <h2 className="text-xl font-semibold">Chủ đề</h2>
                <div className="mt-2 flex flex-wrap">
                    {categories?.map((category) => (
                        <button key={category._id} className="mr-2 mb-2 rounded-md bg-pink-400 px-5 py-1 text-white hover:bg-opacity-70">
                            {category.name || 'Không tên'}
                        </button>
                    ))}
                </div>
            </section>

            {/* TOP POST SECTION */}
            <section className="mt-4">
                <h2 className="text-xl font-semibold">Nổi bật</h2>
                <div className="mt-2 flex flex-wrap">àasffsaffasfdas</div>
            </section>
        </aside>
    );
}

export default Sidebar;
