import { GetServerSideProps, NextPage } from 'next'
import { UrlEntry } from '../utils/interfaces';
import { loadFile, saveFile } from '../utils';

const RedirectPage: NextPage<{ id: string }> = ({ id }) => {

  return (
    <div>
      <h1>URL ID: {id} is not registered yet</h1>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const jsonData = await loadFile()
    const entry: UrlEntry | undefined = jsonData.find(entry => entry.id == id);

    if (entry) {
      entry.accessCount++;
      await saveFile(jsonData);

      return {
        redirect: {
          destination: entry.url,
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.log('Error: ',  error);
  }

  return { props: { id } };
};

export default RedirectPage;