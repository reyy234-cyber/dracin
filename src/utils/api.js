export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Generic helper to perform a fetch and return parsed JSON.
 * Returns an object with `error` if network fails.
 * Some endpoints return plain text arrays; attempt to parse JSON and fallback to raw text.
 * @param {string} url
 */
async function fetchJson(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      return text;
    }
  } catch (err) {
    return { error: err.message || 'Network error' };
  }
}

/**
 * Platform definitions. Each platform provides endpoint mappings and
 * helper functions to interpret API responses for items, details and episodes.
 */
export const PLATFORMS = {
  dramabox: {
    name: 'DramaBox',
    code: 'dramabox',
    color: 'red',
    endpoints: {
      trending: '/dramabox/trending',
      latest: '/dramabox/latest',
      recommended: '/dramabox/foryou',
      search: '/dramabox/search?query=',
      detail: '/dramabox/detail?bookId=',
      episodes: '/dramabox/allepisode?bookId=',
    },
    parseItem(item) {
      return {
        id: item.bookId,
        title: item.bookName,
        cover: item.coverWap || item.cover,
        description: item.introduction || item.description || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.bookId,
        title: data.bookName,
        cover: data.coverWap || data.cover,
        description: data.introduction || '',
        tags: data.tags || data.tagNames || [],
      };
    },
    async fetchEpisodes(id) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (!Array.isArray(res)) return [];
      return res.map((ep, idx) => {
        const cdn = ep.cdnList && ep.cdnList[0];
        let video = '';
        if (
          cdn &&
          Array.isArray(cdn.videoPathList) &&
          cdn.videoPathList.length
        ) {
          const defaultVideo =
            cdn.videoPathList.find((v) => v.isDefault === 1) ||
            cdn.videoPathList[0];
          video = defaultVideo.videoPath;
        }
        return {
          id: ep.chapterId,
          name: ep.chapterName || `Episode ${idx + 1}`,
          video,
        };
      });
    },
    async fetchVideo(id) {
      return id;
    },
  },
  reelshort: {
    name: 'ReelShort',
    code: 'reelshort',
    color: 'purple',
    endpoints: {
      trending: '/reelshort/homepage',
      latest: '/reelshort/foryou',
      recommended: '/reelshort/foryou',
      search: '/reelshort/search?query=',
      detail: '/reelshort/detail?id=',
      episodes: '/reelshort/episode?id=',
    },
    parseItem(item) {
      return {
        id: item.id || item.movieId || '',
        title: item.title || item.name || item.bookName || '',
        cover: item.cover || item.image || item.thumb_url || '',
        description: item.description || item.abstract || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.id || data.series_id || '',
        title: data.title || data.name || '',
        cover: data.cover || data.image || '',
        description: data.description || data.abstract || '',
        tags: data.tags || [],
      };
    },
    async fetchEpisodes(id) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (!res || !Array.isArray(res)) return [];
      return res.map((ep, idx) => ({
        id: ep.id || ep.episode_id || idx,
        name: ep.title || ep.name || `Episode ${idx + 1}`,
        video: '',
      }));
    },
    async fetchVideo(id) {
      return '';
    },
  },
  netshort: {
    name: 'NetShort',
    code: 'netshort',
    color: 'blue',
    endpoints: {
      trending: '/netshort/foryou',
      latest: '/netshort/theaters',
      recommended: '/netshort/foryou',
      search: '/netshort/search?query=',
      detail: '/netshort/detail?id=',
      episodes: '/netshort/allepisode?id=',
    },
    parseItem(item) {
      return {
        id: item.id || item.movieId || '',
        title: item.title || item.name || '',
        cover: item.cover || item.image || '',
        description: item.description || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.id || '',
        title: data.title || '',
        cover: data.cover || '',
        description: data.description || '',
        tags: data.tags || [],
      };
    },
    async fetchEpisodes(id) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (!Array.isArray(res)) return [];
      return res.map((ep, idx) => ({
        id: ep.id || ep.chapterId || idx,
        name: ep.title || ep.name || ep.chapterName || `Episode ${idx + 1}`,
        video: '',
      }));
    },
    async fetchVideo() {
      return '';
    },
  },
  moviebox: {
    name: 'MovieBox',
    code: 'moviebox',
    color: 'yellow',
    endpoints: {
      trending: '/moviebox/trending',
      latest: '/moviebox/homepage',
      recommended: '/moviebox/homepage',
      search: '/moviebox/search?query=',
      detail: '/moviebox/detail?id=',
      episodes: '/moviebox/sources?id=',
      video: '/moviebox/generate-link-stream-video?id=',
    },
    parseItem(item) {
      return {
        id: item.id || item.movieId || '',
        title: item.title || item.name || '',
        cover: item.cover || item.image || '',
        description: item.description || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.id || '',
        title: data.title || '',
        cover: data.cover || '',
        description: data.description || '',
        tags: data.tags || [],
      };
    },
    async fetchEpisodes(id) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (!Array.isArray(res)) return [];
      return res.map((ep, idx) => ({
        id: ep.id || ep.sourceId || idx,
        name: ep.title || ep.name || `Episode ${idx + 1}`,
        video: '',
      }));
    },
    async fetchVideo(id) {
      const url = `${API_BASE_URL}${this.endpoints.video}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (res && res.url) return res.url;
      return '';
    },
  },
  melolo: {
    name: 'Melolo',
    code: 'melolo',
    color: 'pink',
    endpoints: {
      trending: '/melolo/trending',
      latest: '/melolo/latest',
      recommended: '/melolo/foryou',
      search: '/melolo/search?query=',
      detail: '/melolo/detail?book_id=',
      episodes: '/melolo/stream?book_id=',
    },
    parseItem(item) {
      return {
        id: item.book_id,
        title: item.book_name,
        cover: item.thumb_url || item.cover_image_url || '',
        description: item.abstract || item.description || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.book_id || data.id,
        title: data.book_name || data.title,
        cover: data.cover || data.cover_image_url || data.thumb_url || '',
        description: data.abstract || data.description || '',
        tags: data.tags || [],
      };
    },
    async fetchEpisodes() {
      return [];
    },
    async fetchVideo() {
      return '';
    },
  },
  flickreels: {
    name: 'FlickReels',
    code: 'flickreels',
    color: 'teal',
    endpoints: {
      trending: '/flickreels/hotrank',
      latest: '/flickreels/latest',
      recommended: '/flickreels/foryou',
      search: '/flickreels/search?query=',
      detail: '/flickreels/detailAndAllEpisode?id=',
      episodes: '/flickreels/detailAndAllEpisode?id=',
    },
    parseItem(item) {
      return {
        id: item.id || item.movieId || '',
        title: item.title || item.name || '',
        cover: item.cover || item.image || '',
        description: item.description || '',
      };
    },
    parseDetail(data) {
      return {
        id: data.id || '',
        title: data.title || '',
        cover: data.cover || '',
        description: data.description || '',
        tags: data.tags || [],
      };
    },
    async fetchEpisodes(id) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(id)}`;
      const res = await fetchJson(url);
      if (res && Array.isArray(res.episodes)) {
        return res.episodes.map((ep, idx) => ({
          id: ep.id || idx,
          name: ep.title || ep.name || `Episode ${idx + 1}`,
          video: ep.video || '',
        }));
      }
      return [];
    },
    async fetchVideo() {
      return '';
    },
  },
  anime: {
    name: 'Anime',
    code: 'anime',
    color: 'green',
    endpoints: {
      trending: '/anime/recommended',
      latest: '/anime/latest',
      recommended: '/anime/recommended',
      search: '/anime/search?query=',
      detail: '/anime/detail?urlId=',
      episodes: '/anime/detail?urlId=',
      video: '/anime/getvideo?chapterUrlId=',
    },
    parseItem(item) {
      return {
        id: item.id || item.url || item.urlId || '',
        title: item.judul || item.title || item.name || '',
        cover: item.cover || item.thumb_url || item.image || '',
        description:
          item.sinopsis || item.description || item.abstract || '',
      };
    },
    parseDetail(data) {
      const detail = data.data && data.data[0] ? data.data[0] : {};
      return {
        id: detail.id || '',
        title: detail.judul || detail.title || '',
        cover: detail.cover || '',
        description: detail.sinopsis || '',
        tags: detail.genre || detail.genres || [],
        chapters: detail.chapter || [],
      };
    },
    async fetchEpisodes(slug) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(slug)}`;
      const res = await fetchJson(url);
      const detail = this.parseDetail(res);
      if (!Array.isArray(detail.chapters)) return [];
      return detail.chapters.map((ch) => ({
        id: ch.url,
        name: `Episode ${ch.ch}`,
        video: '',
      }));
    },
    async fetchVideo(chapterUrlId) {
      const url = `${API_BASE_URL}${this.endpoints.video}${encodeURIComponent(chapterUrlId)}`;
      const res = await fetchJson(url);
      const data = res.data && res.data[0];
      if (data && Array.isArray(data.stream) && data.stream.length) {
        return data.stream[0].link;
      }
      return '';
    },
  },
  komik: {
    name: 'Komik',
    code: 'komik',
    color: 'indigo',
    endpoints: {
      type: 'manga',
      trending: '/komik/popular?type=',
      latest: '/komik/latest?type=',
      recommended: '/komik/recommended?type=',
      search: '/komik/search?type=%TYPE%&query=',
      detail: '/komik/detail?manga_id=',
      episodes: '/komik/chapterlist?manga_id=',
      video: '/komik/getimage?chapter_id=',
    },
    parseItem(item) {
      return {
        id: item.manga_id || item.mangaId || item.id || '',
        title: item.title || item.book_name || '',
        cover:
          item.cover_image_url || item.thumb_url || item.cover || '',
        description: item.description || item.abstract || '',
      };
    },
    parseDetail(data) {
      const detail = data.data || data;
      return {
        id: detail.manga_id || '',
        title: detail.title || detail.name || '',
        cover: detail.cover_image_url || '',
        description: detail.description || '',
        tags: detail.tags || [],
      };
    },
    async fetchEpisodes(mangaId) {
      const url = `${API_BASE_URL}${this.endpoints.episodes}${encodeURIComponent(mangaId)}`;
      const res = await fetchJson(url);
      if (!res || !Array.isArray(res.data)) return [];
      return res.data.map((ch, idx) => ({
        id: ch.chapter_id || ch.id || idx,
        name: ch.chapter_title || ch.name || `Chapter ${idx + 1}`,
        video: '',
      }));
    },
    async fetchVideo(chapterId) {
      const url = `${API_BASE_URL}${this.endpoints.video}${encodeURIComponent(chapterId)}`;
      const res = await fetchJson(url);
      if (res && Array.isArray(res.images)) {
        return res.images;
      }
      return [];
    },
  },
};

/**
 * Fetch home data (trending, latest, recommended) for a platform.
 * Returns an object with arrays for each section. Missing endpoints return empty arrays.
 * @param {string} platformCode
 */
export async function getHomeData(platformCode) {
  const platform = PLATFORMS[platformCode];
  if (!platform) return { trending: [], latest: [], recommended: [] };
  const { endpoints } = platform;
  const sections = {};
  const keys = ['trending', 'latest', 'recommended'];
  await Promise.all(
    keys.map(async (key) => {
      const endpoint = endpoints[key];
      if (!endpoint) {
        sections[key] = [];
        return;
      }
      let url = `${API_BASE_URL}${endpoint}`;
      if (platform.code === 'komik') {
        url += platform.endpoints.type;
      }
      const res = await fetchJson(url);
      let items = [];
      if (Array.isArray(res)) {
        items = res;
      } else if (res && Array.isArray(res.data)) {
        items = res.data;
      } else if (res && Array.isArray(res.recommended)) {
        items = res.recommended;
      }
      sections[key] = items.map((item) => platform.parseItem(item));
    })
  );
  return {
    trending: sections.trending || [],
    latest: sections.latest || [],
    recommended: sections.recommended || [],
  };
}

/**
 * Search content across a platform.
 * Returns an array of simplified items.
 * @param {string} platformCode
 * @param {string} query
 */
export async function search(platformCode, query) {
  const platform = PLATFORMS[platformCode];
  if (!platform) return [];
  const { endpoints } = platform;
  let url = '';
  if (platform.code === 'komik') {
    const type = platform.endpoints.type;
    url =
      API_BASE_URL +
      endpoints.search
        .replace('%TYPE%', type)
        .concat(encodeURIComponent(query));
  } else {
    url = `${API_BASE_URL}${endpoints.search}${encodeURIComponent(query)}`;
  }
  const res = await fetchJson(url);
  let items = [];
  if (Array.isArray(res)) {
    items = res;
  } else if (res && Array.isArray(res.data)) {
    items = res.data;
  } else if (res && Array.isArray(res.results)) {
    items = res.results;
  }
  return items.map((item) => platform.parseItem(item));
}

/**
 * Fetch detail information for an item.
 * @param {string} platformCode
 * @param {string} id
 */
export async function getDetail(platformCode, id) {
  const platform = PLATFORMS[platformCode];
  if (!platform) return null;
  const url = `${API_BASE_URL}${platform.endpoints.detail}${encodeURIComponent(id)}`;
  const res = await fetchJson(url);
  if (!res || res.error) return null;
  return platform.parseDetail(res);
}

/**
 * Fetch list of episodes/chapters for an item.
 * @param {string} platformCode
 * @param {string} id
 */
export async function getEpisodes(platformCode, id) {
  const platform = PLATFORMS[platformCode];
  if (!platform) return [];
  return platform.fetchEpisodes(id);
}

/**
 * Fetch stream or image list for a specific episode/chapter id.
 * @param {string} platformCode
 * @param {string} episodeId
 */
export async function getVideo(platformCode, episodeId) {
  const platform = PLATFORMS[platformCode];
  if (!platform) return '';
  return platform.fetchVideo(episodeId);
}

/**
 * Send a prompt to the AI chat endpoint.
 * Returns a string containing the AI's response or an error message.
 * @param {string} prompt
 */
export async function askAi(prompt) {
  const url = `${API_BASE_URL}/ai/chatgpt?prompt=${encodeURIComponent(prompt)}`;
  const res = await fetchJson(url);
  if (res && res.choices && res.choices.length) {
    const choice = res.choices[0];
    const msg =
      (choice.Message && choice.Message.content) ||
      (choice.message && choice.message.content);
    if (typeof msg === 'string') return msg.trim();
  }
  if (res && res.error) return `Error: ${res.error}`;
  return 'No response';
}