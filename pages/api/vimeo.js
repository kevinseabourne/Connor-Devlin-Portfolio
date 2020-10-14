import http from "./httpService";

export async function getVimeoData(formData) {
  const videoId = formData.weddingVideoId
    ? formData.weddingVideoId
    : formData.corporateVideoId;

  const { data } = await http.get(
    process.env.NEXT_PUBLIC_VIMEO_ENDPOINT + videoId,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
      },
    }
  );

  const image = data.pictures.sizes[0].link;
  const coverPhoto = image.replace("100x75.jpg?r=pad", "960x540.jpg?r=pad");
  const description = data.description;

  const minutes = Math.floor(data.duration / 60);
  const seconds = data.duration - minutes * 60;
  let duration;
  if (seconds < 10) {
    duration = minutes + ":0" + seconds;
  } else {
    duration = minutes + ":" + seconds;
  }

  formData.coverPhoto = coverPhoto;
  formData.duration = duration;
  formData.description = description ? description : "";
  formData.date = formData.jobDate ? formData.jobDate : formData.weddingDate;
  formData.videoId = videoId;

  return formData;
}
