import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CommentData, Tag } from '@/src/types';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateCommentSuccess } from '@/lib/redux/features/comments/commentActions';
import TagInput from './TagInput';

interface Props {
  comment: CommentData;
}

const AddTags: React.FC<Props> = ({ comment }) => {
  const { id } = comment;

  const [value, setValue] = React.useState<Tag[]>([]);
  const [showTagsInput, setShowTagsInput] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmitReply = () => {
    setIsUpdating(true);

    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        tags: value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedComment = {
          ...comment,
          tags: res.tags,
        };

        dispatch(updateCommentSuccess(updatedComment));
      })
      .catch((err) => {
        console.error('Error while updating comment', err);
      })
      .finally(() => {
        setShowTagsInput(false);
        setIsUpdating(false);
      });
  };

  const handleClickTags = () => setShowTagsInput(!showTagsInput);

  return (
    <div className="my-4">
      <Button variant="text" onClick={handleClickTags}>
        Tags
      </Button>

      {showTagsInput && (
        <>
          <TagInput value={value} onChange={(newValue) => setValue(newValue)} />

          <Button
            disabled={isUpdating}
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

export default AddTags;
