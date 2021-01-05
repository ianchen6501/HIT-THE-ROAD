const BASE_URL = "https://hit-the-road.mings.tw";

export function getAllUnfinishedschedulesAPI(id) {
  return fetch(`${BASE_URL}/schedules/${id}?isFinished=0`).then((response) =>
    response.json()
  );
}

export function getAllFinishedschedulesAPI(id) {
  return fetch(`${BASE_URL}/schedules/${id}?isFinished=1`).then((response) =>
    response.json()
  );
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

export const getScheduleContent = (userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${userId}/${scheduleId}`).then((res) =>
    res.json()
  );
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

export const getFinishPlanAPI = (userId, scheduleId) => {
  return fetch(`${BASE_URL}/schedules/${userId}/${scheduleId}`).then((res) =>
    res.json()
  );
};

export const getSinglePostAPI = (scheduleId) => {
  return fetch(`${BASE_URL}/posts/${scheduleId}`).then((res) => res.json());
};

export const deleteScheculeAPI = (id, json) => {
  return fetch(`${BASE_URL}/schedules/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  }).then((result) => {
    result.json();
  });
};

export const getUserDataAPI = (json) => {
  return fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: json,
  }).then((response) => response.json());
};

export const ToggleScheduleIsfinishedAPI = (
  scheduleId,
  checkedStatus,
  body
) => {
  return fetch(
    `${BASE_URL}/schedules/${scheduleId}?isFinished=${checkedStatus}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  ).then((response) => {
    return response.json();
  });
};
