function CategoryNav({ categories, activeCategory, onChangeCategory }) {
  return (
    <div className="mb-4">
      <ul className="nav nav-pills justify-content-center">
        {/* 全部 */}
        <li className="nav-item">
          <a
            className={`nav-link ${activeCategory === "" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChangeCategory(""); // 傳回空字串代表「全部」
            }}
          >
            全部
          </a>
        </li>

        {/* 其他 */}
        {categories.map((category) => (
          <li className="nav-item" key={category}>
            <a
              className={`nav-link ${activeCategory === category ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onChangeCategory(category);
              }}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoryNav;
