const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzRjMTViMGU2M2QxYmI1YTU4MDA1OGI5NTc4ZWQxMyIsIm5iZiI6MTczNjI5NjcxOS4xNTY5OTk4LCJzdWIiOiI2NzdkYzkwZjg5ZmM1ZDk0NDI0ZTU4NDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IXSWaWU2xIAfuwT5Su0a1dmI9QFkDDg6ASelxRdEgYc';

const DEFAULT_HEADERS = {
	accept: 'application/json',
	Authorization: `Bearer ${API_TOKEN}`,
};

// API 호출 함수
const fetchData = async (endpoint, options = {}) => {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			...options,
			headers: {
				...DEFAULT_HEADERS,
				...options.headers,
			},
		});
		if (!response.ok) {
			throw new Error(`API 호출 실패: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

/**
 *
 * @param {number} page : 페이지 번호, 기본값 1
 * @param {string} language : 언어, 기본값 'ko'
 * @param {string} region : 지역, 기본값 'KR'
 * @returns {Object[]} : 영화 목록l
 */
export const getMovies = async (page = 1, language = 'ko', region = 'KR') => {
	const endpoint = `/movie/popular?page=${page}&language=${language}&region=${region}`;
	return fetchData(endpoint);
};

/**
 *
 * @param {number} movieId : 영화 id, 필수
 * @param {string} language : 언어, 기본값 'ko'
 * @param {string} region : 지역, 기본값 'KR'
 * @returns {Object} : 영화 상세 정보
 */
export const getMovieDetails = async (
	movieId,
	language = 'ko',
	region = 'KR',
) => {
	const endpoint = `/movie/${movieId}?language=${language}&region=${region}`;
	return fetchData(endpoint);
};
