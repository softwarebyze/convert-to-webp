import fs from "fs";
import path from "path";
import sharp from "sharp";

function convertToWebP(
  inputPath: string,
  outputPath: string,
  quality: number = 100
) {
  sharp(inputPath)
    .webp({ quality })
    .toBuffer()
    .then((data) => {
      fs.writeFileSync(outputPath, data);
    })
    .catch((err) => {
      console.error("Error converting image:", err);
    });
}

function findImagesOfTypeAndConvertToWebP(
  inputExtension: string,
  inputPath: string,
  outputPath: string
) {
  const subFilesAndFolders: string[] = fs.readdirSync(inputPath);

  // Create the output folder if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  subFilesAndFolders.forEach((subFileOrFolder) => {
    const currentFileOrFolderPath = path.join(inputPath, subFileOrFolder);
    const isDirectory = fs.lstatSync(currentFileOrFolderPath).isDirectory();

    if (!isDirectory) {
      if (subFileOrFolder.endsWith(inputExtension)) {
        const fileNameWithoutExtension = path.parse(subFileOrFolder).name;
        const outputPathForFile = path.join(
          outputPath,
          `${fileNameWithoutExtension}.webp`
        );
        convertToWebP(currentFileOrFolderPath, outputPathForFile);
      }
    } else {
      const outputFolderPath = path.join(outputPath, subFileOrFolder);
      fs.mkdirSync(outputFolderPath);
      findImagesOfTypeAndConvertToWebP(
        inputExtension,
        currentFileOrFolderPath,
        outputFolderPath
      );
    }
  });
}

findImagesOfTypeAndConvertToWebP(".png", "input", "output");
