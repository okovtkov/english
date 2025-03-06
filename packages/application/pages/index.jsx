import { IndexBlock } from '@english/components';
import { api } from '@english/api';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getUser } from '../server';

export async function getServerSideProps(ctx) {
  const user = await getUser(ctx);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['words'],
    queryFn: () => api.words.get(user.uid),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      uid: user.uid,
    },
  };
}

function Index({ dehydratedState, uid }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <IndexBlock uid={uid} />
    </HydrationBoundary>
  );
}

export default Index;
