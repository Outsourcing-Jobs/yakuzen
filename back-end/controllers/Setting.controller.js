const Setting = require('../models/Setting');

exports.getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    let setting = await Setting.findOne({ key });
    
    // Default values if not found
    if (!setting && key === 'exchange_rate') {
        setting = { key: 'exchange_rate', value: 25430 };
    }

    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;

    let setting = await Setting.findOne({ key });

    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
      await setting.save();
    } else {
      setting = new Setting({ key, value, description });
      await setting.save();
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
