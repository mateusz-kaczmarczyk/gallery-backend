export interface JwtDto {
  sub: string
  iss: string
  cognito: string
  origin_jti: string
  aud: string
  event_id: string
  token_use: string
  auth_time: number
  exp: number
  iat: number
  jti: string
  email: string
}
