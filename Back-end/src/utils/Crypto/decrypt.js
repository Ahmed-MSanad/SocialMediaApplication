import CryptoJS from "crypto-js";

export const decrypt = ({ encryptedData, secretKey = process.env.CRYPTO_KEY }) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};