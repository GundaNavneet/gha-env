// @ts-check
// @ts-ignore
import { test, expect } from '@playwright/test';

// @ts-ignore
test('event creation', async ({ request }) => {
  const testTitle = 'Test event';
  const response = await request.post('/', {
    data: {
      title: testTitle,
    },
  });
  expect(response.ok()).toBeTruthy();
  const resDataRaw = await response.body();
  const resData = JSON.parse(resDataRaw.toString());
  expect(resData).toHaveProperty('event.id');
  expect(resData.event.title).toBe(testTitle);
});

// @ts-ignore
test('getting events', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const resDataRaw = await response.body();
  const resData = JSON.parse(resDataRaw.toString());
  expect(resData).toHaveProperty('events');
  expect(resData.events.length).toBeGreaterThan(0);
});
