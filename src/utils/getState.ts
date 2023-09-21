export const getState = (state: any, stateName: string) => {
  switch (stateName) {
    case 'LoginSlice':
      return state.LoginSlice;
    case 'RegisterSlice':
      return state.cart;
    case 'NewsSlice':
      return state.product;
    case 'UserSlice':
      return state.UserSlice;
    case 'PaginationSlice':
          return state.PaginationSlice;
      case 'SearchTrending':
            return state.PaginationSlice;
    default:
      return state.user;
  }
};
export const stateEnums = {
    LoginSlice: 'LoginSlice',
    RegisterSlice: 'RegisterSlice',
    NewsSlice: 'NewsSlice',
    UserSlice: 'UserSlice',
    PaginationSlice: 'PaginationSlice',
    SearchTrending: 'SearchTrending',
};