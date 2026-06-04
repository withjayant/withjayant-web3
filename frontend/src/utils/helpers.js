export function shortAddr(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function shortHash(hash) {
  if (!hash) return "";
  return hash.slice(0, 8) + "…" + hash.slice(-6);
}

export function timeAgo(timestamp) {
  const sec = Math.floor(Date.now() / 1000 - Number(timestamp));
  if (sec < 60)    return sec + "s ago";
  if (sec < 3600)  return Math.floor(sec / 60) + "m ago";
  if (sec < 86400) return Math.floor(sec / 3600) + "h ago";
  return Math.floor(sec / 86400) + "d ago";
}

export function initials(name) {
  if (!name) return "?";
  return name.slice(0, 2).toUpperCase();
}

const COLORS = [
  ["rgba(124,92,191,0.2)", "#7C5CBF"],
  ["rgba(93,202,165,0.2)", "#5DCAA5"],
  ["rgba(212,83,126,0.2)", "#D4537E"],
  ["rgba(240,180,41,0.2)", "#F0B429"],
  ["rgba(55,138,221,0.2)", "#378ADD"],
  ["rgba(239,100,39,0.2)", "#EF6427"],
];

export function avatarColor(addr) {
  if (!addr) return COLORS[0];
  const idx = parseInt(addr.slice(2, 4), 16) % COLORS.length;
  return COLORS[idx];
}

let _toast = null;
export function registerToast(fn) { _toast = fn; }
export function toast(msg, type = "info") { if (_toast) _toast(msg, type); }
