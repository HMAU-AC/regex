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

// 初始模式检测并应用
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyThemeColor(darkModeQuery.matches);

    // 监听系统暗模式变化
    darkModeQuery.addEventListener('change', e => {
        applyThemeColor(e.matches);
    });
} else {
    applyThemeColor(false);  // 默认使用浅色模式
}