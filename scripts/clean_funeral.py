"""Remove commemorative text overlay from the Funerals service photo."""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\USER\.cursor\projects\d-Websites-doolenses\assets"
    r"\c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d309d852ba6c19d7cb8781a6abcd7328_images_image-09555b78-7bb2-456b-926b-93df5011fb09.png"
)
OUT = Path(r"d:\Websites\doolenses\public\services\funerals.jpg")


def main() -> None:
    im = cv2.imread(str(SRC))
    if im is None:
        raise SystemExit(f"Could not read {SRC}")

    h, w = im.shape[:2]
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    cx0, cx1 = int(w * 0.2), int(w * 0.8)
    y_top, y_bot = int(h * 0.88), int(h * 0.995)

    roi_gray = gray[y_top:y_bot, cx0:cx1]
    white = roi_gray > 190
    cols = white.sum(axis=0)
    active = np.where(cols > 2)[0]
    if len(active):
        x_left = cx0 + max(0, int(active.min()) - 20)
        x_right = cx0 + min(cx1 - cx0 - 1, int(active.max()) + 20)
    else:
        x_left, x_right = int(w * 0.28), int(w * 0.72)

    # Expand to cover full commemorative block
    x_left = min(x_left, int(w * 0.28))
    x_right = max(x_right, int(w * 0.72))
    y_top = min(y_top, int(h * 0.875))

    pad = 6
    rx0, ry0 = max(0, x_left - pad), max(0, y_top - pad)
    rx1, ry1 = min(w, x_right + pad), min(h, y_bot + pad)

    mask = np.zeros((h, w), np.uint8)
    cv2.rectangle(mask, (rx0, ry0), (rx1, ry1), 255, -1)
    mask = cv2.GaussianBlur(mask, (15, 15), 0)
    _, mask_bin = cv2.threshold(mask, 20, 255, cv2.THRESH_BINARY)
    out = cv2.inpaint(im, mask_bin, 5, cv2.INPAINT_NS)

    bh, bw = ry1 - ry0, rx1 - rx0
    off = bh + 8
    sy0 = max(0, ry0 - off)
    donor = im[sy0 : sy0 + bh, rx0:rx1]
    if donor.shape[0] == bh and donor.shape[1] == bw:
        feather = 18
        a = np.ones((bh, bw), np.float32)
        for i in range(feather):
            t = (i + 1) / feather
            a[i, :] *= t
            a[-(i + 1), :] *= t
            a[:, i] *= t
            a[:, -(i + 1)] *= t
        orig_reg = im[ry0:ry1, rx0:rx1].astype(np.float32)
        patched = donor.astype(np.float32) * a[..., None] + orig_reg * (1 - a[..., None])
        out[ry0:ry1, rx0:rx1] = np.clip(patched, 0, 255).astype(np.uint8)

    roi = out[y_top:y_bot, x_left:x_right]
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    left = ((hsv[:, :, 2] > 195) & (hsv[:, :, 1] < 55)).astype(np.uint8) * 255
    left = cv2.dilate(left, np.ones((3, 3), np.uint8), 2)
    full = np.zeros((h, w), np.uint8)
    full[y_top:y_bot, x_left:x_right] = left
    if cv2.countNonZero(full):
        out = cv2.inpaint(out, full, 3, cv2.INPAINT_TELEA)

    rgb = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(OUT, "JPEG", quality=94, optimize=True)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
