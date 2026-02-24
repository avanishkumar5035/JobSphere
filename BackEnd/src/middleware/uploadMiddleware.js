const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploads
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// File filter (optional, to accept images and documents)
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpg|jpeg|png|svg|webp|pdf|doc|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime (simplified for documents as docx has long mimes)
    const mimetypes = /image\/jpeg|image\/png|image\/svg\+xml|image\/webp|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;
    const mimetype = mimetypes.test(file.mimetype);

    if (extname) { // Relying more on extname for flexibility with varied doc mimetypes
        return cb(null, true);
    } else {
        cb(new Error('Images and Documents (PDF/DOC) only!')); // Reject file
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

module.exports = upload;
