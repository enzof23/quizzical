import { IoIosArrowForward } from "react-icons/io";
import CategoryData from "./CategoryData";

function Categories({ getCategory }) {
  const buttons = CategoryData.map((cat) => {
    return (
      <button key={cat.id} onClick={() => getCategory(cat)}>
        {cat.category}
        <IoIosArrowForward />
      </button>
    );
  });
  return (
    <>
      <h3 className="category-header">Choose a category</h3>
      <div className="categories-container">{buttons}</div>
    </>
  );
}

export default Categories;
