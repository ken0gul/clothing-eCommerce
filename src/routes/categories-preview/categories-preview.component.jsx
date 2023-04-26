import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return <CategoryPreview title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
