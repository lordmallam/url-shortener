import { NextPage } from 'next'
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { ShortenResponse } from '../utils/interfaces';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 50px 15px;
  text-align: center;
  font-family: sans-serif;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
`;

const TextBox = styled.input`
  padding: 5px 10px;
  width: 50%;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  padding-top: 10px;
  display: block;
`;

const Message = styled.span`
  font-size: 14px;
  padding-top: 10px;
  display: block;
`;

const ShortenPage: NextPage = () => {

  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<ShortenResponse>(null)

  const onUrlChange = (e: { target: { value: SetStateAction<string>; }; }): void => {
    setUrl(e.target.value);
  };

  const makeShortenUrlCall = (url: string): Promise<ShortenResponse> => {
    return axios.post('api/shorten', { url })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'An error occurred');
      });
  };

  const onClick = () => {
    // make use to validate url
    if (!url) {
      setError('You must provide a valid url');
      return;
    }
    setError('');
    makeShortenUrlCall(url)
    .then(res => {
      setData(res);
    })
    .catch(err => {
      setError(err);
    });
  };

  return (
    <Container>
      <h1>Axel Springer | Tiny URL</h1>
      <div>
        <Title>Generate a tiny URL</Title>
        <TextBox type="url" placeholder='Enter your URL...' value={url} onChange={onUrlChange}></TextBox>
        <Button onClick={onClick}>Generate</Button>
        <Message>{data?.shortenedUrl}</Message>
        <ErrorText>{error}</ErrorText>
      </div>
      <br/><br/>
      {data?.stats &&
        <div>
          <Title>Statistics</Title>
          <div>
            <p>Shortened Count: {data?.stats.shortCount}</p>
            <p>Access Count: {data?.stats.accessCount}</p>
          </div>
        </div>
      }
    </Container>
  )
}

export default ShortenPage;