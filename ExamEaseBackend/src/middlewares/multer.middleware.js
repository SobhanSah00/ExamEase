import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
    // Generate a unique filename
    // const uniqueFilename = uuidv4() + path.extname(file.originalname);
    // cb(null, uniqueFilename);

      cb(null, file.originalname)
      /*in this case a potential problem is there is no way to know the original name of the file
       so we can't use the original name as the filename
       like if we add same file twice or many times , the second time will overwrite the first one */
    }
  })
  
export const upload = multer({ 
    storage, 
    //storage = storage also we write like this but we dont beacuse it is in es6 module 
})

// import multer from "multer"; 
// import { v4 as uuidv4 } from "uuid";
// import path from "path";
// import fs from "fs";

// // Ensure the directory exists
// const uploadDir = "./public/temp";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir); // Store files in the `public/temp` folder
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename using uuid and keep the file extension
//         const uniqueFilename = uuidv4() + path.extname(file.originalname);
//         cb(null, uniqueFilename);
//     }
// });

// export const upload = multer({
//     storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50 MB
//     fileFilter: (req, file, cb) => {
//         // Accept video files only
//         if (file.mimetype.startsWith("video/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only video files are allowed!"), false);
//         }
//     }
// });
