// Session duration constants
export const SESSION_DURATIONS = {
  SHORT: 60 * 60 * 2,        // 2 hours (when "Remember Me" is NOT checked)
  LONG: 60 * 60 * 24 * 30    // 30 days (when "Remember Me" IS checked)
}

export function getSessionMaxAge(rememberMe) {
  return rememberMe ? SESSION_DURATIONS.LONG : SESSION_DURATIONS.SHORT
}