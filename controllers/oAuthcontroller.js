const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user.model');
const generateToken = require('../util/utils.js');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: "Google token required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub: googleId, email } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = await User.create({ email, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const jwtToken = generateToken(user._id);

    const { password: pw, googleId: gid, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({ success: true, data: userWithoutPassword, token: jwtToken });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};
