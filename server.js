const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
require("dotenv").config();

const File = require("./models/File");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect(process.env.MONGO);

// Multer Configuration for File Uploads
const upload = multer({
    dest: "uploads",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter(req, file, cb) {
        const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only .jpg, .png, or .pdf files are allowed"));
        }
        cb(null, true);
    },
});

// Home Page Route
app.get("/", async (req, res) => {
    const files = await File.find();
    res.render("index", { files });
});

// File Upload Route
app.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
    };

    if (req.body.password) {
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);
    const fileLink = `${req.headers.origin}/file/${file.id}`;
    const qrCode = await QRCode.toDataURL(fileLink);

    res.render("index", { fileLink, qrCode, files: [] });
});

// Download Route
app.get("/file/:id", handleDownload);
app.post("/file/:id", handleDownload);

async function handleDownload(req, res) {
    const file = await File.findById(req.params.id);

    // Check for expiration
    if (file.expiresAt && file.expiresAt < new Date()) {
        return res.status(410).send("File link has expired.");
    }

    // Password-protected files
    if (file.password) {
        if (!req.body.password) {
            return res.render("password", { error: false });
        }
        if (!(await bcrypt.compare(req.body.password, file.password))) {
            return res.render("password", { error: true });
        }
    }

    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
}

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
