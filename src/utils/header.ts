import { getDataJSON } from "../services/storage/asyncStorage";


export const getHeader = async () => {
    const user = await getDataJSON('user');
    const jwtToken = user.jwt;
  var header = {
    "Authorization": 'Bearer ' + jwtToken,
  };
  return header;
};
