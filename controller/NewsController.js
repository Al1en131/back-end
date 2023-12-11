const query = require("../database");

const getNews = async (req, res) => {
  try {
    const data = await query("select * from news");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createNews = async (req, res) => {
  const { judul, tanggal, deskripsi, image } = req.body;
  try {
    const { resultId: id } = await query(
      "insert into news(judul, tanggal, deskripsi, image ) values(?,?,?,?)",
      [judul, tanggal, deskripsi, image]
    );
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const findNewsById = async (req, res) => {
  const { id } = req.body;

  try {
    const data = await query(`SELECT * FROM news WHERE id = ?`, [id]);

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data News ditemukan",
        data: data,
      });
    } else
      res.status(404).json({
        success: false,
        message: "Data News tidak ditemukan! / Gagal",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateNews = async (req, res) => {
  const { id, judul, tanggal, deskripsi, image } = req.body;
  try {
    const { resultId } = await query(
      "UPDATE news SET judul=?, tanggal=?, deskripsi=?, image=? WHERE id=?",
      [judul, tanggal, deskripsi, image, id]
    );
    res.status(200).json({ message: "Data berhasil di update" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.body;

  try {
    const { resultId } = await query("DELETE FROM news WHERE id = ?", [id]);

    if (resultId !== undefined && resultId === 1) {
      res.status(404).json({ message: "Invalid Data" });
    } else {
      res.status(200).json({ message: "Data News berhasil dihapus" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  findNewsById,
};
