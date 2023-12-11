const query = require("../database");

const getUsers = async (req, res) => {
  try {
    const data = await query("select * from users");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createUsers = async (req, res) => {
  const {
    nama,
    email,
    no_hp,
    alamat,
    password,
    about,
    profil,
    background,
    language,
  } = req.body;
  try {
    const { resultId: id } = await query(
      "insert into users(nama, email, no_hp, alamat, password, about, profil, background, language ) values(?,?,?,?,?,?,?,?,?)",
      [
        nama,
        email,
        no_hp,
        alamat,
        password,
        about,
        profil,
        background,
        language,
      ]
    );
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const findUsersById = async (req, res) => {
  const { email } = req.body;

  try {
    const data = await query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data Users ditemukan",
        data: data,
      });
    } else
      res.status(404).json({
        success: false,
        message: "Data Users tidak ditemukan! / Gagal",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateUsers = async (req, res) => {
  const {
    id,
    nama,
    email,
    no_hp,
    alamat,
    password,
    about,
    profil,
    background,
    language,
  } = req.body;
  try {
    const { resultId } = await query(
      "UPDATE users SET  nama=?, email=?, no_hp=?, alamat=?, password=?, about=? , profil=? , background=? , language=? WHERE id=?",
      [
        nama,
        email,
        no_hp,
        alamat,
        password,
        about,
        profil,
        background,
        language,
        id,
      ]
    );
    res.status(200).json({ message: "Data berhasil di edit" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.body;

  try {
    const { resultId } = await query("DELETE FROM users WHERE id = ?", [id]);

    if (resultId !== undefined && resultId === 1) {
      res.status(404).json({ message: "Invalid Data" });
    } else {
      res.status(200).json({ message: "User berhasil dihapus" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  findUsersById,
};
