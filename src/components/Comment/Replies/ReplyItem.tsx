import React, { memo } from 'react';
import { Reply } from '@/src/types';

interface Props {
  reply: Reply;
}

const ReplyItem: React.FC<Props> = ({ reply }) => {
  return (
    <li className="mb-2">
      <h4>{reply.userName}</h4>
      <p>{reply.text}</p>
    </li>
  );
};

export default memo(ReplyItem);
