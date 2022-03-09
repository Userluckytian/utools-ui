
// （1）根据提供的颜色计算推荐的文本颜色
const colourIsLight = (r, g, b) => {

    // Counting the perceptive luminance
    // human eye favors green color... 
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    console.log(a);
    return (a < 0.5);
}
// （2）根据背景色获取推荐的文本颜色
const getTextColorByBgColor = (color) => {
    const arrayRGB = color.slice(4, color.length - 1).split(',');
    return colourIsLight(arrayRGB[0], arrayRGB[1], arrayRGB[2]) ? '#000000' : '#FFFFFF';
}
// （3）展示在页面上
const setbgColorAndTextColor = (bgColour, textColour) => {
    var colorPancel = document.getElementById('result');
    var el = document.createElement('div');
    el.setAttribute('class', 'box');
    el.textContent = "Hello";
    el.setAttribute('style', 'background-color: ' + bgColour + '; color: ' + textColour);
    colorPancel.appendChild(el);
    document.querySelector('.bgColor').setAttribute('value', bgColour);
    document.querySelector('.textColor').setAttribute('value', textColour);
}
// （4）捕捉一种颜色作为背景色
const catchBgColor = () => {
    utools.hideMainWindow()
    utools.screenColorPick(({ hex, rgb }) => {
        // console.log(hex) // #FFFFFF
        // console.log(rgb) // RGB(0, 0, 0)
        const textColor = getTextColorByBgColor(rgb);
        const bgColor = hex;
        utools.copyText(textColor)
        setbgColorAndTextColor(bgColor, textColor);
        utools.showNotification('颜色' + textColor + '已复制')
    })
}

/**
 *  tip：（0-1）、（0-2）、（0-3）、（0-4）是全部过程! (1)、(2)、(3)、(4)是辅助函数
 * 
*/

// （0-1）主入口
utools.onPluginReady(function () {
    console.log('插件装配完成，已准备好')
});
// （0-2）进入时事件主动执行!
utools.onPluginEnter(({ code, type, payload }) => {
    catchBgColor()
});

// （0-3）退出时，清空所有的内容
utools.onPluginOut(() => {
    // 隐藏窗体
    utools.hideMainWindow()
    // 移除色卡
    document.querySelector('.box').remove();
})
// （0-4）退出页面时，会自动调用该事件！
utools.outPlugin()



// （5）、（6）、（7）未使用

// （5）随机获取一个RGB颜色数组[R，G，B]
const randomRgb = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return [r, g, b];
};

// （6）组合成rgb模式的颜色
const colourFromRgb = (r, g, b) => {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

// （7）根据（5）、（6）获取最佳的文本颜色并将效果展示在页面上!
const setRandomBgColorAndTextColor = () => {
    var colorPancel = document.getElementById('result');
    var el = document.createElement('div');
    el.setAttribute('class', 'box');
    el.textContent = "Hello";

    var bgRgb = randomRgb();
    var bgColour = colourFromRgb(bgRgb[0], bgRgb[1], bgRgb[2]);
    var textColour = colourIsLight(bgRgb[0], bgRgb[1], bgRgb[2]) ? 'black' : 'white';
    el.setAttribute('style', 'background-color: ' + bgColour + '; color: ' + textColour);
    colorPancel.appendChild(el);
    document.querySelector('.bgColor').setAttribute('value', bgColour);
    document.querySelector('.textColor').setAttribute('value', textColour);
}