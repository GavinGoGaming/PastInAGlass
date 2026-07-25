import express from 'express';
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";
import multer from "multer";
import sharp from "sharp";

const EDITOR_KEY = process.env.EDITOR_KEY || 'default';

if (!EDITOR_KEY || EDITOR_KEY === 'default') {
    throw new Error("EDITOR_KEY environment variable is required");
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const provided = req.headers["x-editor-key"];
    if (typeof provided !== "string" || !timingSafeEqual(provided, EDITOR_KEY)) {
        console.log(provided);
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

function timingSafeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

const PORT = process.env.PORT || 8080;
const app = express();

const POSTS_DIR = path.join(process.cwd(), "content/posts");
if (!await fs.stat(POSTS_DIR).catch(() => false)) {
    console.error(`Posts directory not found: ${POSTS_DIR} -- Creating now...`);
    await fs.mkdir(POSTS_DIR, { recursive: true });
}

interface Post {
    slug: string;
    title: string;
    tags: string[];
    published: boolean;
    images: string[];
    content: string;
}

let cache: Post[] | null = null;

function postImagesDir(slug: string) {
    return path.join(POSTS_DIR, slug, "images");
}

async function loadPosts(): Promise<Post[]> {
    if (cache) return cache;
    const files = await fs.readdir(POSTS_DIR);
    const posts = await Promise.all(
        files.filter(f => f.endsWith(".md")).map(async (file) => {
            const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
            const slug = path.basename(file, ".md");
            const { data, content } = matter(raw);
            return { images: [], ...data, slug, content } as unknown as Post;
        })
    );
    cache = posts;
    return posts;
}

app.get('/editor-key', requireAuth, (req, res) => {
    res.json({ ok: true });
});

app.get("/posts", async (req, res) => {
    const posts = await loadPosts();
    res.json(posts.filter(p => p.published));
});

app.get("/posts/:slug", async (req, res) => {
    const posts = await loadPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
});

app.put("/posts/:slug",requireAuth, express.json(), async (req, res) => {
  const { title, tags, published, content, images } = req.body;
  const fileContent = matter.stringify(content, { title, tags, published, images: images ?? [] });
  await fs.writeFile(path.join(POSTS_DIR, `${req.params.slug}.md`), fileContent);
  cache = null;
  res.json({ ok: true });
});

app.get('/posts/:slug/raw', async (req, res) => {
    const filePath = path.join(POSTS_DIR, `${req.params.slug}.md`);
    try {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        res.type('text/plain').send(rawContent);
    } catch (err) {
        res.status(404).json({ error: 'Not found' });
    }
});

// Serve an image by filename (filename doubles as the "uuid" param)
app.get('/posts/:slug/image/:uuid', async (req, res) => {
    const filePath = path.join(postImagesDir(req.params.slug), req.params.uuid);
    try {
        const file = await fs.readFile(filePath);
        res.type(path.extname(filePath)).send(file);
    } catch (err) {
        res.status(404).json({ error: 'Not found' });
    }
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
async function updatePostImages(slug: string, updater: (images: string[]) => string[]) {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const images: string[] = data.images ?? [];
    const updatedImages = updater(images);
    const fileContent = matter.stringify(content, { ...data, images: updatedImages });
    await fs.writeFile(filePath, fileContent);
    cache = null;
    return updatedImages;
}

app.post('/posts/:slug/image',requireAuth, upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const dir = postImagesDir(req.params.slug as string);
    await fs.mkdir(dir, { recursive: true });

    const processed = await sharp(req.file.buffer)
        .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();

    const filename = `${crypto.randomUUID()}.webp`;
    await fs.writeFile(path.join(dir, filename), processed);

    try {
        const images = await updatePostImages(req.params.slug as string, (imgs) => [...imgs, filename]);
        res.json({ filename, images });
    } catch (err) {
        // post .md doesn't exist yet — image is saved but orphaned until the post is created
        res.status(404).json({ error: "Post not found — image saved but not attached", filename });
    }
});

app.delete('/posts/:slug/image/:uuid', requireAuth, async (req, res) => {
    const filePath = path.join(postImagesDir(req.params.slug as string), req.params.uuid as string);
    try {
        await fs.unlink(filePath);
    } catch (err) {
        return res.status(404).json({ error: 'Not found' });
    }

    const images = await updatePostImages(req.params.slug as string , (imgs) => imgs.filter(f => f !== req.params.uuid));
    res.json({ ok: true, images });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});