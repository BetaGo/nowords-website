import { JSEncrypt } from "jsencrypt";

export class Encrypt {
  private static instance: Encrypt;

  public static getInstance() {
    if (!Encrypt.instance) {
      Encrypt.instance = new Encrypt();
    }
    return Encrypt.instance;
  }

  private _JSEncrypt: JSEncrypt;

  constructor() {
    this._JSEncrypt = new JSEncrypt();
  }

  rsaEncrypt = async (publicKey: string, data: string) => {
    this._JSEncrypt.setPublicKey(publicKey);
    return this._JSEncrypt.encrypt(data);
  };
}
