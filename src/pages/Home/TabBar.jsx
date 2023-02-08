import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { toast } from 'react-toastify';
function TabBar({
    tabs,
    selectedTab,
    setSelectedTab,
    onSelectedTabChange,
    options,
    selectedOption,
    setSelectedOption,
    onSelectedOptionChange,
    hide,
    setHide,
}) {
    const user = useSelector(userSelector);

    const showNonLogin = () => toast.error('Hãy đăng nhập để thực hiện thao tác!');
    function handleChangeTab(tab) {
        if (!user) {
            showNonLogin();
        } else {
            setSelectedTab(tab);
            if (tab !== selectedTab) {
                onSelectedTabChange(tab);
            }
        }
    }
    function handleChangeOption(option) {
        if (!user) {
            showNonLogin();
        } else {
            setSelectedOption(option);
            if (option !== selectedOption) {
                onSelectedOptionChange(option);
            }
        }
    }
    return (
        <div className="flex justify-between border-b">
            <div className="flex border-b">
                {tabs?.map((tab) => (
                    <div
                        key={tab.id}
                        className={clsx(
                            'cursor-pointer border-b-2 border-transparent p-3 font-medium text-gray-600 hover:text-primary',
                            {
                                '!border-primary text-primary': tab.id === selectedTab.id,
                            }
                        )}
                        onClick={() => handleChangeTab(tab)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="flex border-b">
                {hide ? (
                    options?.map((option) => (
                        <div
                            key={option.id}
                            className={clsx(
                                'cursor-pointer border-b-2 border-transparent p-3 font-medium text-gray-600 hover:text-primary',
                                {
                                    '!border-primary text-primary': option.id === selectedOption.id,
                                }
                            )}
                            onClick={() => handleChangeOption(option)}
                        >
                            {option.name}
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default TabBar;
