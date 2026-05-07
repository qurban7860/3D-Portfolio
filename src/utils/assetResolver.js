const localAssetMap = import.meta.glob("../assets/**/*.{png,jpg,jpeg,svg}", { eager: true, query: "?url", import: "default" });

const normalizeAssetPath = (value) => String(value).replace(/^\/+/, "").replace(/\\/g, "/");

export const resolveAssetUrl = (value) => {
  if (!value) return "";
  if (typeof value !== "string") return value;
  if (/^(https?:|\/\/|mailto:|tel:|#)/.test(value)) {
    return value;
  }

  const normalized = normalizeAssetPath(value);
  const assetPath = Object.keys(localAssetMap).find((asset) => asset.endsWith(normalized));
  return assetPath ? localAssetMap[assetPath] : value;
};
