import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination as MuiPagination } from '@mui/material';

interface Props {
  pagesCount?: number;
}

const Pagination: React.FC<Props> = ({ pagesCount }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    params.set('page', value.toString());
    const updatedRoute = pathname + '?' + params.toString();
    router.push(updatedRoute);
  };

  return (
    <MuiPagination
      count={pagesCount}
      page={Number(params.get('page')) || 1}
      variant="outlined"
      shape="rounded"
      onChange={handleChangePage}
    />
  );
};

export default Pagination;
