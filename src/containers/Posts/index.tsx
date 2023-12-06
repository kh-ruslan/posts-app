import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loader from '@/src/components/Loader';
import { Post, PostData, UserData } from '@/src/types';
import { fetchUsersSuccess } from '@/lib/redux/features/users/userActions';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchPostsSuccess } from '@/lib/redux/features/posts/postActions';
import PostListItem from '@/src/components/Post/PostListItem';
import SearchInput from '@/src/components/Filters/SearchInput';
import SelectFilter from '@/src/components/Filters/SelectFilter';
import Pagination from '@/src/components/Pagination';

const Posts: React.FC = () => {
  const [pagesCount, setPagesCount] = useState<number>();
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const postList = useAppSelector((state) => state.posts.posts);

  const searchParams = useSearchParams();

  // Search param values
  const postBodyQuery = searchParams.get('postBodyQuery') || '';
  const currentPage = searchParams.get('page') || '1';
  const userIdsQuery = searchParams
    .getAll('userId')
    .map((userId) => ['userId', userId]);

  const postsQuery = new URLSearchParams([
    ...userIdsQuery,
    ['q', postBodyQuery],
    ['_page', currentPage],
    ['_limit', '10'],
  ]).toString();

  // fetch posts
  useEffect(() => {
    setIsFetchingPosts(true);

    fetch(`https://jsonplaceholder.typicode.com/posts?${postsQuery}`)
      .then((res) => {
        // Get total pages count from response headers
        const pagesCount =
          res.headers
            ?.get('Link')
            ?.match(/page=.../g)
            ?.slice(-1)[0]
            ?.match(/\d+/g)?.[0] || 1;

        setPagesCount(Number(pagesCount));

        return res.json();
      })
      .then((posts: PostData[]) => dispatch(fetchPostsSuccess(posts)))
      .catch((err) => {
        console.error('Error while fetching posts', err);
      })
      .finally(() => setIsFetchingPosts(false));
  }, [postsQuery]);

  // fetch users
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((users: UserData[]) => dispatch(fetchUsersSuccess(users)))
      .catch((err) => {
        console.error('Error while fetching users', err);
      });
  }, []);

  const posts: Post[] = useMemo(() => {
    return postList.map((post) => ({
      ...post,
      userName: users.find(({ id }) => id === post.userId)?.username,
    }));
  }, [postList, users]);

  const userOptions = useMemo(
    () => users.map(({ id, username }) => ({ value: id, label: username })),
    [users],
  );

  const postListStyle = `overflow-auto my-4 pr-4 ${
    isFetchingPosts ? 'blur-sm' : ''
  }`;

  return (
    <section className="relative overflow-hidden h-full grid grid-rows-[auto_auto_1fr_40px]">
      <h2>Posts</h2>

      <div className="flex flex-col gap-y-2">
        <SearchInput searchQuery="postBodyQuery" />
        <SelectFilter
          options={userOptions}
          filterQuery="userId"
          label="Search by username"
          placeholder="Enter username"
        />
      </div>

      {posts.length > 0 && (
        <>
          <ul className={postListStyle}>
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </ul>

          <Pagination pagesCount={pagesCount} />
        </>
      )}

      {isFetchingPosts && <Loader />}
    </section>
  );
};

export default Posts;
