function applyThemeColor(isDarkMode) {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeColorMeta.setAttribute('content', '#1c1c1e');  // Dark mode color
    } else {
        document.body.classList.remove('dark-mode');
        themeColorMeta.setAttribute('content', '#ffffff');  // Light mode color
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyThemeColor(true);
} else {
    applyThemeColor(false);
}

// 监听系统暗模式变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    applyThemeColor(e.matches);
});