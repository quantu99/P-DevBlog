import Image from 'next/image';
import styles from './page.module.css';
import Introduce from '@/components/introduce/Introduce';
import Categories from '@/components/categories/Categories';
import PostList from '@/components/postList/PostList';

export default function Home({ searchParams }) {
    return (
        <div className={styles.container}>
            <Introduce />
            <Categories />
            <PostList />
        </div>
    );
}
