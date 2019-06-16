const fs = require('fs');
const crypto = require('crypto');
// @TODO: Make Configurable / persistent
const vaultPath = '/home/adam/Dropbox/1Password.opvault';

module.exports = class HydrogenPasswod {
  constructor() {
    this.validateProfile();
  }

  unlockVault (password) {
    const { salt, iterations, masterKey } = this._profile;
    const { key, hmac } = this.deriveKeys(password, Buffer.from(salt, 'base64'), iterations);

    // master_keys
    const encryptedKey = Buffer.from(masterKey, 'base64');

    // decrypt_opdata
    const keyData = encryptedKey.slice(0, encryptedKey.length - 32);
    const macData = encryptedKey.slice(encryptedKey.length - 32);

    // check_hmac
    const computedHmac = crypto.createHmac('sha256', hmac).update(keyData).digest('hex');
    if (computedHmac !== macData.toString('hex')) {
      throw new Error('Error Decrypting Key');
    }
    // ---

    // decrypt_data

    // decrypt_keys
  }

  lockVault () {

  }

  validateProfile () {
    const profileContents = fs.readFileSync(vaultPath + '/default/profile.js', 'utf8');
    if (!profileContents.startsWith('var profile=') || !profileContents.endsWith(';')) {
      console.error('Malformed Profile');
    }

    this._profile = JSON.parse(profileContents.substr(12, profileContents.length - 13));

    return true;
  }

  deriveKeys(password, salt, iterations) {
    const derivedKey = crypto.pbkdf2Sync(Buffer.from(password), salt, iterations, 64, 'sha512');
    const key = derivedKey.slice(0, 32);
    const hmac = derivedKey.slice(32, 64);

    return { key, hmac };
  }
}
