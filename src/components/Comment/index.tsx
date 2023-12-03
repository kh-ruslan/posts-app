import React, { memo } from 'react';
import { CommentData } from '@/src/types';
import { Card, CardContent } from '@mui/material';

const Comment: React.FC<CommentData> = ({ email, body }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <h3>{email}</h3>
        <p className="py-4">{body}</p>
      </CardContent>
    </Card>
  );
};

export default memo(Comment);
