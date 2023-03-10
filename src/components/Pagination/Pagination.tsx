import styles from "./pagination.module.scss";

type PaginationProps = { items: Array<number>; page: number; clickPage: (a: number) => void;};

function Pagination({ items, page, clickPage }: PaginationProps) {
    return (
        <div className={styles.root}>
            {items.map((item) => (
                <span
                    onClick={() => clickPage(item)}
                    key={item}
                    className={
                        page === item
                            ? `${styles.item} ${styles.active}`
                            : `${styles.item}`
                    }
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

export default Pagination;
