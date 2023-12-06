import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagInput from '../TagInput';
import { act } from 'react-dom/test-utils';
import { Tag } from '@/src/types';

describe('Tag input', () => {
  const user = userEvent.setup();

  it('should suggest a tag while the user is typing and user can add a suggested value', async () => {
    let value: Tag[] = [];

    const { rerender } = render(
      <TagInput
        onChange={(newValue) => {
          value = newValue;
        }}
        value={value}
      />,
    );

    const tagsInput = screen.getByRole('combobox');
    const tagSuggestion = screen.getByText('Towels');

    await act(async () => {
      await user.type(tagsInput, 't');
      await user.click(tagSuggestion);
    });

    rerender(
      <TagInput
        onChange={(newValue) => {
          value = newValue;
        }}
        value={value}
      />,
    );

    const appliedTag = screen.getByRole('button', { name: 'Towels' });

    expect(appliedTag).toBeInTheDocument();
  });

  it('should allow user to create a custom tag', async () => {
    let value: Tag[] = [];

    const { rerender } = render(
      <TagInput
        onChange={(newValue) => {
          value = newValue;
        }}
        value={value}
      />,
    );

    const tagsInput = screen.getByRole('combobox');
    const tagSuggestion = screen.getByText('custom tag');

    await act(async () => {
      await user.type(tagsInput, 'custom tag');
      await user.click(tagSuggestion);
    });

    rerender(
      <TagInput
        onChange={(newValue) => {
          value = newValue;
        }}
        value={value}
      />,
    );

    const appliedCustomTag = screen.getByRole('button', { name: 'custom tag' });

    expect(appliedCustomTag).toBeInTheDocument();
  });
});
