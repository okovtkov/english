import { EditCreateBlock } from '@english/components';
import { getUser } from '../../server';

export async function getServerSideProps(ctx) {
  const user = await getUser(ctx);

  return {
    props: {
      uid: user.uid,
    },
  };
}

function Create({ uid }) {
  return <EditCreateBlock uid={uid} />;
}

export default Create;
