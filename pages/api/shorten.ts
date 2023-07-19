import { groupBy } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { UrlEntry } from '../../utils/interfaces';
import { generateId, loadFile, saveFile } from '../../utils';

const shorten = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) {
      res.status(403).send('Invalid input: url is required');
      return
    }
    try {
      const urlDatabase: UrlEntry[] = await loadFile();
      let urlEntry = urlDatabase.find(entry => entry.url === url);
      if (!urlEntry) {
        // only because a json file is used as storage
        const groupedDB = groupBy(urlDatabase, 'id');
        // generate random id
        let id = generateId(Number(process.env.ID_LENGTH));

        // if id exists regenerate
        while (groupedDB[id]) {
          id = generateId(Number(process.env.ID_LENGTH));
        }
        urlEntry = {
          id,
          url,
          shortCount: 1,
          accessCount: 0,
        };
        urlDatabase.push(urlEntry);
      } else {
        urlEntry.shortCount++;
      }
      await saveFile(urlDatabase);

      res.json({
        shortenedUrl: `http://${req.headers.host}/${urlEntry.id}`,
        stats: {
          shortCount: urlEntry.shortCount,
          accessCount: urlEntry.accessCount,
        },
      });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};

export default shorten;