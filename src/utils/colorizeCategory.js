import moment from 'moment';

function colorizeCategory(category) {
    if (!category?.createdAt) {
        return 'hsl(' + 0 + ',' + 65 + '%,' + 65 + '%)';
    }
    const second = moment(category.createdAt).seconds();
    return 'hsl(' + 6 * second + ',' + 65 + '%,' + 65 + '%)';
}

export default colorizeCategory;
