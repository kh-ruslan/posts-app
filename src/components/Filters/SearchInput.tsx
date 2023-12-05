import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TextField } from '@mui/material';
import { useDebounce } from '@/src/hooks/useDebounce';

interface Props {
  searchQuery: string;
}

const SearchInput: React.FC<Props> = ({ searchQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    // Reset selected page and post once filter is applied
    params.delete('page');
    params.delete('postId');

    if (value) {
      params.set(searchQuery, value);
    } else {
      params.delete(searchQuery);
    }

    const updatedRoute = pathname + '?' + params.toString();
    router.push(updatedRoute);
  };

  const debouncedHandleChange = useDebounce(handleChange);

  return (
    <TextField
      sx={{ input: { backgroundColor: '#fff' } }}
      label="Search by post text"
      type="search"
      fullWidth
      defaultValue={params.get(searchQuery)}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        debouncedHandleChange(event.target.value)
      }
    />
  );
};

export default SearchInput;
