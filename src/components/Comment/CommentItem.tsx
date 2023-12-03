import React, { memo, useState } from 'react';
import { CommentData } from '@/src/types';
import { Card, CardContent } from '@mui/material';
import ReplySection from './ReplySection';

interface Props {
  comment: CommentData;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { email, body, replies = [] } = comment;

  return (
    <Card variant="outlined">
      <CardContent>
        <h3>{email}</h3>
        <p className="py-4">{body}</p>

        {replies.length > 0 && (
          <ul className="px-8 mb-6">
            {replies.map(({ userName, text }, i) => (
              // Use 'i' as key since replies are faked and has no ids
              <li key={i} className="mb-2">
                <h4>{userName}</h4>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        )}

        <ReplySection comment={comment} />
      </CardContent>
    </Card>
  );
};

export default memo(CommentItem);
