export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const days = parseInt(process.env.COOKIE_EXPIRE || "7", 10); // default to 7 days

  console.log("COOKIE_EXPIRE:", process.env.COOKIE_EXPIRE);


  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
