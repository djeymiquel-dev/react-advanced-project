export const postLoader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  if (!events.ok) {
    throw new Error("Failed to fetch data");
  }
  return await events.json();
};
