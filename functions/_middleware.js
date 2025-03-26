addEventListener('fetch', event => {
  event.respondWith(
    fetch('https://coldnova.xyz/' + new URL(event.request.url).pathname)
  );
});

export default function foo(context) {
    if (context.request.headers.get("x-email").includes('@op97.org')) {
        return new Response("Unauthorized", { status: 403 });
    }

    return context.next();
}