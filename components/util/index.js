export { default as ScrollMixin } from './scrollMixin';

export function formatDate(dateString) {
  if (!dateString) {
    return 'not published';
  }
  return new Date(dateString)
    .toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
}
