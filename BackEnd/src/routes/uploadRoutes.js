const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

router.post('/', (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).send({ message: 'No image file provided' });
        }

        res.send({
            message: 'Image Uploaded successfully',
            image: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    });
});

module.exports = router;
