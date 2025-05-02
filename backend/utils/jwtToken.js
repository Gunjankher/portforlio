export const generateToken = (user, message, statusCode, res) => {
  const token = user.getJWTToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,           // ✅ for HTTPS (Vercel + Render)
      sameSite: "None",       // ✅ required for cross-origin cookies
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
