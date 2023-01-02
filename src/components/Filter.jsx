import React, { useState, useEffect } from "react";
import filterSearch from "../server_utils/filterSearch";
import { getData } from "../server_utils/fetchData";
import { useRouter } from "next/router";

const Filter = ({
  state,
  cat = null,
  sortDefault = null,
  hideFilter = false,
}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(
    sortDefault ? sortDefault : router?.query?.sort ? router?.query?.sort : ""
  );

  const { categories } = state;

  const router = useRouter();
  const [category, setCategory] = useState(
    cat
      ? cat.toString()
      : router?.query?.category
      ? router?.query?.category
      : ""
  );

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div
      className={`input-group d-flex justify-content-between container ${
        hideFilter ? "hide" : ""
      }`}
    >
      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={category}
          onChange={handleCategory}
        >
          <option value="all">All Products</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group-prepend col-md-2 px-0 mt-2">
        <select
          className="custom-select text-capitalize"
          value={sort}
          onChange={handleSort}
        >
          <option value="-createdAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: Hight-Low</option>
          <option value="price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
