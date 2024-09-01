// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="email"]').click();
  await page.getByText('Email:').click();
  await page.getByText('Password:').click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('faculty@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: '🔓' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('stud@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Dashboard', { exact: true }).click();
  await page.getByText('All Courses').click();
  await page.getByText('Course Structure').click();
});