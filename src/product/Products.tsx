import { useState } from "react";
import {
  addProducts,
  editProductItem,
  removeProductById,
} from "../slice/product.slice";
import { useAppDispatch, useAppSelector } from "../store";
import { Product, ProductApiResponse } from "../types/product.type";

const EditProductForm = ({
  product,
  editProduct,
}: {
  product: Product;
  editProduct: (p: Product) => void;
}) => {
  const [productItem, setProductItem] = useState<Product>(product);

  return (
    <div className="flex flex-col">
      <div>
        title:
        <input
          className="border-2"
          type="text"
          defaultValue={productItem?.category || ""}
          onChange={(e) =>
            setProductItem({ ...productItem, category: e.target.value })
          }
        />
      </div>
      <div>
        description:
        <input
          className="border-2"
          type="text"
          defaultValue={productItem?.title || ""}
          onChange={(e) =>
            setProductItem({ ...productItem, title: e.target.value })
          }
        />
      </div>
      <div>
        brand:
        <input
          className="border-2"
          type="text"
          defaultValue={productItem?.brand || ""}
          onChange={(e) =>
            setProductItem({ ...productItem, brand: e.target.value })
          }
        />
      </div>
      <button
        className="bg-green-400 p-2 border-2"
        onClick={() => editProduct(productItem)}
      >
        Update product
      </button>
    </div>
  );
};

const Products = () => {
  const productsList = useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();
  const [editProduct, setEditProduct] = useState<Product>();

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

      {editProduct && (
        <EditProductForm
          product={editProduct}
          editProduct={(_product) => {
            dispatch(editProductItem(_product));
            setEditProduct(undefined);
            alert("Product updated");
          }}
        />
      )}

      <div className="bg-slate-100 space-y-4">
        {productsList.products.map((product) => (
          <div className="flex flex-row space-x-2" key={product.id}>
            <p>
              {product.id}- {product.title} - {product.brand}
            </p>
            <button
              className="bg-green-300"
              onClick={() => setEditProduct(product)}
            >
              Edit
            </button>
            <button
              className="bg-red-300"
              onClick={() => {
                console.log(product.id);
                dispatch(removeProductById(product.id!!));
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
