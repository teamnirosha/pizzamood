// Pings Bing/IndexNow with every URL in the live sitemap. Run after a deploy: node scripts/indexnow.mjs
const HOST = "www.pizzamood.in";
const KEY = "4408f0d76abd1d9a2e427b494a0995dc";

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(res.status, urlList.length, "urls submitted");
