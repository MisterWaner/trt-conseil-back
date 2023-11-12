import multer from "multer";

// Multer config
const fileFilter = (req: any, file: any, cb: any) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("Seuls les fichiers PDF sont autorisés !"));
    } else {
        cb(null, true);
    }
};

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, "uploads/resumes");
    },
    filename: (req: any, file: any, cb: any) => {
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
        fileSize: 1024 * 1024 * 3, // 3MB
        files: 1,
    },
});

export default uploadResume;
