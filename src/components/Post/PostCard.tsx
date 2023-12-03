import React, { memo } from 'react';
import { Post } from '@/src/types';
import { Card, CardContent } from '@mui/material';

const PostCard: React.FC<Post> = ({ title, body, userName, isSelected }) => {
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
