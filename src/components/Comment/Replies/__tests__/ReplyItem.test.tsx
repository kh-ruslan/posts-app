import { render, screen } from '@testing-library/react';
import ReplyItem from '../ReplyItem';

it('should show reply author and text', () => {
  render(<ReplyItem reply={{ userName: 'John', text: 'this is reply' }} />);

  const username = screen.getByText('John');
  const replyText = screen.getByText('this is reply');

  expect(username).toBeInTheDocument();
  expect(replyText).toBeInTheDocument();
});
