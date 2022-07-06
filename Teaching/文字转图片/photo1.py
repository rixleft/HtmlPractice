
import sys

try:
    import pillow
except :
    import os
    os.system('pip install pillow  -i https://pypi.mirrors.ustc.edu.cn/simple/')
    from PIL import Image, ImageDraw, ImageFont 

CHILD_W = CHILD_H = 16                                      # 子图的尺寸，宽和高都是16像素
txt = '穿过凌烈暴风顽固出更多的火种我也想成为你的依托多少星星之火绵延夜的荒漠在寒冷的时候给我盛夏的暖流不放手要肩并肩走到最后不辜负你微笑眼中有我的轮廓当这个世界因你变不同所有的回忆在心里感动彼此经过多少风波从不曾退缩共同的未来要一起探索'                                      # 输出内容
font = ImageFont.truetype('AliPuHui-Bold.ttf', CHILD_W)     # 字体及大小,选用粗体字体效果更好

# 程序入口
if __name__ == '__main__':
    imgSrc = Image.open(sys.argv[1])                        # 打开源图像
    w, h = imgSrc.size                                      # 源图像宽和高
    
    imgChild = Image.new("RGB", (CHILD_W, CHILD_H))         # 新建子图
    imgDst = Image.new("RGB", (CHILD_W*w, CHILD_H*h) )      # 创建目标图像的空图，待填充

    textW, textH = font.getsize("迷")                       # 取得单个文字的宽、高信息
    offsetX = (CHILD_W - textW) >> 1                        # 文字水平居中绘制
    offsetY = (CHILD_H - textH) >> 1                        # 文字垂直居中绘制

    charIndex = 0                                           # 序号，代表当前绘制哪个汉字
    draw = ImageDraw.Draw(imgChild)                         # 取得小图的绘图对象，用于绘制文字
    print("开始处理图片...")
    for y in range(h):
        for x in range(w):
            draw.rectangle( (0, 0, CHILD_W, CHILD_H), fill = 'lightgray' )  # 灰色背景效果比外色略好

            draw.text( (offsetX, offsetY), txt[charIndex], font = font, fill = imgSrc.getpixel((x, y)) )
            
            imgDst.paste(imgChild, (x*CHILD_W, y*CHILD_H))  # 把绘制好的子图填到imgDst里
            
            charIndex += 1                                  # 序号加1，从而依次绘制每个字
            if charIndex == len(txt):                       # 循环绘制
                charIndex = 0
    
    imgDst.save(sys.argv[2])                                # 保存图片




