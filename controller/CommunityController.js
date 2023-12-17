const query = require("../database");

const getCommunity = async (req, res) => {
  try {
    const data = await query("select * from activity");
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createCommunity = async (req, res) => {
  const { tittle, content, map, image, date, time, created, modified } =
    req.body;
  try {
    const { resultId: id } = await query(
      "insert into activity (tittle, content, map, image, date, time, created, modified ) values(?,?,?,?,?,?,?,?)",
      [tittle, content, map, image, date, time, created, modified]
    );
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const findCommunityById = async (req, res) => {
  const { id } = req.body;

  try {
    const data = await query(`SELECT * FROM activity WHERE id = ?`, [id]);

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data activity ditemukan",
        data: data,
      });
    } else
      res.status(404).json({
        success: false,
        message: "Data activity tidak ditemukan! / Gagal",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateCommunity = async (req, res) => {
  const { id, tittle, content, map, image, date, time, created, modified } =
    req.body;
  try {
    const { resultId } = await query(
      "UPDATE activity SET tittle=?, content=?, map=?, image=?, date=?, time=?, created=?, modified=?  WHERE id=?",
      [tittle, content, map, image, date, time, created, modified, id]
    );
    res.status(200).json({ message: "Data berhasil di update" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteCommunity = async (req, res) => {
  const { id } = req.body;

  try {
    const { resultId } = await query("DELETE FROM activity WHERE id = ?", [id]);

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
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  findCommunityById,
};
