import React from "react";
import ProductRow from "./ProductRow";

const ProductList = ({ form, products, removeHandler }) => {
  return products.map((product, index) => (
    <ProductRow
      key={product.id}
      form={form}
      product={product}
      productIndex={index}
      removeHandler={removeHandler}
    />
  ));
};

export default ProductList;
