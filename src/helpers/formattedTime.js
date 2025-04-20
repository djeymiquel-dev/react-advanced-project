export const formattedStartTime = (event) => {
  const datetime = event.startTime;

  return datetime.replace("T", " ").replace(":00.000Z", "");
};

export const formattedEndTime = (event) => {
  return event.endTime.replace("T", " ").replace(":00.000Z", "");
};

export const formatDateTimeLocal = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
