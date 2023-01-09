import colorizeCategory from '../../utils/colorizeCategory';

function CategoryBadge({ category }) {
    return (
        <div style={{ background: colorizeCategory(category) }} className="inline-block rounded-md px-3 pb-0.5 text-sm text-white">
            {category?.name}
        </div>
    );
}

export default CategoryBadge;
