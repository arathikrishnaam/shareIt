const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    password: { type: String },
    downloadCount: { type: Number, default: 0 },
    expiresAt: { type: Date },
});

module.exports = mongoose.model("File", fileSchema);
