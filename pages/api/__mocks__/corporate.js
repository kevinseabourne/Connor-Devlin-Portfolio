export const mockCorporateData = [
  {
    id: "543139",
    company: "Company 1 Name Here",
    coverPhoto: "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
    date: new Date("21-11-2020"),
    description: "description goes here 1",
    duration: "3:17",
    testimonial: "awesome work",
    video: "https://player.vimeo.com/video/450172470?autoplay=1",
    videoId: "3233232",
  },
  {
    id: "653453",
    company: "Company 2 Name Here",
    coverPhoto: "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
    date: new Date("01-11-2020"),
    description: "description goes here 2",
    duration: "3:17",
    testimonial: "Looking forward to working with you again",
    video: "https://player.vimeo.com/video/450172470?autoplay=1",
    videoId: "3233232",
  },
  {
    id: "876531",
    company: "Company 3 Name Here",
    coverPhoto: "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
    date: new Date("06-01-2010"),
    description: "description goes here 3",
    duration: "4:57",
    testimonial: "",
    video: "https://player.vimeo.com/video/450172470?autoplay=1",
    videoId: "3233232",
  },
];

export const getAllCorporate = jest.fn();

export const addCorporate = jest.fn();

export const editCorporate = jest.fn();

export const deleteCorporate = jest.fn();
