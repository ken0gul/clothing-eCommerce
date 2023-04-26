import DirectoryItem from "../directory-item/directory-item.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl }) => {
        return (
          <DirectoryItem key={id} title={title} id={id} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
};

export default Categories;
