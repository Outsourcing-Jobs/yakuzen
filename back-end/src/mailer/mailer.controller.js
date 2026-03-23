const { SendContactFormMail } = require("./mail.service");

const handleContactForm = async (req, res) => {
  try {
    const { ho, ten, email, so_dien_thoai, tieu_de, tin_nhan } = req.body;

    if (!ho || !ten || !email || !tin_nhan) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin bắt buộc.",
      });
    }

    const isSent = await SendContactFormMail({
      firstname: ten,
      lastname: ho,
      email: email, 
      phoneNumber: so_dien_thoai || "N/A",
      subject: tieu_de || "Liên hệ không tiêu đề",
      message: tin_nhan,
    });

    if (isSent) {
      return res.status(200).json({
        success: true,
        message: "Tin nhắn của bạn đã được gửi đến quản trị viên!",
      });
    } else {
      throw new Error("Gửi mail thất bại qua Brevo");
    }

  } catch (error) {
    console.error("Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Máy chủ bận, vui lòng thử lại sau.",
    });
  }
};

module.exports = {
  handleContactForm
}