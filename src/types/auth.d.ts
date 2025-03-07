export interface AuthResponse {
    access_token: string;
    user: {
        email: string;
        username: string;
    };
}