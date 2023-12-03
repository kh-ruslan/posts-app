import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Comment from '@/src/components/Comment';
import Loader from '@/src/components/Loader';
import { CommentData } from '@/src/types';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchCommentsSuccess } from '@/lib/redux/features/comments/commentActions';

const Comments: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);

  const searchParams = useSearchParams();
  const selectedPostId = searchParams.get('postId');

  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.comments.comments);

  useEffect(() => {
    setIsFetching(true);

    fetch(
      `https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`,
    )
      .then((response) => response.json())
      .then((comments: CommentData[]) =>
        dispatch(fetchCommentsSuccess(comments)),
      )
      .catch((err) => {
        console.error('Error while fetching comments', err);
      })
      .finally(() => setIsFetching(false));
  }, [selectedPostId]);

  const commentListStyle = `mt-4 pr-4 ${isFetching ? 'blur-sm' : ''}`;

  return (
    <section className="relative">
      <h2>Comments</h2>

      <ul className={commentListStyle}>
        {comments.map((comment) => (
          <li className="mb-8" key={comment.id}>
            <Comment {...comment} />
          </li>
        ))}
      </ul>

      {isFetching && <Loader />}
    </section>
  );
};

export default Comments;
