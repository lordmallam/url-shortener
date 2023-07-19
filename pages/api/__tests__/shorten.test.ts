import { groupBy } from 'lodash';
import shorten from '../shorten';
import { loadFile, saveFile, generateId } from '../../../utils';

jest.mock('lodash');
jest.mock('../../../utils');

describe('shorten API', () => {
  let req: any;
  let res: any;

  const urlDatabase = [
    {
      id: 'abcd',
      url: 'http://example.com',
      shortCount: 1,
      accessCount: 3,
    },
    {
      id: 'dcba',
      url: 'http://example1.com',
      shortCount: 2,
      accessCount: 4,
    },
  ];

  const groupedDB = 
    {
      abcd : [{ id: 'abcd',
      url: 'http://example.com',
      shortCount: 1,
      accessCount: 3,
      }],
      dcba : [{ id: 'dcba',
      url: 'http://example1.com',
      shortCount: 2,
      accessCount: 4,
      }]
    };

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        url: 'http://example.com',
      },
      headers: {
        host: 'localhost:3000',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle a POST request with a valid URL', async () => {
    const urlEntry = {
      id: '2',
      url: 'http://example.com',
      shortCount: 1,
      accessCount: 0,
    };
    const expectedResponse = {
      shortenedUrl: 'http://localhost:3000/abcd',
      stats: {
        shortCount: 2,
        accessCount: 3,
      },
    };

    (loadFile as jest.Mock).mockResolvedValue(urlDatabase);
    (groupBy as jest.Mock).mockReturnValue(groupedDB);
    (generateId as jest.Mock).mockReturnValueOnce('xyz');
    (saveFile as jest.Mock).mockResolvedValue(urlDatabase);

    await shorten(req, res);

    expect(loadFile).toHaveBeenCalledTimes(1);
    expect(groupBy).toHaveBeenCalledTimes(1);
    expect(generateId).toHaveBeenCalledTimes(1);
    expect(urlDatabase.push).toHaveBeenCalledTimes(1);
    expect(saveFile).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle a POST request with an empty URL', async () => {
    req.body.url = '';

    await shorten(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid input: url is required');
    expect(loadFile).not.toHaveBeenCalled();
    expect(groupBy).not.toHaveBeenCalled();
    expect(generateId).not.toHaveBeenCalled();
    expect(saveFile).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle a POST request with an existing URL', async () => {
    (loadFile as jest.Mock).mockResolvedValue(urlDatabase);

    await shorten(req, res);

    expect(loadFile).toHaveBeenCalledTimes(1);
    expect(groupBy).not.toHaveBeenCalled();
    expect(generateId).not.toHaveBeenCalled();
    expect(urlDatabase.push).not.toHaveBeenCalled();
    expect(saveFile).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      shortenedUrl: 'http://localhost:3000/1',
      stats: {
        shortCount: 2,
        accessCount: 0,
      },
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle a POST request with an error while saving the file', async () => {
    (loadFile as jest.Mock).mockRejectedValue(new Error('File load error'));
    (saveFile as jest.Mock).mockRejectedValue(new Error('File save error'));

    await shorten(req, res);

    expect(loadFile).toHaveBeenCalledTimes(1);
    expect(groupBy).not.toHaveBeenCalled();
    expect(generateId).not.toHaveBeenCalled();
    expect(urlDatabase.push).not.toHaveBeenCalled();
    expect(saveFile).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Error: File save error');
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle a GET request', async () => {
    req.method = 'GET';

    await shorten(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Method not allowed');
    expect(loadFile).not.toHaveBeenCalled();
    expect(groupBy).not.toHaveBeenCalled();
    expect(generateId).not.toHaveBeenCalled();
    expect(urlDatabase.push).not.toHaveBeenCalled();
    expect(saveFile).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});