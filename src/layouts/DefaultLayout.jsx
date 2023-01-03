import Header from './components/Header';
import Sidebar from './components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="mx-auto mt-h-header grid max-w-container grid-cols-3 gap-7 px-7">
                <div className="col-span-2">{children}</div>
                <Sidebar />
            </main>
        </div>
    );
}

export default DefaultLayout;
