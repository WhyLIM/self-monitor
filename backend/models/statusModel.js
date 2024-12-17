const statusList = [
    { id: 0, name: '在线', desc: '用户正在活跃' },
    { id: 1, name: '离线', desc: '用户不在线' },
];

let currentStatus = statusList[0];

exports.getStatusList = () => statusList;

exports.getCurrentStatus = () => currentStatus;

exports.updateStatus = (id) => {
    const newStatus = statusList.find((status) => status.id === id);
    if (newStatus) {
        currentStatus = newStatus;
        return currentStatus;
    }
    return null;
};
