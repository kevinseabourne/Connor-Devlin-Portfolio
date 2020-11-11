export const mockCorporateData = [
  {
    id: "543132",
    company: "Company Name Here",
    coverPhoto: "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
    date: new Date("01-11-2020"),
    description: "description goes here",
    duration: "3:17",
    testimonial: "awesome work",
    video: "https://player.vimeo.com/video/450172470?autoplay=1",
    videoId: "3233232",
  },
];

export const getAllCorporate = jest.fn();

export const addCorporate = jest.fn();

export const editCorporate = jest.fn();

export const deleteCorporate = jest.fn();
