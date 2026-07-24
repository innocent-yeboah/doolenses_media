from PIL import Image

src = r"d:\Websites\doolenses\public\brand\doolenses-banner.png"
# Correct orientation: icon left, wordmark, tagline under
img = Image.open(src).rotate(90, expand=True).convert("RGB")
w, h = img.size
pix = img.load()

# Find white panel: pixels that are very bright
# Scan for largest white rectangle by finding rows/cols mostly white
row_white = []
for y in range(h):
    white = sum(1 for x in range(w) if pix[x, y][0] > 245 and pix[x, y][1] > 245 and pix[x, y][2] > 245)
    row_white.append(white / w)

col_white = []
for x in range(w):
    white = sum(1 for y in range(h) if pix[x, y][0] > 245 and pix[x, y][1] > 245 and pix[x, y][2] > 245)
    col_white.append(white / h)

# Threshold: rows/cols that are at least 35% white belong to the panel area
y_idxs = [i for i, v in enumerate(row_white) if v > 0.35]
x_idxs = [i for i, v in enumerate(col_white) if v > 0.35]
print("panel candidates y", y_idxs[0], y_idxs[-1], "x", x_idxs[0], x_idxs[-1])

panel = img.crop((x_idxs[0], y_idxs[0], x_idxs[-1] + 1, y_idxs[-1] + 1))
panel.save(r"d:\Websites\doolenses\public\brand\panel.png")
print("panel", panel.size)

# Within panel, find black ink
gray = panel.convert("L")
gp = gray.load()
pw, ph = gray.size
xs, ys = [], []
for y in range(ph):
    for x in range(pw):
        if gp[x, y] < 90:
            xs.append(x)
            ys.append(y)

pad = 30
box = (
    max(0, min(xs) - pad),
    max(0, min(ys) - pad),
    min(pw, max(xs) + pad),
    min(ph, max(ys) + pad),
)
logo_rgb = panel.crop(box)
print("logo box", box, logo_rgb.size)

# Make transparent PNG: white -> alpha 0, dark -> black opaque
logo = logo_rgb.convert("RGBA")
data = list(logo.getdata())
out = []
for r, g, b, a in data:
    brightness = (r + g + b) / 3
    if brightness > 220:
        out.append((255, 255, 255, 0))
    elif brightness < 120:
        out.append((0, 0, 0, 255))
    else:
        # anti-alias midtones
        alpha = int(max(0, min(255, (200 - brightness) * 3)))
        out.append((0, 0, 0, alpha))
logo.putdata(out)
logo.save(r"d:\Websites\doolenses\public\brand\doolenses-logo.png")

# White ink version
white = logo.copy()
wdata = []
for r, g, b, a in logo.getdata():
    wdata.append((255, 255, 255, a))
white.putdata(wdata)
white.save(r"d:\Websites\doolenses\public\brand\doolenses-logo-white.png")

# On white solid for preview
on_white = Image.new("RGBA", logo.size, (255, 255, 255, 255))
on_white.alpha_composite(logo)
on_white.convert("RGB").save(r"d:\Websites\doolenses\public\brand\doolenses-logo-on-white.png")

lw, lh = logo.size
# Separate mark: leftmost square-ish region before text
# Find gap between mark and text by looking for a column with little ink
ink_cols = []
lp = logo.load()
for x in range(lw):
    ink = sum(1 for y in range(lh) if lp[x, y][3] > 128)
    ink_cols.append(ink)

# Mark ends when we hit a tall gap after initial content
in_mark = False
gap_start = None
mark_end = None
for x, ink in enumerate(ink_cols):
    if ink > lh * 0.05:
        in_mark = True
        if gap_start is not None and x - gap_start > 8 and mark_end is None and x > lh * 0.4:
            mark_end = gap_start
            break
        gap_start = None
    elif in_mark:
        if gap_start is None:
            gap_start = x

if mark_end is None:
    mark_end = int(lh * 0.95)

mark = logo.crop((0, 0, mark_end, lh))
mark.save(r"d:\Websites\doolenses\public\brand\doolenses-mark.png")
mark_w = mark.copy()
mw = []
for r, g, b, a in mark.getdata():
    mw.append((255, 255, 255, a))
mark_w.putdata(mw)
mark_w.save(r"d:\Websites\doolenses\public\brand\doolenses-mark-white.png")
print("mark_end", mark_end, "mark size", mark.size)

# Wordmark-only crop (rest)
word = logo.crop((mark_end, 0, lw, lh))
word.save(r"d:\Websites\doolenses\public\brand\doolenses-wordmark.png")
word_w = word.copy()
ww = [(255, 255, 255, a) for r, g, b, a in word.getdata()]
word_w.putdata(ww)
word_w.save(r"d:\Websites\doolenses\public\brand\doolenses-wordmark-white.png")
print("wordmark", word.size)
print("done")
