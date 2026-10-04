import os, re, glob, base64, mimetypes, tempfile
from jinja2 import Environment, FileSystemLoader
import instaloader

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


"""Saves Instagram post based on given url"""

app = FastAPI()
env = Environment(loader=FileSystemLoader("templates"))

URL_RE = re.compile(r"instagram\.com/(?:[A-Za-z0-9_.]+/)?(p|reels?|tv)/([A-Za-z0-9_-]+)")
BARE_RE = re.compile(r"^[A-Za-z0-9_-]{5,}$")

class Req(BaseModel):
    url: str  # full URL, e.g. https://www.instagram.com/reel/abc123/?igsh=xyz

def parse_url(raw: str):
    """Returns shortcode of instagram with its kind either p or reel"""
    raw = raw.strip()
    m = URL_RE.search(raw)
    if m:
        kind = "p" if m.group(1) == "p" else "reel"  # reels/tv -> reel
        return kind, m.group(2)
    if BARE_RE.match(raw):  # bare shortcode, as in the old script
        return "p", raw
    raise ValueError(f"Not a recognizable Instagram post/reel URL: {raw}")


def b64(path):
    mime, _ = mimetypes.guess_type(path)
    with open(path, "rb") as f:
        return f"data:{mime};base64,{base64.b64encode(f.read()).decode()}"


def make_title(caption, shortcode):
    if not caption or not caption.strip():
        return shortcode
    if len(caption) <= 80:
        return caption
    cut = caption[:80].rstrip()
    i = cut.rfind(" ")
    return (cut if i == -1 else cut[:i]) + "..."

@app.post("/render")
def render(req: Req):
    try:
        kind, shortcode = parse_url(req.url)
    except ValueError as e:
        raise HTTPException(400, str(e))

    canonical = f"https://instagram.com/{kind}/{shortcode}"

    with tempfile.TemporaryDirectory() as tmp:
        L = instaloader.Instaloader(
            dirname_pattern=tmp, filename_pattern="{shortcode}",
            save_metadata=False, compress_json=False, download_comments=False,
            post_metadata_txt_pattern="", download_geotags=False, quiet=True,
        )

        try:
            post = instaloader.Post.from_shortcode(L.context, shortcode)
            L.download_post(post, target=tmp)
        except Exception as e:
            raise HTTPException(502, str(e)[:300])

        images = [b64(p) for p in sorted(glob.glob(f"{tmp}/*.jpg"))]
        videos = [b64(p) for p in sorted(glob.glob(f"{tmp}/*.mp4"))]
        title = make_title(post.caption, shortcode)

        html = env.get_template("template.html").render(
            title=title, url=canonical, url_text="instagram.com",
            images=images, videos=videos,
            caption=post.caption or "", profile=post.profile,
        )
        return {"title": title, "url": canonical, "shortcode": shortcode,
                "kind": kind, "html": html}