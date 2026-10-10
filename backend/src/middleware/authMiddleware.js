/**
 * Authentication & Tenant Isolation Middleware
 */

export function authMiddleware(req, res, next) {
  // In development / demo mode, defaults to primary admin tenant
  req.user = {
    id: 'usr_admin_01',
    email: 'admin@affilimatrix.ai',
    role: 'admin',
    workspaceId: 'ws_default',
    plan: 'pro'
  };
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Unauthorized role.' });
    }
    next();
  };
}
