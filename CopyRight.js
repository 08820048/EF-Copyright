// 获取版权信息
const originalCopyright = document.querySelector('.post-html-copyright .vertical-line').innerText.replace("版","");

// 创建复制按钮
const copyButton = document.querySelector('.copy-button');
copyButton.addEventListener('click', async () => {
    try {
        // 将版权信息复制到剪贴板
        await navigator.clipboard.writeText('版权信息:\n' + originalCopyright);
        // 显示复制成功提示
          showNotification('success', '版权信息已复制到剪贴板！');
    } catch (err) {
        // 处理复制失败的情况
        console.error('复制失败:', err);
        showNotification('error', '复制失败，请手动复制！');
    }
});

// 显示通知函数
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerText = message;
    document.body.appendChild(notification);

    // 触发重绘
    void notification.offsetWidth;

    notification.classList.add('show');

    // 在一段时间后移除通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); // 等待过渡动画结束后再移除通知
    }, 3000); // 3秒后移除通知
}