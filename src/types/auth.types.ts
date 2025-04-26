export  interface AuthResponse {
    statusCode: number;
    body: {
      message: string;
      result: {
        accessToken: string;
        refreshToken: string;
      };
    };
}

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}