import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { Providers } from '@/lib/providers';
import { Post, UserData } from '@/src/types';
import Posts from './';

const posts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Post#1',
    body: 'this is post #1 body',
  },
  {
    id: 2,
    userId: 2,
    title: 'Post#2',
    body: 'this is post #2 body',
  },
];

type TestUser = Pick<UserData, 'username' | 'id'>;

const users: TestUser[] = [
  {
    id: 1,
    username: 'John',
  },
  {
    id: 2,
    username: 'Mary',
  },
];

const makeFetchResp = (value: Post[] | TestUser[]) =>
  Promise.resolve({
    json: () => Promise.resolve(value),
  });

const mockFetch = jest
  .fn()
  .mockReturnValueOnce(makeFetchResp(posts))
  .mockReturnValueOnce(makeFetchResp(users));

global.fetch = mockFetch;

jest.mock('next/navigation');

const getMock = jest.fn();
const getAllMock = jest.fn();
getAllMock.mockReturnValue([]);

(useSearchParams as jest.Mock).mockReturnValue({
  getAll: getAllMock,
  get: getMock,
});

describe('Posts', () => {
  it('should show post list', async () => {
    const { getByText } = render(
      <Providers>
        <Posts />
      </Providers>,
    );

    // Firstly fetch 'posts', secondary fetch 'users'
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    const firstPostTitle = getByText('Post#1');
    const firstPostBody = getByText('this is post #1 body');
    const firstPostAuthor = getByText('John');

    const secondPostTitle = getByText('Post#2');
    const secondPostBody = getByText('this is post #2 body');
    const secondPostAuthor = getByText('Mary');

    expect(firstPostTitle).toBeInTheDocument();
    expect(firstPostBody).toBeInTheDocument();
    expect(firstPostAuthor).toBeInTheDocument();
    expect(secondPostTitle).toBeInTheDocument();
    expect(secondPostBody).toBeInTheDocument();
    expect(secondPostAuthor).toBeInTheDocument();
  });
});
