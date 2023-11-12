import multer from "multer";
// Multer config
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("Seuls les fichiers PDF sont autorisés !"));
    }
    else {
        cb(null, true);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumes");
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname.split(".")[0];
        const id = req.params.id;
        const fileExtension = file.originalname.split(".").pop();
        const newFileName = `${originalname}-${id}-${Date.now()}.${fileExtension}`;
        cb(null, newFileName);
    },
});
const uploadResume = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3,
        files: 1,
    },
});
export default uploadResume;
