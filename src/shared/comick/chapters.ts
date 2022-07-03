import axios from "@/utils/axios"

export const getChapters = async (comicSLug: string, source: number): Promise<any> => {
  const html = (await axios.get(`https://api.comick.fun/comic/${comicSLug.split('-').pop()}/chapter?lang=en,ja,vi`)).data; //chapters

  const pages = Math.ceil(html.total / 100);

  const requests: any = [];

  [...new Array(pages)].map((_, index) => {
    if (index === 0) return;

    requests.push(`https://api.comick.fun/comic/${comicSLug.split('-').pop()}/chapter?page=${index + 1}&lang=en,ja,vi`);
  })

  const fetchs = await Promise.all(
    requests.map(async (url: any) => (await axios.get(url)).data)
  )

  const loadPages = fetchs.map((list: any) => list.chapters).flat();

  const lists = [...html.chapters, ...loadPages];

  const index = lists.map((_: any, index: any) => index).reverse();

  return {
    chapters: lists.map((chapter: any, i: number) => {
      const tit = chapter.title ?? false;
      const ch = chapter.chap ? `Ch. ${chapter.chap} ` : '';
      const vol = chapter.vol ? `Vol. ${chapter.vol} ` : '';
      const title = tit ? `${tit} ` : '';

      return ({
        name: ch + vol + title,
        updateAt: chapter.updated_at.split('T')[0],
        view: 'N/A',
        id: chapter.hid,
        chap: 'chap-' + chapter.chap,
        nameIndex: index[i] + 1,
        source
      });
    }),
    total: html.total
  }
}



