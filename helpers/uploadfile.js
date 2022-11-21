const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = (files, validExtentions = ["jpg", "png", "jpeg", "gif"]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { file } = files;
      const fileWithExtension = file.name.split(".");
      const extensionFile = fileWithExtension[fileWithExtension.length - 1];
      if (!validExtentions.includes(extensionFile)) {
        return reject(`Invalid Extension. Valid Extension ${validExtentions}`);
      }
      console.log(fileWithExtension);

      //const tmpNameFile = uuidv4() + "." + extensionFile;
      //return res.json({ msg: "hola" });

      //const uploadPath = path.join(__dirname, "../uploads/", tmpNameFile);

      /*file.mv(uploadPath, function (err) {
          if (err) {
            return reject(err);
          }
          resolve(uploadPath);
        });*/
      console.log(file);
      const { tempFilePath } = file;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      resolve(secure_url);
    } catch (error) {
      console.log("hola");
      console.log(error);
      reject(error);
    }
  });
};

const deleteFile = (
  sourceImg,
  validExtentions = ["jpg", "png", "jpeg", "gif"]
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const nameArr = sourceImg.split("/");
      const nameFile = nameArr[nameArr.length - 1];
      const [public_id] = nameFile.split(".");
      await cloudinary.uploader.destroy(public_id);
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};

/*
const updateFile=async (req,res)=>{
    const {id}
    res.json({

    })
}

*/

module.exports = {
  uploadFile,
  deleteFile,
};
