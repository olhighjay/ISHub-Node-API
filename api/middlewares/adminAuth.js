const jwt = require('jsonwebtoken');
function adminMiddleware(req, res, next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    console.log(req.userData.role);
    if(req.userData.role !== 'admin'){
      return res.status(401).json({
        message: 'You do not have access to this page'
      });
    }
    next();
  }
  catch(error){
    return res.status(401).json({
      message: 'Auth failed. You can\'t access this page except you login'
    });
  }
}

module.exports = adminMiddleware;
