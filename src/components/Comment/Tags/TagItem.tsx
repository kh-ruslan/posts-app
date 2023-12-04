import React, { memo } from 'react';
import { Chip } from '@mui/material';
import { Tag } from '@/src/types';

interface Props {
  tag: Tag;
}

const TagItem: React.FC<Props> = ({ tag }) => {
  return (
    <Chip
      sx={{
        backgroundColor: '#e8def8',
        borderRadius: '8px',
        height: 24,
      }}
      label={tag.title}
    />
  );
};

export default memo(TagItem);
