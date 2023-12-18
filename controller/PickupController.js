const query = require("../database");

const getPickups = async (req, res) => {
  try {
    const { id: pickupId } = req.params;

    let queryStr = "SELECT * FROM pickup";

    if (pickupId) {
      queryStr += " WHERE id = ?";
    }

    const data = await query(queryStr, [pickupId]);

    if (!data.length && pickupId) {
      return res
        .status(404)
        .json({ success: false, message: "Data pickup tidak ditemukan" });
    }

    const pickupsWithBase64 = data.map((pickup) => {
      pickup.images = pickup.images
        ? `data:image/jpeg;base64,${pickup.images.toString("base64")}`
        : null;
      return pickup;
    });

    return res.status(200).json({
      success: true,
      message: "Pickup data ditemukan",
      data: pickupsWithBase64,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

const createPickup = async (req, res) => {
  const {
    images,
    no_hp,
    alamat_penjemputan,
    id_user,
    tggl_penjemputan,
    waktu,
    informasi,
  } = req.body;
  try {
    const { resultId: id } = await query(
      "INSERT INTO pickup(images, no_hp, alamat_penjemputan, id_user, tggl_penjemputan, waktu, informasi) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        images,
        no_hp,
        alamat_penjemputan,
        id_user,
        tggl_penjemputan,
        waktu,
        informasi,
      ]
    );
    res.status(200).json({
      success: true,
      message: "Pickup berhasil dibuat",
      id,
      ...req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error });
  }
};

const updatePickup = async (req, res) => {
  const {
    id,
    images,
    no_hp,
    alamat_penjemputan,
    id_user,
    tggl_penjemputan,
    waktu,
    informasi,
  } = req.body;
  try {
    const { resultId } = await query(
      "UPDATE pickup SET images=?, no_hp=?, alamat_penjemputan=?, id_user=?, tggl_penjemputan=?, waktu=?, informasi=? WHERE id=?",
      [
        images,
        no_hp,
        alamat_penjemputan,
        id_user,
        tggl_penjemputan,
        waktu,
        informasi,
        id,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: "Data pickup berhasil di edit" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

const deletePickup = async (req, res) => {
  const { id } = req.body;

  try {
    const { resultId } = await query("DELETE FROM pickup WHERE id = ?", [id]);

    if (resultId !== undefined && resultId === 1) {
      res.status(404).json({ success: false, message: "Invalid Data" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Pickup berhasil dihapus" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPickups,
  createPickup,
  updatePickup,
  deletePickup,
};
