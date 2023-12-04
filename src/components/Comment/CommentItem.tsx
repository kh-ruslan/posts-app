import React, { memo } from 'react';
import { Card, CardContent, Divider } from '@mui/material';
import { CommentData } from '@/src/types';
import AddReply from './Replies/AddReply';
import AddTags from './Tags/AddTags';
import ReplyItem from './Replies/ReplyItem';
import TagItem from './Tags/TagItem';

interface Props {
  comment: CommentData;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { email, body, replies = [], tags = [] } = comment;

  return (
    <Card variant="outlined">
      <CardContent>
        <h3>{email}</h3>
        <p className="pt-4 pb-1">{body}</p>

        {tags.length > 0 && (
          <div className="flex gap-x-2 mb-4">
            <span>
              <i>Tags:</i>
            </span>

            {tags.map((tag, i) => (
              // Use 'i' as key since tags are faked and has no ids
              <TagItem key={i} tag={tag} />
            ))}
          </div>
        )}

        {replies.length > 0 && (
          <ul className="px-8 my-6">
            {replies.map((reply, i) => (
              // Use 'i' as key since replies are faked and has no ids
              <ReplyItem key={i} reply={reply} />
            ))}
          </ul>
        )}

        <Divider light />

        <AddReply comment={comment} />
        <AddTags comment={comment} />
      </CardContent>
    </Card>
  );
};

export default memo(CommentItem);
