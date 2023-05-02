import React from "react";

import {
  Skeleton,
  PizzaBlock,
  Sort,
  Categories,
  Pagination,
} from "../components";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useRef } from "react";

import { useAppDispatch } from "../redux/store";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizzas/asyncActions";
import { selectFilter, selectPizza } from "../redux/pizzas/selectors";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector(selectPizza);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };
  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort.sortProperty, currentPage]);
  //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     );
  //     isMounted.current = true;
  //   }
  // }, []);
  //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas =
    items &&
    items.filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue?.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title ">Все пиццы</h2>
        {status === "error" ? (
          <div className="сontent__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>
              не удалось получить питсы. Попробуйте повторить попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading"
              ? skeleton
              : pizzas &&
                items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
export default Home;
