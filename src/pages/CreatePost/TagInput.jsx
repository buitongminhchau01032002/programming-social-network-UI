import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

function TagInput({ categoryId, formik, formikFieldId, formikFieldName }) {
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
        formik.setFieldValue(formikFieldName, e.target.value);

        // find id from value
        const name = e.target.value;
        const filterResult = tags.filter((tag) => tag.name.includes(name));
        setSearch(filterResult);

        const correctTag = filterResult.find((tag) => tag.name === name);
        if (correctTag) {
            formik.setFieldValue(formikFieldId, correctTag._id);
        } else {
            formik.setFieldValue(formikFieldId, '');
        }
    }

    function handlePanelClick(tag) {
        console.log(tag);
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
                className="peer mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                placeholder="Tag"
            />

            {search.length > 0 && (
                <div className="absolute left-0 right-0 hidden overflow-hidden rounded border shadow group-focus-within:block">
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
