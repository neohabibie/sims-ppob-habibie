export function required(v) {
  return v !== null && v !== undefined && String(v).trim() !== '';
}
export function emailValid(v) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(v).toLowerCase());
}
export function amountValid(v, min=10000, max=1000000) {
  if (!v) return false;
  const n = Number(String(v).replace(/[^0-9]/g,''));
  return !isNaN(n) && n >= min && n <= max;
}
export function imageSizeUnder(file, kb=100) {
  if(!file) return false;
  return (file.size / 1024) <= kb;
}
