import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store";
import productSlice, {
  addProducts,
  removeProductById,
} from "../slice/product.slice";
import { ProductApiResponse } from "../types/product.type";

const Products = () => {
  const productsList = useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();

  const getPoducts = async () => {
    const response = (await fetch("https://dummyjson.com/products").then(
      (response) => response.json()
    )) as ProductApiResponse;
    dispatch(addProducts(response.products));
    // update the state
  };

  return (
    <div>
      <button className="bg-green-400 p-3" onClick={getPoducts}>
        Fetch Products
      </button>

      <div className="bg-slate-100 space-y-4">
        {productsList.products.map((product) => (
          <div className="flex flex-row space-x-2" key={product.id}>
            <p>
              {product.id}- {product.title} - {product.brand}
            </p>
            <button className="bg-green-300">Edit</button>
            <button
              className="bg-red-300"
              onClick={() => {
                console.log(product.id);
                dispatch(removeProductById(product.id));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
