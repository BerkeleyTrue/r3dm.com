const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export { default as ScrollMixin } from './scrollMixin';

export function formatDate(dateString) {
  if (!dateString) {
    return 'not published';
  }
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${ month } ${ day }, ${ year }`;
}
