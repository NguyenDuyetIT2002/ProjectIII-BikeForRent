async function ImagetoBase64(file, targetWidth = 500, targetHeight = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        const scaleX = targetWidth / img.width;
        const scaleY = targetHeight / img.height;
        const scale = Math.max(scaleX, scaleY);

        const x = (targetWidth - img.width * scale) / 2;
        const y = (targetHeight - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        const fileType = file.type;
        const format = fileType.includes("jpeg")
          ? "image/jpeg"
          : fileType.includes("png")
          ? "image/png"
          : "image/jpeg";
        const base64String = canvas.toDataURL(format);

        resolve(base64String);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}

export { ImagetoBase64 };
