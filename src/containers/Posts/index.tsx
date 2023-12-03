import React, { useEffect, useMemo, useState } from 'react';
import { Pagination } from '@mui/material';
import Loader from '@/src/components/Loader';
import { Post, PostData, UserData } from '@/src/types';
import { fetchUsersSuccess } from '@/lib/redux/features/users/userActions';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPostsSuccess } from '@/lib/redux/features/posts/postActions';
import PostListItem from '@/src/components/Post/PostListItem';

const Posts: React.FC = () => {
  const [pagesCount, setPagesCount] = useState<number>();
  const [page, setPage] = useState(1);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const postList = useAppSelector((state) => state.posts.posts);

  // fetch users
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((users: UserData[]) => dispatch(fetchUsersSuccess(users)))
      .catch((err) => {
        console.error('Error while fetching users', err);
      });
  }, []);

  // fetch posts
  useEffect(() => {
    setIsFetchingPosts(true);

    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((res) => {
        // Get total pages count from response headers
        const pagesCount = res.headers
          .get('Link')
          ?.match(/page=../g)
          ?.slice(-1)[0]
          ?.match(/\d+/g)?.[0];

        if (pagesCount) {
          setPagesCount(Number(pagesCount));
        }

        return res.json();
      })
      .then((posts: PostData[]) => dispatch(fetchPostsSuccess(posts)))
      .catch((err) => {
        console.error('Error while fetching posts', err);
      })
      .finally(() => setIsFetchingPosts(false));
  }, [page]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const posts: Post[] = useMemo(() => {
    return postList.map((post) => ({
      ...post,
      userName: users.find(({ id }) => id === post.userId)?.username,
    }));
  }, [postList, users]);

  const postListStyle = `overflow-auto h-full my-4 pr-4 ${
    isFetchingPosts ? 'blur-sm' : ''
  }`;

  return (
    <section className="relative overflow-hidden h-full pb-24">
      <h2>Posts</h2>

      {posts.length > 0 && (
        <>
          <ul className={postListStyle}>
            {posts.map((post) => (
              <PostListItem key={post.id} {...post} />
            ))}
          </ul>

          <Pagination
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </>
      )}

      {isFetchingPosts && <Loader />}
    </section>
  );
};

export default Posts;
