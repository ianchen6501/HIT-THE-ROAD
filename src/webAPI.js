const BASE_URL = "https://hit-the-road.mings.tw";

export function getAll(url) {
  return fetch(url).then((response) => response.json());
}

export function updateSchedule(url, json) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  }).then((response) => response.json());
}

// TODO:
export const getScheduleContent = (userId, scheduleId) => {
  return fetch(`${BASE_URL}/${userId}/${scheduleId}`).then((res) => res.json());
};

export const saveMarkersAPI = (markers, userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      markers,
      UserId: userId,
    }),
  }).then((res) => res.json());
};

export const savePostItsAPI = (
  spots,
  spotsIds,
  postItId,
  userId,
  scheduleId
) => {
  return fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      spots,
      spotsIds,
      postItId,
      UserId: userId,
    }),
  }).then((res) => res.json());
};

export const saveRoutesAPI = (routes, userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      routes,
      UserId: userId,
    }),
  }).then((res) => res.json());
};

export const saveDailyRoutinesAPI = (
  dailyRoutines,
  spotId,
  userId,
  scheduleId
) => {
  return fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dailyRoutines,
      spotId,
      UserId: userId,
    }),
  }).then((res) => res.json());
};

export const saveDailyRoutinesKeyAPI = (dailyRoutines, userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dailyRoutines,
      UserId: userId,
    }),
  }).then((res) => res.json());
};

// TODO:
export const getFinishPlanAPI = (userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${userId}/${scheduleId}`).then((res) =>
    res.json()
  );
};

export const getSinglePostAPI = (scheduleId) => {
  return fetch(`${BASE_URL}/posts/${scheduleId}`).then((res) => res.json());
};
