import { render, screen } from '@testing-library/react';
import App from './App';

test('renders schedule', () => {
  render(<App />);
  const scheduleComp = screen.getByText(/Hogwarts Today's Schedule/i);
  expect(scheduleComp).toBeInTheDocument();
});
