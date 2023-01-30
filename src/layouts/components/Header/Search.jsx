import { useState, useEffect } from 'react';
import { convert as convertHTMLtoText } from 'html-to-text';
import UserWithAvatarAndName from '../../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import CategoryBadge from '../../../components/CategoryBadge/CategoryBadge';
import { Link } from 'react-router-dom';

function stringToSlug(str) {
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

function Search() {
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchPosts, setSearchPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/posts')
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error(data.error);
                    setPosts([]);
                }
                setPosts(data.posts);
            })
            .catch((error) => {
                console.error(error);
                setPosts([]);
            });
    }, []);

    useEffect(() => {
        if (!searchInput) {
            setSearchPosts([]);
            return;
        }
        const newSearchPosts = posts
            .filter((post) => stringToSlug(post.title).includes(stringToSlug(searchInput)))
            .slice(0, 5);
        setSearchPosts(newSearchPosts);
    }, [posts, searchInput]);

    return (
        <div className="group relative">
            <div className="flex h-9 min-w-[520px] rounded-md border border-gray-400 focus-within:!border-primary hover:border-gray-500">
                <input
                    className="h-full flex-1 rounded-md px-3"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Tìm kiếm bài viết..."
                />
            </div>

            {/* PANEL */}
            {searchInput && (
                <button className="absolute right-0 left-0 hidden min-h-[200px] cursor-auto flex-col space-y-2 rounded-lg border bg-white p-3 shadow-md group-focus-within:flex">
                    {searchPosts.length > 0 ? (
                        searchPosts.map((post) => (
                            <Link
                                to={'/comment/' + post._id}
                                key={post._id}
                                className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-left hover:shadow"
                            >
                                <h2 className="font-bold line-clamp-1">{post?.title}</h2>
                                <p className="mt-1 text-sm leading-4 text-gray-600 line-clamp-1">
                                    {convertHTMLtoText(post?.content, { wordwrap: false })}
                                </p>
                                <div className="mt-3 flex items-center justify-between">
                                    <UserWithAvatarAndName user={post?.creator} />
                                    <CategoryBadge category={post?.category} />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="mt-8 flex h-full w-full flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                            </svg>
                            <p className="mt-3">Không tìm thấy kết quả!</p>
                        </div>
                    )}
                </button>
            )}
        </div>
    );
}

export default Search;
