import React from "react";
import Categories from "../components/Categories";
import FakePizza from "../components/FakePizza";
import PizzaItem from "../components/PizzaItem";
import Sort from "../components/Sort";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { getPageCount, getPagesArray } from "../components/utils/pages.js";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { sortNames } from "../components/Sort";
import {
    setCategory,
    setSort,
    setCurrentPage,
    setFilters,
    selectFilter,
} from "../redux/slices/filterSlice";

import { fetchPizzas, FetchPizzasArgs, selectPizza } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";
const limit = 4;
const a: Record<number, number> = {
    1: 2,
    2: 4,
    3: 2,
    4: 1,
    5: 1,
    0: 12,
};
function Home() {
    const navigate = useNavigate();
    const { activeCategory, activeSort, currentPage, searchValue } =
        useSelector(selectFilter);
        
    
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { items, status } = useSelector(selectPizza);
    const dispatch = useAppDispatch();

    const [totalPages, setTotalPages] = React.useState(0);
    const onClickCategory = (id: number) => {
        dispatch(setCategory(id));
    };
    const onClickSort = (obj: any) => {
        dispatch(setSort(obj));
    };

    const onClickPagination = (obj: number) => {
        dispatch(setCurrentPage(obj));
    };

    let pagesArray = getPagesArray(totalPages);

    const getPizzas = async () => {
        if (activeCategory !== 0) dispatch(setCurrentPage(1));
        setTotalPages(getPageCount(a[activeCategory], limit));

        dispatch(
            fetchPizzas({
                currentPage,
                limit,
                activeCategory,
                searchValue,
                activeSort: activeSort.sortProperty,
                activeOrder: activeSort.order,
            })
        );
    };
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                activeOrder: activeSort.order,
                activeSort: activeSort.sortProperty,
                category: activeCategory,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [activeCategory, activeSort, searchValue, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as FetchPizzasArgs;
            const sort = sortNames.find(
                (obj) =>
                    obj.sortProperty === params.activeSort &&
                    obj.order === params.activeOrder
            );
            

            dispatch(
                setFilters({
                    
                    ...params,
                    activeSort: sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [activeCategory, activeSort, searchValue, currentPage]);

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories
                        activeCategory={activeCategory}
                        onClickCategory={onClickCategory}
                    />
                    <Sort activeSort={activeSort} onClickSort={onClickSort} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === "loading"
                        ? [...new Array(10)].map((_, index) => (
                              <FakePizza key={index} />
                          ))
                        : items.map((pizza: any) => (
                              <PizzaItem key={pizza.id} {...pizza} />
                          ))}
                </div>
            </div>
            <Pagination
                items={pagesArray}
                page={currentPage}
                clickPage={onClickPagination}
            />
        </div>
    );
}

export default Home;
