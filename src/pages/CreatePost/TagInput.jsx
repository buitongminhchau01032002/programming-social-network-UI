import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

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

function TagInput({ categoryId, formik, formikFieldId, formikFieldName, className }) {
    const [tags, setTags] = useState([]);

    const inputRef = useRef(null);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        if (!categoryId) {
            return;
        }
        fetch('http://localhost:8080/api/' + categoryId + '/tags')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error) {
                    setTags([]);
                    return;
                }
                setTags(resJson.tags);
                const filterResult = resJson.tags.filter((tag) => tag.name.includes(inputRef.current.value));
                setSearch(filterResult);
            })
            .catch((error) => {
                console.log(error);
                setTags([]);
            });
    }, [categoryId]);

    function handleChange(e) {
        const name = e.target.value;
        // find id from value
        const filterResult = tags.filter((tag) => stringToSlug(tag.name).includes(stringToSlug(name)));
        setSearch(filterResult);

        const correctTag = filterResult.find((tag) => tag.name === name);
        if (correctTag) {
            formik.setFieldValue(formikFieldId, correctTag._id);
        } else {
            formik.setFieldValue(formikFieldId, '');
        }

        formik.setFieldValue(formikFieldName, name);
    }

    function handleBlur(e) {
        formik.setTouched({ ...formik.touched, [formikFieldName]: true });
    }

    function handlePanelClick(tag) {
        formik.setFieldValue(formikFieldId, tag._id);
        formik.setFieldValue(formikFieldName, tag.name);
    }

    return (
        <div className="group relative">
            <input
                ref={inputRef}
                type="text"
                value={formik.values[formikFieldName]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={className}
                placeholder="Tìm hoặc tạo tag mới"
            />
            <div
                className={clsx('absolute right-3 top-3 text-sm font-medium text-primary-dark', {
                    hidden: formik.values[formikFieldId] || !formik.values[formikFieldName],
                })}
            >
                Mới
            </div>

            {search.length > 0 && (
                <div className="absolute left-0 right-0 hidden overflow-hidden rounded border bg-white shadow group-focus-within:block">
                    {search.map((tag) => (
                        <button
                            key={tag._id}
                            type="button"
                            className={clsx('w-full border-t py-1 hover:text-primary', {
                                'bg-primary !text-white': formik.values[formikFieldId] === tag._id,
                            })}
                            onClick={() => handlePanelClick(tag)}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
export default TagInput;
