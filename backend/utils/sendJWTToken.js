const jsonwebToken = require("jsonwebtoken");

const gernateJWTtoken = (user, statusCode, res) => {
  const token = user.gernateJWTtoken();
  // console.log(token);
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  
  let isHod = false;

  if(res.isHod){
    isHod = res.isHod
  }
  delete res.isHod;
  // if(res.isHod){
    // user = {...user , isHod : res.isHod}
    // }
    // console.log(isHod);
    
  res.status(statusCode).cookie("token", token, options).json({
    sucess: true,
    message: "SuccessFully Login",
    user,
    isHod,
    token,
  });
};

module.exports = gernateJWTtoken;
