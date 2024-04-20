import { expect, test } from 'bun:test';
import { formatTime, parseTime } from './time';

test('formatTime', () => {
  expect(formatTime(0)).toBe('00:00:00');
  expect(formatTime(1)).toBe('00:00:01');
  expect(formatTime(60)).toBe('00:01:00');
  expect(formatTime(3600)).toBe('01:00:00');
  expect(formatTime(3601)).toBe('01:00:01');
  expect(formatTime(3660)).toBe('01:01:00');
  expect(formatTime(3661)).toBe('01:01:01');
})

test('parseTime', () => {
  expect(parseTime("00:00:00")).toBe(0);
  expect(parseTime("00:00:01")).toBe(1);
  expect(parseTime("00:01:00")).toBe(60);
  expect(parseTime("01:00:00")).toBe(3600);
  expect(parseTime("01:00:01")).toBe(3601);
  expect(parseTime("01:01:00")).toBe(3660);
  expect(parseTime("01:01:01")).toBe(3661);
})
