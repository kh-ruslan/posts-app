import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { CommentData } from '@/src/types';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateCommentSuccess } from '@/lib/redux/features/comments/commentActions';

interface Props {
  comment: CommentData;
}

const AddReply: React.FC<Props> = ({ comment }) => {
  const { id, replies = [] } = comment;

  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmitReply = () => {
    setIsUpdating(true);

    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        reply: {
          userName: 'Me',
          text: replyText,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedComment = {
          ...comment,
          replies: [...replies, res.reply],
        };

        dispatch(updateCommentSuccess(updatedComment));
      })
      .catch((err) => {
        console.error('Error while updating comment', err);
      })
      .finally(() => {
        setReplyText('');
        setShowReplyInput(false);
        setIsUpdating(false);
      });
  };

  const handleClickReply = () => {
    if (showReplyInput) {
      setShowReplyInput(false);
      setReplyText('');
    } else {
      setShowReplyInput(true);
    }
  };

  return (
    <div className="my-4">
      <Button variant="text" onClick={handleClickReply}>
        Reply
      </Button>

      {showReplyInput && (
        <>
          <TextField
            autoFocus
            sx={{ margin: '16px 0' }}
            fullWidth
            variant="standard"
            placeholder="Enter reply"
            value={replyText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setReplyText(event.target.value)
            }
          />

          <Button
            disabled={!replyText || isUpdating}
            variant="contained"
            onClick={handleSubmitReply}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default AddReply;
