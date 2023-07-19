import { NextApiRequest, NextApiResponse } from 'next';
import { loadFile } from '../../utils';

const loadJsonFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const jsonData = await loadFile();
    res.status(200).json(jsonData);
  } catch (err) {
    res.status(500).json({ message: 'Error reading file: ' + err });
  }
};

export default loadJsonFile;