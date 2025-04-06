export const updateEvent = async ({ request, params }) => {
  const formData = await request.formData();
  const eventId = params.eventId;

  const updatedEvent = {
    title: formData.get("title"),
    description: formData.get("description"),
    startTime: new Date(formData.get("startTime")).toISOString(),
    endTime: new Date(formData.get("endTime")).toISOString(),
    image: formData.get("image"),
  };

  const response = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  });

  if (!response.ok) {
    throw new Error("Failed to update event");
  }

  return { ok: true };
};

export const createEvent = async ({ request }) => {
  const formData = await request.formData();

  const newEvent = {
    createdBy: parseInt(formData.get("userId")),
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    categoryIds: JSON.parse(formData.get("categoryIds") || "[]"),
    location: formData.get("location"),
    startTime: new Date(formData.get("startTime")).toISOString(),
    endTime: new Date(formData.get("endTime")).toISOString(),
  };

  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return { ok: true };
};

export const deleteEvent = async ({ params }) => {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  return { ok: true };
};
