# 手把手实现一个简约酷美美的版权声明模块

## 1. 导语

版权声明在很多网站都有用到，出场率还是很高的。所以今天就实现一个属于自己分风格的版权声明模块，技术上采用原生的前端三剑客:

- `HTML`
- `CSS`
- `JavaScript`(可能会用到)

比如`CSDN`的版权声明是这样的

![image-20240501135811558](https://images.waer.ltd/notes/image-20240501135811558.png)

---

## 2. 需求分析

 先看看成品吧，这篇文字结束的时候，我们大概做出来的样子就是下面这样的:

目前这个版本已经用在了我的博客网站中，欢迎随时去`look look`，感受一下结合实际应用的效果。[直通车](https://www.ilikexff.cn)

![image-20240501135415704](https://images.waer.ltd/notes/image-20240501135415704.png)

从整体的效果来看，它的实现并不复杂，作为一个名后端开发者，我都能一眼看出来结构，甚至脑阔都能浮现出来大致的代码实现了。

整体就是一个外在的盒子，里面包含了几个简单的内容元素，用来声明版权信息，盒子内左侧有一个显眼包，一个大大的**版** 字贯穿带有一定宽度的竖条，显式的表达出它的中心立意：”劳资的作用就是版权声明！“。

> 大体就是这样子的啦，但在具体的实现中，还是有很多细节的，比如版权的版字的摆放位置的设计和代码中的计算方式等等。

---

## 3 . 代码实现

- 整个模板先

> 为了方便阅读，这里采用外部`JS`和`CSS`导入的方式，分三个文件进行。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包含外部文件的HTML模板</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple example of including external JavaScript and CSS files in an HTML template.</p>
    <script src="script.js"></script>
</body>
</html>
```

- 把结构草图搞出来

> 没什么技术含量，直接`div>span*4`加<kbd>enter</kbd>即可完成。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包含外部文件的HTML模板</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

为了方便分析，先给盒子点颜色看看，并将版权的信息加上。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>包含外部文件的HTML模板</title>
    <link rel="stylesheet" href="./copyright.css">
</head>
<body>
    <div class="info-box">
        <div>
            <span>本文作者:</span> Gemini48
        </div>
        <div>
            <span>授权公众号:</span> 八尺妖剑
        </div>
        <div>
            <span>博客地址:</span> <a href='https://www.ilikexff.cn' style='color: #3f60de'>https://www.ilikexff.cn</a>
        </div>
        <div>
            <span>声明:</span> 本博客所有文章除特别声明外，均采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' style='color: #3f60de'>©BY-NC-SA</a> 许可协议。转载请注明出处及本声明！
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

简单搞点样式，调整一下格式。这里有些样式不是必须的，只是为了方便查看结构用的，比如外边框的蓝色等等。

```css
.info-box {
    margin: 20px;
    padding: 10px;
    border: 1px solid #3cb5ec;
}

.info-box div {
    margin-bottom: 10px;
    color: black;
    font-weight: bolder;
}

.info-box span, .info-box a {
    font-weight: bold;
    color: gray;
}

.info-box a {
    color: #3f60de;
}
```

效果如下:

![image-20240501144945725](https://images.waer.ltd/notes/image-20240501144945725.png)

---

- 设置左侧竖形的版权条，原理比较简单，其实就是一个设置一定宽度的`div`，因此我们需要再次调整整体的结构：

```html
    <div class="post-html-copyright">
        <div>
        
        <div class="vertical-line">   

        <div class="square-box">
        版 
        
        </div>
        <!--版权条目信息-->
        <div>
            <span>本文作者:</span> Gemini48
        </div>
        <div>
            <span>授权公众号:</span> 八尺妖剑
        </div>
        <div>
            <span>博客地址:</span> <a href='https://www.ilikexff.cn' style='color: #3f60de'>https://www.ilikexff.cn</a>
        </div>
        <div>
            <span>声明:</span> 本博客所有文章除特别声明外，均采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' style='color: #3f60de'>©BY-NC-SA</a> 许可协议。转载请注明出处及本声明！
        </div>


        </div>

    </div>
```

![image-20240501145743300](https://images.waer.ltd/notes/image-20240501145743300.png)

可以看到，大体的效果就是这样，现在主要是通过`CSS`样式进一步美化和结构调整。

先从最外层的盒子开始:

> - 加一个背景颜色，虽然这里默认就是`FFFFFF`白，但加上这个样式可以方便后续根据需求直接修改颜色即可
> - 处理一下边框弧度，仔细看实现好的贴图，它最外层边框其实是有一定弧度的，很微妙，不容易察觉而已。
> - 设置边框阴影效果
> - 注意到盒子上下边框固定位置分别有两条红颜色的线条效果，并且上下两条所处的位置都是绝对左右严格对齐的，而相对位置上，又具有一定的位移差，凸显出一种非对称偏差的美感。
> - 这个效果将会用到`linear-gradient`属性完成
> - 为了帮助理解，后续的代码都会加上注释，请结合注释食用。

```css
/* 设置宽度为65% */
width: 65%;

/* 设置外边距为20px */
margin: 20px;

/* 设置内边距为10px */
padding: 10px;

/* 设置边框为2px宽，颜色为#e80e5a */
border: 2px solid #e80e5a;

/* 设置背景颜色为白色 */
background-color: #ffffff;

/* 设置边框圆角为1px */
border-radius: 1px;

/* 设置阴影效果 */
box-shadow: 12px 12px 15px rgb(155, 172, 186);

/* 设置变换效果的过渡时间为0.3秒，缓动函数为ease-in-out */
transition: transform 0.3s ease-in-out;

/* 设置边框图案 */
border-image: linear-gradient(45deg, transparent 30%, #e80e5a 30%, #e80e5a 70%, transparent 70%) 1;

/* 水平居中 */
margin: 0 auto;

```

实时效果:

![image-20240501151054472](https://images.waer.ltd/notes/image-20240501151054472.png)

> 到此为止，距离最终的效果就一步之遥了，主要就是放在版字的处理上了。

对于这部分，我们先把左侧垂直的面条处理了

```css
.vertical-line {
  /*相对定位*/  
  position: relative;
}

.vertical-line::before {
    /* 创建一个空内容的伪元素 */
    content: '';
    
    /* 使用绝对定位，相对于最近的已定位父元素 */
    position: absolute;
    
    /* 从父元素的顶部开始定位 */
    top: 0;
    
    /* 从父元素的左侧开始定位 */
    left: 0;
    
    /* 水平方向平移使竖线居中 */
    transform: translateX(-50%);
    
    /* 竖线的宽度 */
    width: 5px;
    
    /* 竖线的高度占据整个父元素的高度 */
    height: 100%;
    
    /* 竖线的背景颜色 */
    background-color: #e80e5a;
}

```

> 可以通过伪元素 `::before` 在元素的内部插入一个空内容的元素，并对该伪元素应用样式来实现垂直线的效果。
>
> - `content: '';`：这个属性在伪元素中是必须的，用于指定伪元素的内容为空。
> - `position: absolute;`：将伪元素绝对定位，相对于最近的已定位父元素。
> - `top: 0;` 和 `left: 0;`：将伪元素放置在父元素的左上角。
> - `transform: translateX(-50%);`：通过 `transform` 属性将伪元素水平居中，`translateX(-50%)` 表示沿着 X 轴向左平移元素的宽度的一半。
> - `width: 5px;`：设置竖线的宽度为 `5px`。
> - `height: 100%;`：设置竖线的高度与父元素相同，即铺满整个父元素的高度。
> - `background-color: #e80e5a;`：设置竖线的背景颜色为` #e80e5a`，这是竖线的颜色。

![image-20240501152030387](https://images.waer.ltd/notes/image-20240501152030387.png)

最后一步，调整 **版**字的位置：

```css
.square-box {
    /* 设置方块的宽度为20px */
    width: 20px;

    /* 设置方块的高度为20px */
    height: 20px;

    /* 设置方块的背景颜色为 #e80e5a */
    background-color: #e80e5a;;

    /* 设置文本颜色为白色 */
    color: white;

    /* 文本水平居中 */
    text-align: center;

    /* 设置行高为20px，使文本垂直居中 */
    line-height: 20px;

    /* 绝对定位 */
    position: absolute;

    /* 设置距离顶部距离为父元素高度的30% */
    top: 30%;

    /* 设置距离左侧距离为0 */
    left: 0;

    /* 将方块水平垂直居中 */
    transform: translate(-50%, -50%);
}
```

![image-20240501152713876](https://images.waer.ltd/notes/image-20240501152713876.png)

从效果来看，似乎已经100%实现了贴图的效果，不过仔细观察还是会发现有一些瑕疵，比如竖条和右侧的文字信息的关系似乎过于亲密了，不行，得让它们明白什么叫距离产生美。

```css
.post-html-copyright span {
    margin-left: 15px;
}
```

最终修改之后的成品和原图效果:

![image-20240501154501727](https://images.waer.ltd/notes/image-20240501154501727.png)

---

> 其他细节就不全部贴这里了，最终的代码我会全部放在`GitHub`和`CodePen`上面，需要的自取。

---

## 4. 功能扩展

> 在实际的业务中，一般情况下，用户如果复制了携带版权声明的文章，这个版权声明也会一并被复制到剪切板。基于这个需求，我们在上面的基础上扩展一个版权信息的复制功能。

### 4.1 如何实现





- 我们需要先获取到要复制的文本内容。这里可以使用选择器去实现。
- 使用`navigator.clipboard`方法实现内容的复制，为了用户体验，建议在版权内容上面添加 **版权信息:**几个字。
- 同时不能将竖条中的 **版** 字复制进去。这块可以使用`replace`函数解决。

下面是这个思路的实现:

```javascript
// 获取版权信息
const originalCopyright = document.querySelector('.post-html-copyright .vertical-line').innerText.replace("复制","").replace("版","");

// 创建复制按钮
const copyButton = document.querySelector('.copy-button');
copyButton.addEventListener('click', async () => {
    try {
        // 将版权信息复制到剪贴板
        await navigator.clipboard.writeText('版权信息:\n' + originalCopyright);
        // 显示复制成功提示
        alert('版权信息已复制到剪贴板！');
    } catch (err) {
        // 处理复制失败的情况
        console.error('复制失败:', err);
        alert('复制失败，请手动复制！');
    }
});

```

复制之后粘贴出来的效果：

> 版权信息:
>
> 本文作者: Gemini48
> 授权公众号: 八尺妖剑
> 博客地址: https://www.ilikexff.cn
> 声       明: 本博客所有文章除特别声明外，均采用 ©BY-NC-SA 许可协议。转载请注明出处及本声明！

---

- 优化

> 上面的代码虽然功能实现了，但是在提示上使用了`alert()`，这种方式需要用户每次都手动关闭，很影响用户的体验，因此下面将自定义一个通知函数，实现自动关闭的轻量化通知功能。

```javascript
// 显示通知函数
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerText = message;
    document.body.appendChild(notification);

    // 在一段时间后移除通知
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // 3秒后移除通知
}
```

![image-20240501163541941](https://images.waer.ltd/notes/image-20240501163541941.png)

显然，初步的效果是实现了，自动关闭也没问题，但提示的显示位置一般放在屏幕左右侧和顶部居中位置并且有一定的过度动画(参考`Element-Plus`框架中通知组件的设计)。所以针对这个问题再优化一下:

```css
/*自定义通知*/
.notification {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: rgb(63, 223, 169);
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.5s;
}

.notification.show {
    opacity: 1;
}
```

调整通知函数：

```javascript
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
```

![image-20240501165310953](https://images.waer.ltd/notes/image-20240501165310953.png)

嗯哼，差不多了，就实用和美感来说，已经达到 了一个业余前端码农的审美要求了，再继续美化就和`Element-Plus`一样了，那我为什么不直接用它？

---

现在还有个小瑕疵，注意看右小角的 **复制** 按钮，丑不拉吉!虽然这是写文章用的演示，但作为般完美主义的强迫症患者，实在是看不下去，再美化下吧。

此时此刻的美化思路有二：

- 将复制按钮调整到右上角并简单加点样式；
- 不用按钮，通过组合键的方式触发复制事件，用户鼠标移动到版权信息区域的时候给出提示，比如

请按下<kbd>Space + C</kbd>复制版权信息。

这里先采用第一种方案实现，后面这种留给有缘人当作家庭作业！！

```css
/* 复制样式 */
.copy-button {
    position:absolute;
    top: -6px;
    right:405px;
    transform: translate(50%, 50%);
    background-color: rgba(255, 255, 255, 0.7); /* 使用rgba来设置背景颜色和透明度 */
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
```

![image-20240501171923628](https://images.waer.ltd/notes/image-20240501171923628.png)

---

## 5. 小完结撒花

项目地址:

> - [CodePen](https://codepen.io/Tis-ox/pen/ZEZNxEd)
> - [GitHub](https://github.com/08820048/EF-Copyright/tree/master)

