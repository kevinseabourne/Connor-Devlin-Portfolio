export const mockWeddingData = [
  {
    id: "42145",
    coverPhoto: "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
    date: new Date("02-12-2018"),
    description: "",
    duration: "4:55",
    location: {
      state: "WA",
      suburb: "Perth",
    },
    partners: [
      {
        firstName: "Jamie",
        lastName: "Mason",
      },
      {
        firstName: "John",
        lastName: "Wayne",
      },
    ],
    testimonial: "Amazing wedding",
    video: "https://player.vimeo.com/video/447459730?autoplay=1",
    videoId: "3233232",
  },
  {
    id: "54666",
    coverPhoto: "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
    date: new Date("12-11-2015"),
    description: "",
    duration: "6:53",
    location: {
      state: "WA",
      suburb: "Perth",
    },
    partners: [
      {
        firstName: "Alex",
        lastName: "Johnson",
      },
      {
        firstName: "Chris",
        lastName: "Addams",
      },
    ],
    testimonial: "",
    video: "https://player.vimeo.com/video/447459730?autoplay=1",
    videoId: "3233232",
  },
  {
    id: "25678",
    coverPhoto: "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
    date: new Date("02-03-2020"),
    description: "",
    duration: "5:45",
    location: {
      state: "WA",
      suburb: "Perth",
    },
    partners: [
      {
        firstName: "Rose",
        lastName: "Wood",
      },
      {
        firstName: "Ryan",
        lastName: "Davis",
      },
    ],
    testimonial: "Memories to watch forever !",
    video: "https://player.vimeo.com/video/447459730?autoplay=1",
    videoId: "3233232",
  },
];

export const getAllWeddings = jest.fn();

export const addWedding = jest.fn();

export const editWedding = jest.fn();

export const deleteWedding = jest.fn();
