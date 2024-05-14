// Lưu item vào localStorage với thời hạn sống (seconds)
function setItemWithExpiration(key, value, expirationInHour) {
  const now = new Date();
  const expirationTime = now.getTime() + expirationInHour * 60 * 1000;
  const item = {
    value: value,
    expirationTime: expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Lấy item từ localStorage và kiểm tra thời gian hết hạn
async function getItemWithExpiration(key) {
  const item = JSON.parse(localStorage.getItem(key));
  if (item && item.expirationTime > new Date().getTime()) {
    return item.value;
  } else if (item && item.expirationTime === new Date().getTime()) {
    // call api logout
    // Xóa item khỏi localStorage nếu đã hết hạn
    localStorage.removeItem(key);

    return false;
  } else {
    localStorage.removeItem(key);
    return false;
  }
}

export { setItemWithExpiration, getItemWithExpiration };
