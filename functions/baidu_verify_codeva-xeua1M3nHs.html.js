export async function onRequest() {
  return new Response('de415385840c100218b5cb9eb17d462e', {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}
