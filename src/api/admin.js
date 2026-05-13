const BASE_URL = "/api/super-admin";

export const fetchUsers = async (token) => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }
  return response.json();
};

export const deleteUser = async (token, id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete user");
  }
  return response.json();
};
