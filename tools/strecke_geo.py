"""Verlauf des Raulswegs nach avesmaps.de (Kartenkoordinaten, y nach Norden).

Gemessen aus avesmaps-Ansichten (series=modern). 1 Karteneinheit ≈ 2,99 Meilen.
Feste Orte stehen als Namen im Verlauf, freie Zwischenpunkte als Koordinaten.
"""
import math

MEILEN_PRO_EINHEIT = 2.99

ORTE = {
    "gareth": (551.605, 532.955), "nattersquell": (562.215, 534.005), "hartsteen": (571.042, 535.50),
    "rommilyser-kreuz": (588.46, 535.5), "feste-hohenstein": (589.639, 534.12), "natterbruecke": (595.0, 531.25),
    "hausen": (595.512, 530.146), "mardramund": (599.485, 522.502), "wasserburg": (605.182, 516.507),  # 10 Meilen näher an Mardramund gerückt (echte Lage 606.105, 513.51)
    "gnitzenkuhl": (612.375, 502.429), "gaulsfurt": (620.03, 500.98), "rabicum": (625.553, 504.936),
    "perricum": (631.28, 507.35),
    # Nebenorte
    "wandlether-hof": (606.307, 505.061),  # beim Weiler Gräfenweiche
    "blitztann": (604.03, 505.85), "rommilys": (596.85, 536.88), "wandleth": (577.89, 523.54), "rabenbruecke": (589.072, 534.016),
}

VERLAUF = ["gareth", (556.5, 533.1), "nattersquell", (565.5, 534.7), (568.4, 535.2), "hartsteen", (573.0, 535.0),
           (575.0, 535.3), (578.1, 536.2), (582.0, 536.1), (586.583, 535.859), "rommilyser-kreuz", "feste-hohenstein",
           (592.0, 533.3), (594.4, 531.9), "natterbruecke", "hausen", (596.1, 529.2), (596.442, 528.363), (596.76, 527.08),
           (598.0, 525.07), (598.9, 523.6), "mardramund", (600.2, 521.3), (603.0, 520.6), (604.015, 520.522),
           (605.19, 519.64), (605.3, 518.95), "wasserburg", (605.1, 514.8), (605.68, 512.18), (606.03, 506.04), "wandlether-hof",
           (606.69, 503.71), (607.8, 502.63), (609.48, 502.87), "gnitzenkuhl", (614.15, 502.59), (616.0, 501.75),
           (617.497, 501.393), "gaulsfurt", (621.37, 502.19), (624.17, 503.5), "rabicum", (627.44, 506.21), "perricum"]

DARPAT = [(597.0, 538.6), (597.3, 536.4), (597.79, 534.47), (597.0, 532.4), (596.31, 530.91), (597.35, 529.33),
          (599.6, 525.43), (600.26, 523.03), (601.9, 521.82), (605.51, 520.18), (605.96, 518.85), (605.68, 515.31),
          (606.42, 513.54), (606.61, 512.17), (606.87, 506.04), (607.34, 503.71), (607.8, 503.24), (609.67, 503.66),
          (612.28, 503.43), (615.08, 503.15), (616.95, 502.4), (618.81, 501.75), (620.0, 501.6), (620.97, 502.75),
          (623.24, 504.06), (625.1, 505.37), (627.44, 506.95), (628.84, 507.6), (631.5, 508.3)]
NATTER = [(552.48, 532.68), (556.0, 532.1), (559.96, 531.73), (564.25, 530.62), (567.51, 531.69), (572.12, 533.84),
          (575.62, 532.96), (578.49, 533.2), (581.35, 535.03), (585.48, 533.84), (589.07, 534.0), (592.01, 532.88),
          (594.29, 531.4), (595.3, 531.1), (596.31, 530.91)]


def punkte():
    return [ORTE[p] if isinstance(p, str) else p for p in VERLAUF]


def meilen():
    """Meilen ab Gareth für jeden benannten Ort im Verlauf."""
    aus, d, vorher = {}, 0.0, None
    for p in VERLAUF:
        q = ORTE[p] if isinstance(p, str) else p
        if vorher:
            d += math.dist(vorher, q)
        vorher = q
        if isinstance(p, str):
            aus[p] = d * MEILEN_PRO_EINHEIT
    return aus


def ort_bei(meile):
    """Kartenpunkt bei einer Meilenzahl entlang des Verlaufs."""
    pts = punkte()
    rest = meile / MEILEN_PRO_EINHEIT
    for a, b in zip(pts, pts[1:]):
        l = math.dist(a, b)
        if rest <= l:
            t = rest / l
            return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
        rest -= l
    return pts[-1]


if __name__ == "__main__":
    for k, v in meilen().items():
        print(f"{k:18s}{v:6.1f}")
