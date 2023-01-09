import Header from './components/Header';
import Sidebar from './components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="mx-auto grid max-w-container grid-cols-3 gap-7 py-h-header px-7">{children}</main>
        </div>
    );
}

export default DefaultLayout;
