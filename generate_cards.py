#!/usr/bin/env python3
"""
時光整理所 - 品牌圖卡生成器
用 Python + Pillow 生成 4 張高質感靜態品牌圖卡
每張圖卡包含：品牌名、類型名、定錨金句、QR Code (quiz.kenplus.tw)
尺寸：1080x1920 (9:16 手機桌布比例)
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode
import math
import os

# 輸出目錄
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'client', 'public')

# 字體路徑
FONT_SERIF_REGULAR = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc'
FONT_SERIF_MEDIUM = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Medium.ttc'
FONT_SERIF_SEMIBOLD = '/usr/share/fonts/opentype/noto/NotoSerifCJK-SemiBold.ttc'
FONT_SERIF_BOLD = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc'
FONT_SERIF_LIGHT = '/usr/share/fonts/opentype/noto/NotoSerifCJK-Light.ttc'
FONT_SANS_REGULAR = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
FONT_SANS_MEDIUM = '/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc'
FONT_SANS_LIGHT = '/usr/share/fonts/opentype/noto/NotoSansCJK-Light.ttc'

# QR Code 固定網址
QR_URL = 'https://quiz.kenplus.tw'

# 圖卡尺寸
W, H = 1080, 1920

# 四種類型配置
TYPES = {
    'guardian': {
        'zhName': '時光整理師',
        'enName': 'THE ORGANIZER',
        'tagline': '溫柔守護 · 穩定核心',
        'bg': '#EDE6DC',
        'accent': '#A0826D',
        'textColor': '#3D2E26',
        'subColor': '#A0826D',
        'orb1': '#C9A876',
        'orb2': '#D4B896',
        'anchorQuote': '你不是想太多。\n你只是比別人更早感知到，\n什麼東西快要散了。',
        'brandLine': '這不是標籤。\n這是創造者送的禮物。',
        'filename': 'share-card-guardian.png',
    },
    'balancer': {
        'zhName': '能量建築師',
        'enName': 'THE ARCHITECT',
        'tagline': '平衡協調 · 空間創造',
        'bg': '#E8EEEB',
        'accent': '#5F8B84',
        'textColor': '#253430',
        'subColor': '#5F8B84',
        'orb1': '#7BA89F',
        'orb2': '#A8C4BF',
        'anchorQuote': '沒有呼吸的空間，\n什麼結構都撐不住。',
        'brandLine': '這不是標籤。\n這是創造者送的禮物。',
        'filename': 'share-card-balancer.png',
    },
    'explorer': {
        'zhName': '生命航行引水人',
        'enName': 'THE NAVIGATOR',
        'tagline': '好奇開放 · 新路先行',
        'bg': '#EBE8E0',
        'accent': '#B8956A',
        'textColor': '#3D342E',
        'subColor': '#B8956A',
        'orb1': '#D4A574',
        'orb2': '#E0B896',
        'anchorQuote': '迷路，\n在你這裡從來不是終點。\n那只是地圖還沒畫到的地方。',
        'brandLine': '這不是標籤。\n這是創造者送的禮物。',
        'filename': 'share-card-explorer.png',
    },
    'builder': {
        'zhName': '秩序累積者',
        'enName': 'THE BUILDER',
        'tagline': '系統思考 · 深度累積',
        'bg': '#E9EAE5',
        'accent': '#7A8F7E',
        'textColor': '#2F3A32',
        'subColor': '#7A8F7E',
        'orb1': '#9DB393',
        'orb2': '#B8C9AD',
        'anchorQuote': '你從不只看現在。\n你的眼睛天生長在，\n三年後的位置。',
        'brandLine': '這不是標籤。\n這是創造者送的禮物。',
        'filename': 'share-card-builder.png',
    },
}


def hex_to_rgb(hex_color):
    """將 hex 色碼轉為 RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def hex_to_rgba(hex_color, alpha=255):
    """將 hex 色碼轉為 RGBA tuple"""
    r, g, b = hex_to_rgb(hex_color)
    return (r, g, b, alpha)


