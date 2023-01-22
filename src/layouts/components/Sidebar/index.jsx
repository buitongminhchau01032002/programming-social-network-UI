import { useEffect, useState } from 'react';
import { convert as convertHTMLtoText } from 'html-to-text';
import ellipsize from 'ellipsize';
import CategoryBadge from '../../../components/CategoryBadge/CategoryBadge';
import UserWithAvatarAndName from '../../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import colorizeCategory from '../../../utils/colorizeCategory';

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/categories')
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error) {
                    setCategories([]);
                    return;
                }
                setCategories(resBody.categories);
            })
            .catch((err) => {
                console.log(err);
                setCategories([]);
            });
        fetch('http://localhost:8080/api/posts')
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error) {
                    setPosts([]);
                    return;
                }
                setPosts(resBody.posts);
            })
            .catch((err) => {
                console.log(err);
                setPosts([]);
            });
    }, []);

    return (
        <aside className="">
            {/* SECTION CATEGORY */}
            <section className="mt-5">
                <h2 className="text-xl font-semibold">Chủ đề</h2>
                <div className="mt-3 flex flex-wrap">
                    {categories?.map((category) => (
                        <button
                            key={category._id}
                            style={{ background: colorizeCategory(category) }}
                            className="mr-2 mb-2 rounded-md px-5 py-1 font-medium text-white hover:shadow-md"
                        >
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
                    {posts?.slice(0, 3)?.map((post) => (
                        <div
                            key={post._id}
                            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 hover:shadow"
                        >
                            <h2 className="font-bold line-clamp-1">{post?.title}</h2>
                            <p className="mt-1 text-sm leading-4 text-gray-600 line-clamp-1">
                                {convertHTMLtoText(post?.content, { wordwrap: false })}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <UserWithAvatarAndName user={post?.creator} />
                                <CategoryBadge category={post?.category} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </aside>
    );
}

export default Sidebar;
