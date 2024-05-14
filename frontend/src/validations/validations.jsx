import { addToken } from "../redux/features/login/tokenSlice";
import { getItemWithExpiration } from "../services/LocalStorage";

export const getTokenFromLocalStorage = () => {
  return async (dispatch) => {
    const token = await getItemWithExpiration("token");
    if (token) {
      dispatch(addToken(token));
    }
  };
};

export const validateRegisterData = (password, phone_number) => {
  const errors = [];

  // Kiểm tra xem password có tồn tại và không trống
  if (!password || password.trim() === "") {
    errors.push("Password is required.");
  }

  // Kiểm tra xem phone_number có tồn tại và là một số điện thoại hợp lệ
  if (!phone_number || !isValidPhoneNumber(phone_number)) {
    errors.push("Số điện thoại không hợp lệ");
  }

  // Nếu có lỗi, trả về mảng lỗi
  if (errors.length > 0) {
    return errors;
  }

  // Nếu không có lỗi, trả về null để cho biết không có lỗi
  return null;
};

// Hàm kiểm tra số điện thoại hợp lệ
export const isValidPhoneNumber = (phone_number) => {
  // Điều kiện kiểm tra số điện thoại
  // Thay bằng điều kiện phù hợp với định dạng số điện thoại của bạn
  const phoneNumberRegex = /^\d{10}$/;

  return phoneNumberRegex.test(phone_number);
};
