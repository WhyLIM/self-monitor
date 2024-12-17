const { getStatusList, updateStatus } = require('../models/statusModel');

exports.getStatusList = (req, res) => {
    res.json(getStatusList());
};

exports.updateStatus = (req, res) => {
    const { id } = req.body;
    const updatedStatus = updateStatus(id);
    if (!updatedStatus) {
        return res.status(400).json({ success: false, message: '无效的状态 ID' });
    }
    res.json({ success: true, currentStatus: updatedStatus });
};
