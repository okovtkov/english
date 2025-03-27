import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { api } from '@english/api';
import { EditBlock } from '@english/components';
import { getUser } from '../../server';

export async function getServerSideProps(ctx) {
  const user = await getUser(ctx);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['words'],
    queryFn: () => api.words.get(user.uid),
    select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      uid: user.uid,
    },
  };
}

function Edit({ dehydratedState, uid }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <EditBlock uid={uid} />
    </HydrationBoundary>
  );
}

export default Edit;
