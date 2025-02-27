import crypto from "crypto";
function generateContentHash(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}
function generateTimestampHash(prefix = "") {
  return `${prefix}${Date.now().toString(36)}`;
}
function generateShortBuildHash() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1e4).toString().padStart(4, "0");
  return Buffer.from(timestamp + random).toString("base64").replace(/[+/=]/g, "").substring(0, 10);
}
function appendHashToUrl(url, hash) {
  if (url.includes("?v=") || url.includes("&v=")) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${hash}`;
}
function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
const buildInfo = {
  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
  version: process.env.npm_package_version || "1.0.0",
  buildId: generateShortBuildHash(),
  environment: process.env.NODE_ENV || "development"
};
function generateBuildInfoHtml() {
  return `<!-- Build: ${buildInfo.buildId} | ${buildInfo.timestamp} | ${buildInfo.version} -->`;
}
export {
  appendHashToUrl,
  buildInfo,
  generateBuildInfoHtml,
  generateContentHash,
  generateShortBuildHash,
  generateTimestampHash,
  generateUUID
};
