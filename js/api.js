const BASE_URL = 'https://api.themoviedb.org';
const API_TOKEN ='토큰을 안전상의 이유로 제거하여, 실행이 불가능합니다.'

const DEFAULT_HEADERS = {
	accept: 'application/json',
	Authorization: `Bearer ${API_TOKEN}`,
};

/**
 *
 * @param {string} pathname - 예) '/movie/popular'
 * @param {object} queryParams - 예) { page: 1, language: 'ko', region: 'KR' }
 * @param {object} options : fetch API 추가할 옵션들
 * @returns
 */
const fetchData = async (pathname, queryParams, options = {}) => {
	try {
		const url = new URL(pathname, BASE_URL);
		Object.entries(queryParams).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});

		const response = await fetch(url.toString(), {
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
 * @returns {Object[]} : 영화 목록
 */
export const fetchMovieList = async (
	page = 1,
	language = 'ko',
	region = 'KR',
) => {
	return fetchData(
		'/3/movie/popular?',
		{ page, language, region },
		{ method: 'GET' },
	);
};

/**
 *
 * @param {number} movieId : 영화 id, 필수
 * @param {string} language : 언어, 기본값 'ko'
 * @param {string} region : 지역, 기본값 'KR'
 * @returns {Object} : 영화 상세 정보
 */
export const fetchMovieDetails = async (
	movieId,
	language = 'ko',
	region = 'KR',
) => {
	return fetchData(
		`/3/movie/${movieId}?`,
		{ language, region },
		{ method: 'GET' },
	);
};
