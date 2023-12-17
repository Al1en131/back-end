const query = require("../database");

const getEducation = async (req, res) => {
  try {
    const data = await query("select * from education");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createEducation = async (req, res) => {
  const { tittle, content, image, views, created, modified } = req.body;
  try {
    const { resultId: id } = await query(
      "insert into education (tittle, content, image, views, created, modified ) values(?,?,?,?,?,?)",
      [tittle, content, image, views, created, modified]
    );
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const findEducationById = async (req, res) => {
  const { id } = req.body;

  try {
    const data = await query(`SELECT * FROM education WHERE id = ?`, [id]);

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data Edukasi ditemukan",
        data: data,
      });
    } else
      res.status(404).json({
        success: false,
        message: "Data Edukasi tidak ditemukan! / Gagal",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateEducation = async (req, res) => {
  const { id, tittle, content, image, views, created, modified } = req.body;
  try {
    const { resultId } = await query(
      "UPDATE education SET tittle=?, content=?, image=?, views=?, created=?, modified=?   WHERE id=?",
      [tittle, content, image, views, created, modified, id]
    );
    res.status(200).json({ message: "Data berhasil di update" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteEducation = async (req, res) => {
  const { id } = req.body;

  try {
    const { resultId } = await query("DELETE FROM education WHERE id = ?", [
      id,
    ]);

    if (resultId !== undefined && resultId === 1) {
      res.status(404).json({ message: "Invalid Data" });
    } else {
      res.status(200).json({ message: "Data Edukasi berhasil dihapus" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  findEducationById,
};
