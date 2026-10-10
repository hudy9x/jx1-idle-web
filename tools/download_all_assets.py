#!/usr/bin/env python3
"""Download all relevant game assets from app.js, data.js and CSS files while preserving the original folder structure.

It skips files already downloaded locally.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


ASSET_RE = re.compile(r'(["\'])([A-Za-z0-9_./-]+\.(?:mp3|wav|ogg|webp|png|jpg|jpeg|gif|svg|json|js|css))(?:\1)', re.IGNORECASE)
CSS_URL_RE = re.compile(r"url\((?:['\"])?([^'\")]+)(?:['\"])?\)|@import\s+(?:url\()?(?:['\"])?([^'\")]+)", re.IGNORECASE)


def extract_js_asset_paths(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="ignore")
    items = []
    seen: set[str] = set()
    for _, value in ASSET_RE.findall(text):
        if value.startswith(("data:", "blob:", "#")):
            continue
        if value not in seen:
            seen.add(value)
            items.append(value)
    return sorted(items)


def extract_css_asset_paths(css_path: Path, base_url: str, root: Path) -> list[str]:
    text = css_path.read_text(encoding="utf-8", errors="ignore")
    matches: list[str] = []
    for match in CSS_URL_RE.finditer(text):
        value = match.group(1) or match.group(2)
        if not value:
            continue
        cleaned = value.strip()
        if cleaned.startswith(("data:", "blob:", "#", "about:")):
            continue
        if cleaned.startswith(("http://", "https://", "//")):
            candidate = cleaned if cleaned.startswith("http") else "https:" + cleaned
        elif cleaned.startswith("/"):
            candidate = urljoin(base_url, cleaned)
        else:
            base = urljoin(base_url, css_path.relative_to(root).as_posix())
            candidate = urljoin(base, cleaned)
        matches.append(candidate)

    unique: list[str] = []
    seen: set[str] = set()
    for value in matches:
        if value not in seen:
            seen.add(value)
            unique.append(value)
    return unique


def normalize_asset_url(base_url: str, rel_path: str) -> str:
    candidate = rel_path.strip()
    if candidate.startswith(("http://", "https://")):
        return candidate
    if candidate.startswith("//"):
        return "https:" + candidate
    return urljoin(base_url, candidate)


def resolve_live_path(base_url: str, rel_path: str) -> tuple[str, Path]:
    path = rel_path.strip().lstrip("/")
    if not path:
        return urljoin(base_url, rel_path), Path(rel_path)

    if "/" in path:
        return normalize_asset_url(base_url, path), Path(path)

    for candidate in [
        f"img/a/{path}",
        f"img/pl/{path}",
        f"img/{path}",
        path,
    ]:
        url = normalize_asset_url(base_url, candidate)
        try:
            req = Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; AssetCollector/1.0)",
                "Referer": "https://volamidle.pages.dev/",
            })
            with urlopen(req, timeout=20):
                return url, Path(candidate)
        except Exception:
            continue

    return normalize_asset_url(base_url, path), Path(path)


def download_file(url: str, dest: Path) -> None:
    if dest.exists():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = Request(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; AssetCollector/1.0)",
        "Referer": "https://volamidle.pages.dev/",
    })
    with urlopen(req, timeout=60) as resp, open(dest, "wb") as out:
        while True:
            chunk = resp.read(64 * 1024)
            if not chunk:
                break
            out.write(chunk)


def gather_assets(root: Path, base_url: str) -> list[tuple[str, Path]]:
    results: list[tuple[str, Path]] = []
    seen: set[tuple[str, str]] = set()

    # app.js
    app_js = root / "app.js"
    if app_js.exists():
        for rel_path in extract_js_asset_paths(app_js):
            url, local_path = resolve_live_path(base_url, rel_path)
            key = (url, local_path.as_posix())
            if key not in seen:
                seen.add(key)
                results.append((url, local_path))

    # data.js
    data_js = root / "data.js"
    if data_js.exists():
        for rel_path in extract_js_asset_paths(data_js):
            url, local_path = resolve_live_path(base_url, rel_path)
            key = (url, local_path.as_posix())
            if key not in seen:
                seen.add(key)
                results.append((url, local_path))

    # css files
    for css_path in sorted(root.rglob("*.css")):
        for asset_url in extract_css_asset_paths(css_path, base_url, root):
            parsed = urlparse(asset_url)
            asset_path = parsed.path.lstrip("/")
            if not asset_path:
                continue
            local_path = Path(asset_path)
            key = (asset_url, local_path.as_posix())
            if key not in seen:
                seen.add(key)
                results.append((asset_url, local_path))

    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Download all real game asset files and skip files already present locally.")
    parser.add_argument("--base-url", default="https://volamidle.pages.dev/", help="Base URL of the site.")
    parser.add_argument("--output-dir", default="assets", help="Root folder for saved files.")
    args = parser.parse_args()

    workspace_root = Path(__file__).resolve().parents[1]
    output_root = workspace_root / args.output_dir
    output_root.mkdir(parents=True, exist_ok=True)

    assets = gather_assets(workspace_root, args.base_url)
    print(f"Found {len(assets)} unique asset candidates.")

    total = 0
    for url, local_path in assets:
        dest = output_root / local_path
        if dest.exists():
            print(f"SKIP {local_path.as_posix()}")
            continue

        try:
            download_file(url, dest)
            total += 1
            print(f"OK   {local_path.as_posix()}")
        except Exception as exc:  # pragma: no cover - runtime download failure
            print(f"FAIL {local_path.as_posix()} -> {exc}")

    print(f"\nDone. Downloaded {total} new files into {output_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
