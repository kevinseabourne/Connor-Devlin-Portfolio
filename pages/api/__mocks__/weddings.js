export const mockWeddingData = [
  {
    id: "42145",
    coverPhoto:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    date: "02/12/2018",
    description: "description...",
    duration: "4:55",
    location: {
      state: "WA",
      suburb: "Fremantle",
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
    coverPhoto:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    date: "12/11/2015",
    description: "description...",
    duration: "6:53",
    location: {
      state: "WA",
      suburb: "Albany",
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
    videoId: "3233183",
  },
  {
    id: "25678",
    coverPhoto:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1649&q=80",
    date: "02/03/2020",
    description: "description...",
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
    videoId: "3233132",
  },
];

export const getAllWeddings = jest.fn();

export const addWedding = jest.fn();

export const editWedding = jest.fn();

export const deleteWedding = jest.fn();
