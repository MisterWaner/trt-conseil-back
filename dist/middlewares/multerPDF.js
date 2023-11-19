import multer from "multer";
// Multer config
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
        return cb(new Error("Seuls les fichiers PDF sont autorisés !"));
    }
    else {
        cb(null, true);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/resumes");
    },
    filename: (req, file, cb) => {
        const { userId } = req.body;
        if (!userId)
            return cb(new Error("Paramètre manquant"));
        const partOfUserId = userId.substring(0, 4);
        const number = Math.floor(150 + Math.random() * 900);
        const suffixe = new Date().getFullYear();
        const prefixe = `${partOfUserId}-${number}-${suffixe}`.replace(/\s/g, "-");
        const fileExtension = file.originalname.split(".").pop();
        const newFileName = `${prefixe}.${fileExtension}`;
        cb(null, newFileName);
    },
});
const uploadResume = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});
export default uploadResume;
