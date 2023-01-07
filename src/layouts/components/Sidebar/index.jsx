import { useEffect, useState } from 'react';
import CategoryBadge from '../../../components/CategoryBadge/CategoryBadge';
import UserWithAvatarAndName from '../../../components/UserWithAvatarAndName/UserWithAvatarAndName';

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

    function getColor() {
        return 'hsl(' + 360 * Math.random() + ',' + 65 + '%,' + 65 + '%)';
    }

    return (
        <aside className="">
            {/* SECTION CATEGORY */}
            <section className="mt-5">
                <h2 className="text-xl font-semibold">Chủ đề</h2>
                <div className="mt-3 flex flex-wrap">
                    {categories?.map((category) => (
                        <button key={category._id} style={{ background: getColor() }} className="mr-2 mb-2 rounded-md px-5 py-1 font-medium text-white hover:shadow-md">
                            {category.name || 'Không tên'}
                        </button>
                    ))}
                </div>
            </section>

            {/* TOP POST SECTION */}
            <section className="mt-5">
                <h2 className="text-xl font-semibold">Nổi bật</h2>

                <div className="mt-3 space-y-4">
                    {/* POST */}
                    <div className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:shadow">
                        <h2 className="font-bold">Tieu do bai post</h2>
                        <p className="mt-1 text-sm leading-4 text-gray-600">Fasdfasf dsaf sadf sadf dsaf sdfa sfdsa dfsa fas fsaf sa fsdf as fas fasfsaf as</p>
                        <div className="mt-3 flex items-center justify-between">
                            <UserWithAvatarAndName avatar="https://picsum.photos/100/100" name="Nguyễn Vẫn A" />
                            <CategoryBadge>Lập trình</CategoryBadge>
                        </div>
                    </div>

                    {/* POST */}
                    <div className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:shadow">
                        <h2 className="font-bold">Tieu do bai post</h2>
                        <p className="mt-1 text-sm leading-4 text-gray-600">Fasdfasf dsaf sadf sadf dsaf sdfa sfdsa dfsa fas fsaf sa fsdf as fas fasfsaf as</p>
                        <div className="mt-3 flex items-center justify-between">
                            <UserWithAvatarAndName avatar="https://picsum.photos/100/100" name="Nguyễn Vẫn A" />
                            <CategoryBadge>Lập trình</CategoryBadge>
                        </div>
                    </div>

                    {/* POST */}
                    <div className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:shadow">
                        <h2 className="font-bold">Tieu do bai post</h2>
                        <p className="mt-1 text-sm leading-4 text-gray-600">Fasdfasf dsaf sadf sadf dsaf sdfa sfdsa dfsa fas fsaf sa fsdf as fas fasfsaf as</p>
                        <div className="mt-3 flex items-center justify-between">
                            <UserWithAvatarAndName avatar="https://picsum.photos/100/100" name="Nguyễn Vẫn A" />
                            <CategoryBadge>Lập trình</CategoryBadge>
                        </div>
                    </div>
                </div>
            </section>
        </aside>
    );
}

export default Sidebar;
