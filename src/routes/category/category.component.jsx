import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer } from "./category.styles";

const Category = () => {
  const { categories } = useContext(CategoriesContext);
  const { category } = useParams();

  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    console.log(categories);
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <h2 className="title">{category.toLocaleUpperCase()}</h2>
      <CategoryContainer className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard
              product={product}
              title={product.title}
              key={product.id}
            />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
