import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

function Search() {
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };
    const updateSearchValue = React.useCallback(
        debounce((value: string) => {
            dispatch(setSearchValue(value));
        }, 1000),
        []
    );
    return (
        <input
            placeholder="Поиск..."
            className={styles.root}
            value={value}
            onChange={(e) => onChangeInput(e)}
        />
    );
}

export default Search;
