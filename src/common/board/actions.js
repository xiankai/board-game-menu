export const populate = games => ({
  type: 'POPULATE',
  payload: games,
});

export const error = error => ({
  type: 'ERROR',
  payload: error,
});

export const description = (id, description) => ({
  type: 'DESCRIPTION',
  payload: {
    id,
    description,
  },
});

export const resetDescription = id => ({
  type: 'RESET_DESCRIPTION',
  payload: id,
});
