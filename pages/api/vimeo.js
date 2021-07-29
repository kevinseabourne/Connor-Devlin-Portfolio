import http from "./httpService";
import logger from "./logger";

export async function getVimeoData(formData) {
  const videoId = formData.weddingVideoId
    ? formData.weddingVideoId
    : formData.corporateVideoId;
  try {
    const { data } = await http.get(
      process.env.NEXT_PUBLIC_VIMEO_ENDPOINT + videoId,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
        },
      }
    );
    const coverPhoto = data.pictures.sizes[3].link;
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
  } catch (error) {
    logger.log(error);

    const errorMessage =
      error.response.data.error_code === 2204
        ? "Cannot access private video"
        : error.response.data.error;

    return { errorMessage };
  }
}
