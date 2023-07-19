import { readFile, writeFile } from 'fs/promises';
import { UrlEntry } from "./interfaces";

export const loadFile = async (): Promise<UrlEntry[] | any> => {
  try {
    const filename: string = process.env.FILE_PATH || "";
    const data = await readFile(filename, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    throw err;
  }
};

export const saveFile = async (content: UrlEntry[]) => {
  try {
    const filename: string = process.env.FILE_PATH || "";
    await writeFile(filename, JSON.stringify(content, null, 2), 'utf8');
  } catch (err) {
    throw err;
  }
}

export const generateId = (length = 21): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};
