"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
// const inputPath = "image.png";
// const outputPath = "image.webp";
function convertToWebP(inputPath, outputPath, quality = 100) {
    (0, sharp_1.default)(inputPath)
        .webp({ quality })
        .toBuffer()
        .then((data) => {
        fs_1.default.writeFileSync(outputPath, data);
    })
        .catch((err) => {
        console.error("Error converting image:", err);
    });
}
// function findImagesOfTypeAndConvertToWebP(
//   inputExtension: string,
//   inputPath: string,
//   outputPath: string
// ) {
//   const subFilesAndFolders: string[] = fs.readdirSync(inputPath);
//   console.log(subFilesAndFolders);
//   subFilesAndFolders.forEach((subFileOrFolder) => {
//     const currentFileOrFolderPath = path.join(inputPath, subFileOrFolder);
//     const isDirectory = fs.lstatSync(currentFileOrFolderPath).isDirectory();
//     if (!isDirectory) {
//       if (subFileOrFolder.endsWith(inputExtension)) {
//         const outputPathForFile = path.join(outputPath, subFileOrFolder);
//         convertToWebP(currentFileOrFolderPath, outputPathForFile);
//       }
//     } else {
//       findImagesOfTypeAndConvertToWebP(
//         inputExtension,
//         currentFileOrFolderPath,
//         outputPath
//       );
//     }
//   });
// }
// function findImagesOfTypeAndConvertToWebP(
//   inputExtension: string,
//   inputPath: string,
//   outputPath: string
// ) {
//   const subFilesAndFolders: string[] = fs.readdirSync(inputPath);
//   // Create the output folder if it doesn't exist
//   if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath);
//   }
//   subFilesAndFolders.forEach((subFileOrFolder) => {
//     const currentFileOrFolderPath = path.join(inputPath, subFileOrFolder);
//     const isDirectory = fs.lstatSync(currentFileOrFolderPath).isDirectory();
//     if (!isDirectory) {
//       if (subFileOrFolder.endsWith(inputExtension)) {
//         const outputPathForFile = path.join(outputPath, subFileOrFolder);
//         convertToWebP(currentFileOrFolderPath, outputPathForFile);
//       }
//     } else {
//       const outputFolderPath = path.join(outputPath, subFileOrFolder);
//       fs.mkdirSync(outputFolderPath);
//       findImagesOfTypeAndConvertToWebP(
//         inputExtension,
//         currentFileOrFolderPath,
//         outputFolderPath
//       );
//     }
//   });
// }
function findImagesOfTypeAndConvertToWebP(inputExtension, inputPath, outputPath) {
    const subFilesAndFolders = fs_1.default.readdirSync(inputPath);
    // Create the output folder if it doesn't exist
    if (!fs_1.default.existsSync(outputPath)) {
        fs_1.default.mkdirSync(outputPath);
    }
    subFilesAndFolders.forEach((subFileOrFolder) => {
        const currentFileOrFolderPath = path_1.default.join(inputPath, subFileOrFolder);
        const isDirectory = fs_1.default.lstatSync(currentFileOrFolderPath).isDirectory();
        if (!isDirectory) {
            if (subFileOrFolder.endsWith(inputExtension)) {
                const fileNameWithoutExtension = path_1.default.parse(subFileOrFolder).name;
                const outputPathForFile = path_1.default.join(outputPath, `${fileNameWithoutExtension}.webp`);
                convertToWebP(currentFileOrFolderPath, outputPathForFile);
            }
        }
        else {
            const outputFolderPath = path_1.default.join(outputPath, subFileOrFolder);
            fs_1.default.mkdirSync(outputFolderPath);
            findImagesOfTypeAndConvertToWebP(inputExtension, currentFileOrFolderPath, outputFolderPath);
        }
    });
}
findImagesOfTypeAndConvertToWebP(".png", "input", "output");
