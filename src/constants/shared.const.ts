const shared = {
  API_METHODS: {
    DELETE: 'delete',
    GET: 'get',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put',
  },

  COLORS: {
    BLACK: '#000',
    PRIMARY: '#01c0c8',
    WHITE: '#fff',
  },

  NODE_ENVS: {
    DEVELOP: 'develop',
    PRODUCTION: 'production',
    STAGING: 'staging',
    TESTING: 'testing',
  },

  REGEXES: {
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHABET: /^[a-zA-Z]+$/,
    DATE: /^(19|20)\d\d[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    IP_ADDRESS:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
    URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
    USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
  },

  SELECTORS: {
    LOGIN_BUTTON: 'login-button',
    TEST_BUTTON: 'test-button',
  },

  STATUS_CODES: {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    UNAUTHORIZED: 401,
  },

  STORAGE_KEYS: {
    ACCESS_TOKEN: 'r-access-token',
    LANGUAGE: 'r-language',
    THEME: 'r-theme',
  },
} as const;

export default shared;
