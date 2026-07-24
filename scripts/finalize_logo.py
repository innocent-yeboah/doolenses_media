from PIL import Image

logo = Image.open(r"d:\Websites\doolenses\public\brand\doolenses-logo.png")
w, h = logo.size
print("logo", w, h)

# Icon is left portion ~ square relative to content height
# From earlier good crop attempt: mark_end ~188 of 717
mark_end = int(w * 0.28)
icon = logo.crop((0, 0, mark_end, h))

# Trim empty edges
def trim(im, pad=6):
    px = im.load()
    iw, ih = im.size
    xs, ys = [], []
    for y in range(ih):
        for x in range(iw):
            if px[x, y][3] > 80:
                xs.append(x)
                ys.append(y)
    if not xs:
        return im
    box = (
        max(0, min(xs) - pad),
        max(0, min(ys) - pad),
        min(iw, max(xs) + pad + 1),
        min(ih, max(ys) + pad + 1),
    )
    return im.crop(box)

icon = trim(icon, 8)
icon.save(r"d:\Websites\doolenses\public\brand\doolenses-mark.png")

white = icon.copy()
white.putdata([(255, 255, 255, a) for _, _, _, a in icon.getdata()])
white.save(r"d:\Websites\doolenses\public\brand\doolenses-mark-white.png")
print("mark", icon.size)

# Preview on navy
bg = Image.new("RGB", (icon.width + 60, icon.height + 60), (10, 37, 64))
bg.paste(white.convert("RGBA"), (30, 30), white)
bg.save(r"d:\Websites\doolenses\public\brand\_preview-mark.png")

# Wordmark trim
word = trim(logo.crop((mark_end, 0, w, h)), 4)
word.save(r"d:\Websites\doolenses\public\brand\doolenses-wordmark.png")
ww = word.copy()
ww.putdata([(255, 255, 255, a) for _, _, _, a in word.getdata()])
ww.save(r"d:\Websites\doolenses\public\brand\doolenses-wordmark-white.png")
print("word", word.size)

# Favicons from mark
for size, name in [(32, "favicon-32.png"), (48, "icon-48.png"), (180, "apple-touch-icon.png"), (512, "icon-512.png")]:
    canvas = Image.new("RGBA", (size, size), (10, 37, 64, 255))
    inner = int(size * 0.7)
    resized = white.resize((inner, inner), Image.Resampling.LANCZOS)
    off = (size - inner) // 2
    canvas.paste(resized, (off, off), resized)
    canvas.save(rf"d:\Websites\doolenses\public\{name}" if "favicon" in name or "apple" in name else rf"d:\Websites\doolenses\public\brand\{name}")
    if size == 32:
        canvas.save(r"d:\Websites\doolenses\public\favicon.ico")
    if size == 180:
        canvas.save(r"d:\Websites\doolenses\public\apple-touch-icon.png")

# Also save full logo white into public/brand cleanly - already there
# Scale up full lockup for retina header use
full_white = Image.open(r"d:\Websites\doolenses\public\brand\doolenses-logo-white.png")
# Trim full logo
full_white = trim(full_white, 4)
full_white.save(r"d:\Websites\doolenses\public\brand\doolenses-logo-white.png")
full_black = Image.open(r"d:\Websites\doolenses\public\brand\doolenses-logo.png")
full_black = trim(full_black, 4)
full_black.save(r"d:\Websites\doolenses\public\brand\doolenses-logo.png")
print("full", full_white.size)
print("done")