def draw_circle(draw, cx, cy, radius, fill):
    """畫一個圓"""
    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=fill
    )


def draw_gradient_circle(img, cx, cy, radius, color_hex, max_alpha=40):
    """畫一個漸層透明圓（模擬光暈效果）"""
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    r, g, b = hex_to_rgb(color_hex)
    
    steps = 30
    for i in range(steps):
        ratio = i / steps
        current_radius = radius * (1 - ratio * 0.7)
        alpha = int(max_alpha * (1 - ratio))
        draw.ellipse(
            [cx - current_radius, cy - current_radius,
             cx + current_radius, cy + current_radius],
            fill=(r, g, b, alpha)
        )
    
    img.paste(Image.alpha_composite(
        Image.new('RGBA', img.size, (0, 0, 0, 0)),
        overlay
    ), (0, 0), overlay)


def draw_text_centered(draw, text, y, font, fill, width=W):
    """置中繪製文字"""
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    draw.text((x, y), text, font=font, fill=fill)
    return bbox[3] - bbox[1]


def draw_multiline_centered(draw, text, start_y, font, fill, line_spacing=1.6, width=W):
    """置中繪製多行文字"""
    lines = text.split('\n')
    y = start_y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_height = bbox[3] - bbox[1]
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        draw.text((x, y), line, font=font, fill=fill)
        y += int(line_height * line_spacing)
    return y


