import React from 'react';
import styles from './CommentPagination.module.css';
const CommentPagination = ({ commentsPerPage, totalComments, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalComments / commentsPerPage);
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

export default CommentPagination;
