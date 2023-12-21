const query = require("../../database/index.js");
// const { randomUUID, sign } = require("crypto");
const bcryptjs = require("bcryptjs");
const {
  jwt,
  jwtSecret,
  jwtAlgorithm,
  jwtExpiresIn,
} = require("./JwtConfig.js");

const { compare } = bcryptjs;

const signToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, {
    algorithm: jwtAlgorithm,
    expiresIn: jwtExpiresIn,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === undefined ||
    email === "" ||
    password === undefined ||
    password === ""
  ) {
    return res.status(400).json({
      status: "Gagal",
      message: "Error Validasi",
      error: "Data tidak valid!",
    });
  }

  try {
    const user = await query("SELECT * FROM users WHERE email = ?", [email]);
    console.log(user);

    if (user.length === 0) {
      return res.status(401).json({
        status: "Gagal",
        message: "Error Login",
        error: "Email atau password salah!",
      });
    }

    const isPasswordMatch = await compare(password, user[0].password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: "Gagal",
        message: "Error Login",
        error: "Email atau password salah!",
      });
    }

    const token = signToken(user[0].id);

    return res.status(200).json({
      status: "Berhasil",
      message: "Login Berhasil",
      token,
      data: {
        id: user[0].id,
        email: user[0].email,
        nama: user[0].nama,
        no_hp: user[0].no_hp,
        alamat: user[0].alamat,
        about: user[0].about,
        profile: user[0].profile,
        backgroud: user[0].backgroud,
        language: user[0].language,
        headline: user[0].headline,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "Gagal",
      message: "Gagal Login",
      error: "Login gagal!",
    });
  }
};

module.exports = {
  login,
};
