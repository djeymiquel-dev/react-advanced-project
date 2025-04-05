export const eventLoader = async () => {
  const response = await fetch(`http://localhost:3000/events`);
  if (!response.ok) {
    throw new Error("Failed to fetch data", { status: response.status });
  }
  return await response.json();
};
