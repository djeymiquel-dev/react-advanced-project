export const addEventLoader = async () => {
  const response = await fetch(`http://localhost:3000/events`);
  if (!response.ok) {
    throw new Response("Failed to fetch events", { status: response.status });
  }
  return await response.json();
};
