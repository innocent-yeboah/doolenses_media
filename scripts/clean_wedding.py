"""Remove the 'Chukwudum' watermark from the Weddings service photo."""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\USER\.cursor\projects\d-Websites-doolenses\assets"
    r"\c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d309d852ba6c19d7cb8781a6abcd7328_images_image-15a3c1a1-7dcc-403a-92df-a465e1a326ab.png"
)
OUT = Path(r"d:\Websites\doolenses\public\services\weddings.jpg")


def main() -> None:
    orig = cv2.imread(str(SRC))
    if orig is None:
        raise SystemExit(f"Could not read {SRC}")

    h, w = orig.shape[:2]
    x0, x1 = int(w * 0.06), int(w * 0.22)
    y0, y1 = int(h * 0.735), int(h * 0.80)
    bh, bw = y1 - y0, x1 - x0

    best_off, best_score = 66, 1e18
    edge = 10
    for off in range(40, 120):
        sy0 = y0 - off
        if sy0 < int(h * 0.55):
            break
        donor = orig[sy0 : sy0 + bh, x0:x1]
        tgt = orig[y0:y1, x0:x1]
        strips_d = np.concatenate(
            [
                donor[:, :edge].ravel(),
                donor[:, -edge:].ravel(),
                donor[:3].ravel(),
                donor[-3:].ravel(),
            ]
        )
        strips_t = np.concatenate(
            [
                tgt[:, :edge].ravel(),
                tgt[:, -edge:].ravel(),
                tgt[:3].ravel(),
                tgt[-3:].ravel(),
            ]
        )
        score = float(np.mean(np.abs(strips_d.astype(np.float32) - strips_t.astype(np.float32))))
        if score < best_score:
            best_score, best_off = score, off

    donor = orig[y0 - best_off : y1 - best_off, x0:x1].astype(np.float32)
    tgt = orig[y0:y1, x0:x1].astype(np.float32)

    feather = 12
    alpha = np.ones((bh, bw), np.float32)
    for i in range(feather):
        a = (i + 1) / feather
        alpha[i, :] *= a
        alpha[-(i + 1), :] *= a
        alpha[:, i] *= a
        alpha[:, -(i + 1)] *= a

    patched = donor * alpha[..., None] + tgt * (1.0 - alpha[..., None])
    out = orig.copy()
    out[y0:y1, x0:x1] = np.clip(patched, 0, 255).astype(np.uint8)

    rgb = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(OUT, "JPEG", quality=94, optimize=True)
    print(f"Wrote {OUT} (donor offset={best_off}, score={best_score:.2f})")


if __name__ == "__main__":
    main()
