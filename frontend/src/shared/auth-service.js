import axios from "./api";

const authService = {
  async login(credentials) {
    const { data } = await axios.post(`v1/auth/login`, credentials);
    return data;
  },
  async refreshToken(refreshToken) {
    const { data } = await axios.post(
      `v1/auth/refresh-token?refreshToken=${refreshToken}`
    );
    return data;
  },
  async validateToken(token) {
    const { data } = await axios.get(`v1/auth/validate-token?token=${token}`);
    return data;
  },
};

export default authService;
