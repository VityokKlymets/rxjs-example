import { Home } from './Home';
import { render } from '@testing-library/react';
import { test } from 'vitest';

test('It Should Render', async () => {
  render(<Home />);
});
