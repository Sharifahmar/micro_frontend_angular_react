export interface JwtResponseModel {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    expiresInMsec: number
}
