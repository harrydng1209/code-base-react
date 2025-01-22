import type {
  ILoginRequest,
  ILoginResponse,
  IRegister,
  IUserInfo,
} from '@/models/interfaces/auth.interface';

const { AUTH } = constants.routeApis;
const { get, post } = utils.http;

const auth = {
  login: async (data: ILoginRequest) => {
    const url = AUTH.LOGIN;
    return await post<ILoginResponse>(url, data, { withCredentials: true });
  },

  profile: async () => {
    const url = AUTH.PROFILE;
    return await get<IUserInfo>(url);
  },

  refreshToken: async () => {
    const url = AUTH.REFRESH_TOKEN;
    return await post<ILoginResponse>(url, undefined, {
      withCredentials: true,
    });
  },

  register: async (data: IRegister) => {
    const url = AUTH.REGISTER;
    return await post<unknown>(
      url,
      data,
      undefined,
      undefined,
      'Registration successful',
    );
  },
};

export default auth;
