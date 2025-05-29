export const generatePassword = (
  host: string,
  username: string,
  masterPassword: string,
  length = 16
) => {
  if (!host || !username || !masterPassword) {
    return "";
  }

  const seed = `${host}:${username}:${masterPassword}`;

  const hash = createHash(seed);

  return createPasswordFromHash(hash, length);
};

const createHash = (str: string) => {
  let hash = 0;
  const chars = [];

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
    chars.push(char);
  }

  let extendedHash = "";
  for (let i = 0; i < 4; i++) {
    hash = (hash << 5) - hash + (chars[i % chars.length] || 0);
    extendedHash += Math.abs(hash).toString(36);
  }

  return extendedHash;
};

const createPasswordFromHash = (hash: string, length: number) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const allChars = lowercase + uppercase + numbers + symbols;
  let password = "";

  if (length >= 4) {
    password +=
      lowercase[parseInt(hash.substring(0, 2), 36) % lowercase.length];
    password +=
      uppercase[parseInt(hash.substring(2, 4), 36) % uppercase.length];
    password += numbers[parseInt(hash.substring(4, 6), 36) % numbers.length];
    password += symbols[parseInt(hash.substring(6, 8), 36) % symbols.length];
  }

  let hashIndex = 8;
  while (password.length < length) {
    if (hashIndex >= hash.length) {
      hash = createHash(hash + password.length);
      hashIndex = 0;
    }

    const index =
      parseInt(hash.substring(hashIndex, hashIndex + 2), 36) % allChars.length;
    password += allChars[index];
    hashIndex += 2;
  }

  return shuffleString(password.substring(0, length), hash);
};

const shuffleString = (str: string, seed: string) => {
  const arr = str.split("");
  let seedNum = 0;

  for (let i = 0; i < seed.length; i++) {
    seedNum += seed.charCodeAt(i);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    seedNum = (seedNum * 1103515245 + 12345) & 0x7fffffff;
    const j = seedNum % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join("");
};
