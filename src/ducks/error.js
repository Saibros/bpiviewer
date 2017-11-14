export const types = {
  RESET_ERROR_MESSAGE: 'RESET_ERROR_MESSAGE',
};

// reducer - usuniecie ostatnio wyswietlanego komunikatu o bledzie
export default (state = null, action) => {
  const { type, error } = action;

  if (type === types.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

// aktualizacja komunikatu o bledzie
const resetErrorMessage = () => ({
  type: types.RESET_ERROR_MESSAGE,
});

export const actions = {
  resetErrorMessage,
};
