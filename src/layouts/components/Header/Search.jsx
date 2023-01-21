import { useEffect } from 'react';
import { useState } from 'react';

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
    });

    useEffect(() => {
        if (!searchInput) {
            setSearchPosts([]);
            return;
        }
        const newSearchPosts = posts.filter((post) => stringToSlug(post.title).includes(searchInput)).slice(0, 10);
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
            {searchPosts.length > 0 && (
                <button className="absolute right-0 left-0 hidden min-h-[200px] cursor-auto flex-col rounded-lg border bg-white p-3 shadow-md group-focus-within:flex">
                    {searchPosts.map((post) => (
                        <div key={post._id}>{post.title}</div>
                    ))}
                </button>
            )}
        </div>
    );
}

export default Search;
