export interface UserToken {
    access_token: string;
    expires_at: number;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    token_type: string;
}