def generate_qr_code(url, size=220, fg_color='#3D2E26', bg_color='#FFFFFF'):
    """生成 QR Code 圖片"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    qr_img = qr.make_image(fill_color=fg_color, back_color=bg_color)
    qr_img = qr_img.convert('RGBA')
    qr_img = qr_img.resize((size, size), Image.LANCZOS)
    return qr_img


def draw_decorative_line(draw, x1, y, x2, y2, color, width=2):
    """畫裝飾線"""
    draw.line([(x1, y), (x2, y2)], fill=color, width=width)


def generate_card(type_key, config):
    """生成單張圖卡"""
    bg_rgb = hex_to_rgb(config['bg'])
    text_rgb = hex_to_rgb(config['textColor'])
    accent_rgb = hex_to_rgb(config['accent'])
    sub_rgb = hex_to_rgb(config['subColor'])
    
    # 建立 RGBA 圖片
    img = Image.new('RGBA', (W, H), (*bg_rgb, 255))
    
    # 添加背景裝飾光暈
    draw_gradient_circle(img, W - 80, -60, 350, config['orb1'], max_alpha=35)
    draw_gradient_circle(img, -60, H + 80, 300, config['orb2'], max_alpha=30)
    draw_gradient_circle(img, W + 100, H // 2 + 200, 280, config['orb1'], max_alpha=20)
    draw_gradient_circle(img, 100, H // 2 - 300, 200, config['orb2'], max_alpha=15)
    
    # 建立繪圖物件
    draw = ImageDraw.Draw(img)
    
    # 載入字體
    font_en_title = ImageFont.truetype(FONT_SANS_LIGHT, 30)
    font_zh_type = ImageFont.truetype(FONT_SERIF_SEMIBOLD, 56)
    font_tagline = ImageFont.truetype(FONT_SERIF_LIGHT, 26)
    font_quote = ImageFont.truetype(FONT_SERIF_MEDIUM, 48)
    font_brand_line = ImageFont.truetype(FONT_SERIF_LIGHT, 32)
    font_brand_name = ImageFont.truetype(FONT_SERIF_SEMIBOLD, 42)
    font_brand_sub = ImageFont.truetype(FONT_SERIF_LIGHT, 24)
    font_qr_hint = ImageFont.truetype(FONT_SANS_REGULAR, 22)
    
    # ===== 上方區域：類型標識 =====
    y = 160
    
    # 英文類型名
    draw_text_centered(draw, config['enName'], y, font_en_title, 
                       (*sub_rgb, 180))
    y += 55
    
    # 裝飾短線
    line_w = 60
    draw_decorative_line(draw, (W - line_w) // 2, y, (W + line_w) // 2, y,
                         (*accent_rgb, 120), 2)
    y += 30
    
    # 中文類型名
    draw_text_centered(draw, config['zhName'], y, font_zh_type, text_rgb)
    y += 80
    
    # Tagline
    draw_text_centered(draw, config['tagline'], y, font_tagline, 
                       (*sub_rgb, 200))
    
    # ===== 中間區域：定錨金句 =====
    quote_y = 580
    
    # 上方裝飾線
    draw_decorative_line(draw, 120, quote_y - 40, W - 120, quote_y - 40,
                         (*accent_rgb, 60), 1)
    
    # 金句文字
    quote_end_y = draw_multiline_centered(
        draw, config['anchorQuote'], quote_y + 20, font_quote, text_rgb,
        line_spacing=1.8
    )
    
    # 下方裝飾線
    draw_decorative_line(draw, 120, quote_end_y + 20, W - 120, quote_end_y + 20,
                         (*accent_rgb, 60), 1)
    
    # ===== 品牌金句 =====
    brand_y = quote_end_y + 100
    draw_multiline_centered(
        draw, config['brandLine'], brand_y, font_brand_line,
        (*sub_rgb, 180), line_spacing=1.8
    )
    
    # ===== 底部區域 =====
    bottom_section_y = H - 480
    
    # 長分隔線
    draw_decorative_line(draw, 80, bottom_section_y, W - 80, bottom_section_y,
                         (*accent_rgb, 80), 1)
    
    # 品牌名稱
    brand_name_y = bottom_section_y + 50
    draw.text((100, brand_name_y), '時光整理所', font=font_brand_name, fill=text_rgb)
    
    # 品牌副標
    draw.text((100, brand_name_y + 60), '探索屬於你的生活密碼', 
              font=font_brand_sub, fill=(*sub_rgb, 200))
    
    # QR Code
    qr_size = 220
    qr_x = W - qr_size - 100
    qr_y = bottom_section_y + 30
    
    # QR Code 白色背景
    qr_bg_padding = 15
    draw.rounded_rectangle(
        [qr_x - qr_bg_padding, qr_y - qr_bg_padding,
         qr_x + qr_size + qr_bg_padding, qr_y + qr_size + qr_bg_padding],
        radius=12,
        fill=(255, 255, 255, 240)
    )
    
    # 生成並貼上 QR Code
    qr_img = generate_qr_code(QR_URL, qr_size, config['textColor'], '#FFFFFF')
    img.paste(qr_img, (qr_x, qr_y), qr_img)
    
    # QR Code 提示文字
    qr_hint_y = qr_y + qr_size + qr_bg_padding + 15
    bbox = draw.textbbox((0, 0), '掃碼探索你的類型', font=font_qr_hint)
    hint_w = bbox[2] - bbox[0]
    hint_x = qr_x + (qr_size - hint_w) // 2
    draw.text((hint_x, qr_hint_y), '掃碼探索你的類型', 
              font=font_qr_hint, fill=(*sub_rgb, 160))
    
    # ===== 最底部品牌浮水印 =====
    watermark_y = H - 80
    font_watermark = ImageFont.truetype(FONT_SANS_LIGHT, 20)
    draw_text_centered(draw, 'quiz.kenplus.tw', watermark_y, font_watermark,
                       (*sub_rgb, 120))
    
    # 轉換為 RGB 並儲存
    final_img = Image.new('RGB', (W, H), bg_rgb)
    final_img.paste(img, (0, 0), img)
    
    output_path = os.path.join(OUTPUT_DIR, config['filename'])
    final_img.save(output_path, 'PNG', quality=95)
    print(f'✅ 生成完成: {output_path}')
    return output_path


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for type_key, config in TYPES.items():
        generate_card(type_key, config)
    
    print('\n🎉 所有圖卡生成完成！')


if __name__ == '__main__':
    main()
