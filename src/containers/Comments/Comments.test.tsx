import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import Comments from './';
import { Providers } from '@/lib/providers';
import { CommentData } from '@/src/types';
import userEvent from '@testing-library/user-event';

const comments: CommentData[] = [
  {
    id: 1,
    postId: 1,
    name: 'Comment#1',
    email: 'qwerty@gmail.com',
    body: 'this is comment #1',
    replies: [
      {
        userName: 'John',
        text: 'reply text',
      },
    ],
    tags: [
      {
        title: 'tag#1',
      },
    ],
  },
  {
    id: 2,
    postId: 1,
    name: 'Comment#2',
    email: 'qwerty1@gmail.com',
    body: 'this is comment #2',
    replies: [
      {
        userName: 'Mary',
        text: 'reply text 2',
      },
    ],
    tags: [
      {
        title: 'tag#2',
      },
    ],
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(comments),
  }),
) as jest.Mock;

jest.mock('next/navigation');

const getMock = jest.fn();
getMock.mockReturnValue({ postId: 1 });

(useSearchParams as jest.Mock).mockReturnValue({
  get: getMock,
});

describe('Comments', () => {
  it('should show selected post comments including replies and tags', async () => {
    render(
      <Providers>
        <Comments />
      </Providers>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const firstCommentAuthor = screen.getByText('qwerty@gmail.com');
    const firstCommentBodyText = screen.getByText('this is comment #1');
    const firstCommentReplyAuthor = screen.getByText('John');
    const firstCommentReplyText = screen.getByText('reply text');
    const firstCommentTag = screen.getByText('tag#1');

    const secondCommentAuthor = screen.getByText('qwerty1@gmail.com');
    const secondCommentBodyText = screen.getByText('this is comment #2');
    const secondCommentReplyAuthor = screen.getByText('Mary');
    const secondCommentReplyText = screen.getByText('reply text 2');
    const secondCommentTag = screen.getByText('tag#2');

    expect(firstCommentAuthor).toBeInTheDocument();
    expect(firstCommentBodyText).toBeInTheDocument();
    expect(firstCommentReplyAuthor).toBeInTheDocument();
    expect(firstCommentReplyText).toBeInTheDocument();
    expect(firstCommentTag).toBeInTheDocument();
    expect(secondCommentAuthor).toBeInTheDocument();
    expect(secondCommentBodyText).toBeInTheDocument();
    expect(secondCommentReplyAuthor).toBeInTheDocument();
    expect(secondCommentReplyText).toBeInTheDocument();
    expect(secondCommentTag).toBeInTheDocument();
  });

  it('should allow to add a reply to the comment', async () => {
    const replyText = 'this is reply';

    const user = userEvent.setup();

    render(
      <Providers>
        <Comments />
      </Providers>,
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ reply: { text: replyText, userName: 'Me' } }),
      }),
    ) as jest.Mock;

    const replyBtn = screen.getAllByRole('button', { name: 'Reply' })[0];
    await user.click(replyBtn);
    const replyInput = screen.getByPlaceholderText('Enter reply');
    await user.type(replyInput, replyText);
    const submitReplyBtn = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitReplyBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const reply = screen.getByText(replyText);
    const replyAuthor = screen.getByText('Me');
    expect(reply).toBeInTheDocument();
    expect(replyAuthor).toBeInTheDocument();
  });
});
