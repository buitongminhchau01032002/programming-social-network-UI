function Sidebar() {
    return (
        <aside className="">
            {/* SECTION CATEGORY */}
            <section className="mt-4">
                <h2 className="text-xl font-semibold">Chủ đề</h2>
                <div className="mt-2 flex flex-wrap">
                    <button className="mr-2 mb-2 rounded-md bg-pink-400 px-5 py-1 text-white hover:bg-opacity-70">Lập trình</button>
                    <button className="mr-2 mb-2 rounded-md bg-orange-500 px-5 py-1 text-white hover:bg-opacity-70">Bugs</button>
                    <button className="mr-2 mb-2 rounded-md bg-violet-500 px-5 py-1 text-white hover:bg-opacity-70">Chia sẻ</button>
                    <button className="mr-2 mb-2 rounded-md bg-green-600 px-5 py-1 text-white hover:bg-opacity-70">Cuộc sống</button>
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
