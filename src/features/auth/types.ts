export type SendOtpPayload = {
  phone: string;
};

export type LoginPayload = {
  phone: string;
  otp: string;
};

export type LoginResponse = {
  token: string;
  is_new_user: boolean;
};
