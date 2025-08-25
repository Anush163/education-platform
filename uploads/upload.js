// middleware/upload.js
import multer from "multer";
import path from "path";

// where to save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");   // local "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

export default upload;
