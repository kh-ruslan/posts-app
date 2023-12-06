import { render, screen } from '@testing-library/react';
import PostCard from '../PostCard';

const post = {
  id: 1,
  userId: 1,
  userName: 'John',
  title: 'this is post title',
  body: 'this is post body',
};

it('should show post author, title and body', () => {
  render(<PostCard post={post} isSelected={false} />);

  const author = screen.getByText('John');
  const title = screen.getByText('this is post title');
  const body = screen.getByText('this is post body');

  expect(author).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});
