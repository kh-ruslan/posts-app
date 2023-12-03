import React, { memo } from 'react';
import { Post } from '@/src/types';
import { Card, CardContent } from '@mui/material';

interface Props {
  post: Post;
  isSelected: boolean;
}

const PostCard: React.FC<Props> = ({ post, isSelected }) => {
  const { title, body, userName } = post;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        backgroundColor: isSelected ? '#dbeafe' : '#fff',
      }}
    >
      <CardContent>
        <h3>{title}</h3>
        <p className="py-4">{body}</p>
        {userName && (
          <p>
            <i>{userName}</i>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(PostCard);
