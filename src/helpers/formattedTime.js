export const formattedStartTime = (event) => {
  const datetime = event.startTime;

  return datetime.replace("T", " ").replace(":00.000Z", "");
};

export const formattedEndTime = (event) => {
  return event.endTime.replace("T", " ").replace(":00.000Z", "");
};
