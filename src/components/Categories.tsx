type CategoriesProps = {
    activeCategory: number;
    onClickCategory: (a: number) => void;
};
function Categories({ activeCategory, onClickCategory }: CategoriesProps) {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={category}
                        className={activeCategory === index ? "active" : ""}
                        onClick={() => onClickCategory(index)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
