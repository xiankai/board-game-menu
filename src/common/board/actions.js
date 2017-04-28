export const populate = games => ({
  type: 'POPULATE',
  payload: games,
});

export const error = error => ({
  type: 'ERROR',
  payload: error,
});
