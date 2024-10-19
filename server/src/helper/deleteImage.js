const fs = require("fs").promises;
const deleteImage = async (userImagePath) => {
  try {
    await fs.unlink(userImagePath);
    await console.log("User image was deleted");
  } catch (error) {
    console.error("User Image doesn't exist");
  }
};
module.exports = { deleteImage };
