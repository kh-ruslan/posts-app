import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Post } from '@/src/types';
import PostCard from './PostCard';

interface Props {
  post: Post;
}

const PostListItem: React.FC<Props> = ({ post }) => {
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
      <PostCard isSelected={isSelected} post={post} />
    </li>
  );
};

export default PostListItem;
