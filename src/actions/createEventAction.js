export const createEventAction = async ({ request }) => {
  const formData = await request.formData();
  try {
    const event = {
      createdBy: formData.get("createdBy"),
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      categoryIds: JSON.parse(formData.get("categoryIds")),
      location: formData.get("location"),
      startTime: new Date(formData.get("startTime")).toISOString(),
      endTime: new Date(formData.get("endTime")).toISOString(),
    };
    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      throw new Error("Failed to submit event");
    }
    console.log("Event successfully submitted!");
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
};
