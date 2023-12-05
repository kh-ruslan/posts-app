import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Autocomplete, TextField } from '@mui/material';

type Option = {
  label: string;
  value: number | string;
};

interface Props {
  options: Option[];
  filterQuery: string;
  label?: string;
  placeholder?: string;
}

const SelectFilter: React.FC<Props> = ({
  filterQuery,
  options,
  label,
  placeholder,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleChange = (value: Option[]) => {
    // Reset selected page and post once filter is applied
    params.delete('page');
    params.delete('postId');

    params.delete(filterQuery);

    let updatedRoute = pathname + '?' + params.toString();

    if (value.length > 0) {
      const queryString = value
        .map((option) => `${filterQuery}=${option.value}`)
        .join('&');

      updatedRoute = updatedRoute + '&' + queryString;
    }

    router.push(updatedRoute);
  };

  const value = options.filter((option) =>
    params.getAll(filterQuery).includes(option.value.toString()),
  );

  return (
    <Autocomplete
      sx={{ backgroundColor: '#fff' }}
      multiple
      fullWidth
      value={value}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(_event, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default SelectFilter;
