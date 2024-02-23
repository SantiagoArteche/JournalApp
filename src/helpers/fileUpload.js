export const fileUpload = async (file) => {
  if (!file) throw new Error("No archive to upload");

  const cloudUrl = `https://api.cloudinary.com/v1_1/santiago-arteche/upload`;

  const formData = new FormData();

  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    console.log(resp);
    if (!resp.ok) throw new Error("Image can't upload");

    const cloudResp = await resp.json();
    console.log(cloudResp);
    return cloudResp.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
