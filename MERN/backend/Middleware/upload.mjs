import multer from 'multer';

// Configure Multer to store files in memory (for Cloudinary)
const upload = multer({
	storage: multer.memoryStorage(), // File stored as Buffer in memory
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter: (req, file, cb) => {
		// Accept only images
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only images are allowed!'), false);
		}
	},
});

// Middleware to handle file upload
export const uploadImage = upload.single('image');