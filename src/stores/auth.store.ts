import { IUserInfo } from '@/models/interfaces/auth.interface';
import { create } from 'zustand';

interface IAuthStore {
  accessToken?: string;
  actions: {
    initialize: () => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
    setToken: (token: string) => void;
    setUser: (data: IUserInfo) => void;
  };
  isAuthenticated: boolean;
  userInfo?: IUserInfo;
}

const authStore = create<IAuthStore>((set, get) => ({
  accessToken: undefined,

  actions: {
    initialize: async () => {
      const { accessToken, actions, isAuthenticated } = get();
      if (isAuthenticated) return;

      const isLoggedIn = !!accessToken;
      if (!isLoggedIn) return;

      try {
        const response = await apis.auth.me();
        if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

        actions.setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    logout: () => set({ accessToken: undefined, isAuthenticated: false, userInfo: undefined }),

    refreshToken: async (): Promise<boolean> => {
      let result = true;
      const navigate = useNavigate();

      try {
        const response = await apis.auth.refreshToken();
        if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

        set({ accessToken: response.data.accessToken });
      } catch (error) {
        result = false;
        console.error(error);
        await navigate(constants.routePages.AUTH.LOGIN);
      }
      return result;
    },

    setToken: (token: string) => set({ accessToken: token }),

    setUser: (data: IUserInfo) => set({ isAuthenticated: true, userInfo: data }),
  },

  isAuthenticated: false,
  userInfo: undefined,
}));

const useAuthStore = () => {
  const actions = authStore((state) => state.actions);

  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const userInfo = authStore((state) => state.userInfo);
  const accessToken = authStore((state) => state.accessToken);

  return { accessToken, actions, isAuthenticated, userInfo };
};

export default useAuthStore;
