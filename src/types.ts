export interface IJwtTokenObj {
  exp: number;
  iat: number;
  [key: string]: any;
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface IRouteConfig {
  path: string;
  component: React.ComponentType;
  /**
   * 是否需要登录才能访问，默认不需要登录
   */
  needLogin?: boolean;
  routes?: IRouteConfig[];
}
