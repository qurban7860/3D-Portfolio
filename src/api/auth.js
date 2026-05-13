import { fetchJson } from "./client";

export async function login({ email, password }) {
  return fetchJson("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function register({ email, password, username }) {
  return fetchJson("/auth/register", {
    method: "POST",
    body: { email, password, username },
  });
}

export async function getCurrentUser(token) {
  return fetchJson("/auth/me", {
    method: "GET",
    token,
  });
}
