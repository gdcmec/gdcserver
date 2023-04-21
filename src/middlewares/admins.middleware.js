const { verify, decode } = require('jsonwebtoken');

const validateAdminToken = (req, res, next) => {
  //get token from header
  const { access_token } = req.cookies;
  console.log('got validate token request', access_token);
  if (!access_token) {
    console.log('invalid token');

    req.authenticated = false;
    return res.status(401).json({ success: false, message: 'Not authenticated!' });
  }

  try {
    const valid_token = verify(access_token, process.env.SECRET_KEY);
    if (valid_token) {
      console.log('valid token');
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    console.log('invalid token', err);
    req.authenticated = false;
    return res.status(401).json({ success: false, message: 'Not authenticated!' });
  }
};

module.exports = { validateAdminToken };
