import { api } from '@english/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { TestIdBlock } from '@english/components';
import { getUser } from '../../server';

export async function getServerSideProps(ctx) {
  const user = await getUser(ctx);
  const queryClient = new QueryClient();

  if (ctx.params.id === 'general' || ctx.params.id === 'favourite') {
    await queryClient.prefetchQuery({
      queryKey: ['words'],
      queryFn: () => api.words.get(user.uid),
    });
  } else {
    await queryClient.prefetchQuery({
      queryKey: ['words', ctx.params.id],
      queryFn: () => api.words.getById(ctx.params.id),
      select: (data) => data.sort((a, b) => a.words.createdAt - b.words.createdAt),
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      uid: user.uid,
      id: ctx.params.id,
    },
  };
}

function TestPage({ dehydratedState, uid, id }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <TestIdBlock uid={uid} id={id} />
    </HydrationBoundary>
  );
}

export default TestPage;
