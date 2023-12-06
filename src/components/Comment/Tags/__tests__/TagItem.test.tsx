import { render, screen } from '@testing-library/react';
import TagItem from '../TagItem';

it('should show tag title', () => {
  render(<TagItem tag={{ title: 'testTag' }} />);

  const tag = screen.getByText('testTag');

  expect(tag).toBeInTheDocument();
});
