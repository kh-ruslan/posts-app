import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostData } from '@/src/types';
import PostCard from './PostCard';

const PostListItem = (post: PostData) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleClickPost = (postId: number) => () => {
    params.set('postId', postId.toString());

    const updatedRoute = pathname + '?' + params.toString();
    router.push(updatedRoute);
  };

  const isSelected = post.id === Number(params.get('postId'));

  return (
    <li className="mb-8" onClick={handleClickPost(post.id)}>
      <PostCard isSelected={isSelected} {...post} />
    </li>
  );
};

export default PostListItem;
