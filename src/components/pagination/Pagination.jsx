import React from 'react';
import styles from './Pagination.module.css';
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.container}>
            <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} className={styles.button}>
                Previous
            </button>

            <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className={styles.button}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
