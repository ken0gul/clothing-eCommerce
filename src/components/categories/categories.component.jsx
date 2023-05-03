import DirectoryItem from "../directory-item/directory-item.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl, route }) => {
        return (
          <DirectoryItem
            key={id}
            title={title}
            id={id}
            imageUrl={imageUrl}
            route={route}
          />
        );
      })}
    </div>
  );
};

export default Categories;
