const express = require('express');
const { getStatusList, updateStatus } = require('../controllers/statusController');
const router = express.Router();

// Define routes
router.get('/list', getStatusList); // 获取状态列表
router.post('/update', updateStatus); // 更新状态

module.exports = router;
