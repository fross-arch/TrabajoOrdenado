import jwt from 'jsonwebtoken'

function jwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('JWT_SECRET debe configurarse con al menos 32 caracteres.')
  }
  return secret
}

export default function requireAuth(req, res, next) {
  const authorization = req.get('authorization')
  const match = authorization?.match(/^Bearer\s+(.+)$/i)
  if (!match) {
    return res.status(401).json({ error: { message: 'Se requiere un token Bearer válido.' } })
  }

  try {
    const payload = jwt.verify(match[1], jwtSecret())
    if (typeof payload !== 'object' || typeof payload.sub !== 'string') {
      return res.status(401).json({ error: { message: 'El token no es válido.' } })
    }
    req.auth = { userId: payload.sub }
    return next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: { message: 'El token no es válido o ha expirado.' } })
    }
    return next(error)
  }
}
