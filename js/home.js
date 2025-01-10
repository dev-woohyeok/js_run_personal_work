import { getMovieDetails, getMovies } from './api.js';
import { debounce } from './common.js';

let data = {
	page: 1,
	results: [
		{
			adult: false,
			backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
			genre_ids: [28, 878, 35, 10751],
			id: 939243,
			original_language: 'en',
			original_title: 'Sonic the Hedgehog 3',
			overview:
				'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.',
			popularity: 4471.466,
			poster_path: '/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg',
			release_date: '2024-12-19',
			title: 'Sonic the Hedgehog 3',
			video: false,
			vote_average: 7.642,
			vote_count: 409,
		},
		{
			adult: false,
			backdrop_path: '/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
			genre_ids: [28, 12, 18],
			id: 558449,
			original_language: 'en',
			original_title: 'Gladiator II',
			overview:
				'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.',
			popularity: 3935.606,
			poster_path: '/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
			release_date: '2024-11-05',
			title: 'Gladiator II',
			video: false,
			vote_average: 6.774,
			vote_count: 2147,
		},
		{
			adult: false,
			backdrop_path: '/k24eZq5I3jyz4htPkZCRpnUmBzE.jpg',
			genre_ids: [10749, 18],
			id: 1156593,
			original_language: 'es',
			original_title: 'Culpa tuya',
			overview:
				"The love between Noah and Nick seems unwavering despite their parents' attempts to separate them. But his job and her entry into college open up their lives to new relationships that will shake the foundations of both their relationship and the Leister family itself.",
			popularity: 2623.666,
			poster_path: '/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg',
			release_date: '2024-12-26',
			title: 'Your Fault',
			video: false,
			vote_average: 7.113,
			vote_count: 755,
		},
		{
			adult: false,
			backdrop_path: '/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg',
			genre_ids: [12, 10751, 16],
			id: 762509,
			original_language: 'en',
			original_title: 'Mufasa: The Lion King',
			overview:
				'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.',
			popularity: 2928.339,
			poster_path: '/iBqXjFkAozQ1z2sfAiWwBimbiJX.jpg',
			release_date: '2024-12-18',
			title: 'Mufasa: The Lion King',
			video: false,
			vote_average: 7.469,
			vote_count: 526,
		},
		{
			adult: false,
			backdrop_path: '/vZG7PrX9HmdgL5qfZRjhJsFYEIA.jpg',
			genre_ids: [28, 878, 12],
			id: 912649,
			original_language: 'en',
			original_title: 'Venom: The Last Dance',
			overview:
				"Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
			popularity: 3038.094,
			poster_path: '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
			release_date: '2024-10-22',
			title: 'Venom: The Last Dance',
			video: false,
			vote_average: 6.8,
			vote_count: 2221,
		},
		{
			adult: false,
			backdrop_path: '/uKb22E0nlzr914bA9KyA5CVCOlV.jpg',
			genre_ids: [18, 10749, 14],
			id: 402431,
			original_language: 'en',
			original_title: 'Wicked',
			overview:
				"In the land of Oz, ostracized and misunderstood green-skinned Elphaba is forced to share a room with the popular aristocrat Glinda at Shiz University, and the two's unlikely friendship is tested as they begin to fulfill their respective destinies as Glinda the Good and the Wicked Witch of the West.",
			popularity: 2274.665,
			poster_path: '/2E1x1qcHqGZcYuYi4PzVZjzg8IV.jpg',
			release_date: '2024-11-20',
			title: 'Wicked',
			video: false,
			vote_average: 7.3,
			vote_count: 1107,
		},
		{
			adult: false,
			backdrop_path: '/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg',
			genre_ids: [16, 12, 10751, 35],
			id: 1241982,
			original_language: 'en',
			original_title: 'Moana 2',
			overview:
				"After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
			popularity: 2153.651,
			poster_path: '/m0SbwFNCa9epW1X60deLqTHiP7x.jpg',
			release_date: '2024-11-21',
			title: 'Moana 2',
			video: false,
			vote_average: 7.009,
			vote_count: 793,
		},
		{
			adult: false,
			backdrop_path: '/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg',
			genre_ids: [28, 14, 35],
			id: 845781,
			original_language: 'en',
			original_title: 'Red One',
			overview:
				"After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
			popularity: 2064.479,
			poster_path: '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg',
			release_date: '2024-10-31',
			title: 'Red One',
			video: false,
			vote_average: 7,
			vote_count: 1898,
		},
		{
			adult: false,
			backdrop_path: '/A6vAMO3myroRfBwSZetY4GVqaW4.jpg',
			genre_ids: [16, 14, 28, 12],
			id: 839033,
			original_language: 'en',
			original_title: 'The Lord of the Rings: The War of the Rohirrim',
			overview:
				'A sudden attack by Wulf, a clever and traitorous lord of Rohan seeking vengeance for the death of his father, forces Helm Hammerhand, the King of Rohan, and his people to make a daring last stand in the ancient stronghold of the Hornburg.',
			popularity: 2013.501,
			poster_path: '/cXzCOx1hUuU9CfmiEv6rXjb6EqU.jpg',
			release_date: '2024-12-05',
			title: 'The Lord of the Rings: The War of the Rohirrim',
			video: false,
			vote_average: 6.591,
			vote_count: 259,
		},
		{
			adult: false,
			backdrop_path: '/fzjH7kt1017R9EckLDmWmH5pGhD.jpg',
			genre_ids: [28, 27, 53],
			id: 970450,
			original_language: 'en',
			original_title: 'Werewolves',
			overview:
				'A year after a supermoon’s light activated a dormant gene, transforming humans into bloodthirsty werewolves and causing nearly a billion deaths, the nightmare resurfaces as the supermoon rises again. Two scientists attempt to stop the mutation but fail and must now struggle to reach one of their family homes.',
			popularity: 1606.615,
			poster_path: '/cRTctVlwvMdXVsaYbX5qfkittDP.jpg',
			release_date: '2024-12-04',
			title: 'Werewolves',
			video: false,
			vote_average: 6.1,
			vote_count: 133,
		},
		{
			adult: false,
			backdrop_path: '/au3o84ub27qTZiMiEc9UYzN74V3.jpg',
			genre_ids: [28, 878, 53],
			id: 1035048,
			original_language: 'en',
			original_title: 'Elevation',
			overview:
				'A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.',
			popularity: 1503.035,
			poster_path: '/9knPvD6GLtl1w4pamRomyQKHXyj.jpg',
			release_date: '2024-11-07',
			title: 'Elevation',
			video: false,
			vote_average: 6.2,
			vote_count: 290,
		},
		{
			adult: false,
			backdrop_path: '/b3mdmjYTEL70j7nuXATUAD9qgu4.jpg',
			genre_ids: [16, 14, 12],
			id: 823219,
			original_language: 'lv',
			original_title: 'Straume',
			overview:
				'A solitary cat, displaced by a great flood, finds refuge on a boat with various species and must navigate the challenges of adapting to a transformed world together.',
			popularity: 1552.946,
			poster_path: '/imKSymKBK7o73sajciEmndJoVkR.jpg',
			release_date: '2024-01-30',
			title: 'Flow',
			video: false,
			vote_average: 8.4,
			vote_count: 604,
		},
		{
			adult: false,
			backdrop_path: '/dWkdmxIkH9y23s9v1PjQFhTGIwo.jpg',
			genre_ids: [28, 18, 53],
			id: 1043905,
			original_language: 'en',
			original_title: 'Dirty Angels',
			overview:
				"During the United States' 2021 withdrawal from Afghanistan, a group of female soldiers posing as medical relief are sent back in to rescue a group of kidnapped teenagers caught between ISIS and the Taliban.",
			popularity: 1302.912,
			poster_path: '/3O3qSGmjRGc10hMwFul8WDxKE5t.jpg',
			release_date: '2024-12-11',
			title: 'Dirty Angels',
			video: false,
			vote_average: 6.4,
			vote_count: 105,
		},
		{
			adult: false,
			backdrop_path: '/rhc8Mtuo3Kh8CndnlmTNMF8o9pU.jpg',
			genre_ids: [28, 53],
			id: 1005331,
			original_language: 'en',
			original_title: 'Carry-On',
			overview:
				'An airport security officer races to outsmart a mysterious traveler forcing him to let a dangerous item slip onto a Christmas Eve flight.',
			popularity: 1202.654,
			poster_path: '/sjMN7DRi4sGiledsmllEw5HJjPy.jpg',
			release_date: '2024-12-05',
			title: 'Carry-On',
			video: false,
			vote_average: 7,
			vote_count: 1515,
		},
		{
			adult: false,
			backdrop_path: '/lb2WCbppZ6iHfokg7ccmgjKPKNh.jpg',
			genre_ids: [99],
			id: 1214667,
			original_language: 'en',
			original_title: 'Making Squid Game: The Challenge',
			overview:
				'Go behind the scenes and witness how the "Squid Game"-inspired reality show transformed from a scripted drama to a cutthroat, nail-biting competition.',
			popularity: 1229.758,
			poster_path: '/lUb97EhBhNBfQ9wmy8YMbiNLtGh.jpg',
			release_date: '2023-12-06',
			title: 'Making Squid Game: The Challenge',
			video: false,
			vote_average: 5.9,
			vote_count: 21,
		},
		{
			adult: false,
			backdrop_path: '/lntyt4OVDbcxA1l7LtwITbrD3FI.jpg',
			genre_ids: [10749, 18],
			id: 1010581,
			original_language: 'es',
			original_title: 'Culpa mía',
			overview:
				"Noah must leave her city, boyfriend, and friends to move into William Leister's mansion, the flashy and wealthy husband of her mother Rafaela. As a proud and independent 17 year old, Noah resists living in a mansion surrounded by luxury. However, it is there where she meets Nick, her new stepbrother, and the clash of their strong personalities becomes evident from the very beginning.",
			popularity: 934.231,
			poster_path: '/w46Vw536HwNnEzOa7J24YH9DPRS.jpg',
			release_date: '2023-06-08',
			title: 'My Fault',
			video: false,
			vote_average: 7.891,
			vote_count: 3343,
		},
		{
			adult: false,
			backdrop_path: '/b0itXhS69X33BvLi7uWjUZQs9MB.jpg',
			genre_ids: [27, 878],
			id: 933260,
			original_language: 'en',
			original_title: 'The Substance',
			overview:
				'A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.',
			popularity: 983.442,
			poster_path: '/lqoMzCcZYEFK729d6qzt349fB4o.jpg',
			release_date: '2024-09-07',
			title: 'The Substance',
			video: false,
			vote_average: 7.1,
			vote_count: 3103,
		},
		{
			adult: false,
			backdrop_path: '/uWOJbarUXfVf6B4o0368dh138eR.jpg',
			genre_ids: [18, 14, 27],
			id: 426063,
			original_language: 'en',
			original_title: 'Nosferatu',
			overview:
				'A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake.',
			popularity: 971.904,
			poster_path: '/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg',
			release_date: '2024-12-25',
			title: 'Nosferatu',
			video: false,
			vote_average: 6.9,
			vote_count: 686,
		},
		{
			adult: false,
			backdrop_path: '/A28EE0vgHrB0OdoxWWMfgfyEoYn.jpg',
			genre_ids: [80, 53, 28],
			id: 1276945,
			original_language: 'nl',
			original_title: 'Ferry 2',
			overview:
				"After losing his drug empire, Ferry Bouman has found a measure of peace away from Brabant's criminal underworld — until his past catches up to him.",
			popularity: 859.112,
			poster_path: '/8pwdnL3pEISIN1EGmwZzU6hpNVk.jpg',
			release_date: '2024-12-19',
			title: 'Ferry 2',
			video: false,
			vote_average: 5.7,
			vote_count: 77,
		},
		{
			adult: false,
			backdrop_path: '/lD4mhKoiaXpKrtBEjACeWgz7w0O.jpg',
			genre_ids: [28, 35, 878],
			id: 533535,
			original_language: 'en',
			original_title: 'Deadpool & Wolverine',
			overview:
				'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
			popularity: 848.531,
			poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
			release_date: '2024-07-24',
			title: 'Deadpool & Wolverine',
			video: false,
			vote_average: 7.7,
			vote_count: 6289,
		},
	],
	total_pages: 48066,
	total_results: 961305,
}; // 테스트용 더미

let detailData = {
	adult: false,
	backdrop_path: '/4qCqAdHcNKeAHcK8tJ8wNJZa9cx.jpg',
	belongs_to_collection: {
		id: 10,
		name: '스타워즈 시리즈',
		poster_path: '/aSrMJYmQX8kpF26LijkCsYhBMvm.jpg',
		backdrop_path: '/zZDkgOmFMVYpGAkR9Tkxw0CRnxX.jpg',
	},
	budget: 11000000,
	genres: [
		{
			id: 12,
			name: '모험',
		},
		{
			id: 28,
			name: '액션',
		},
		{
			id: 878,
			name: 'SF',
		},
	],
	homepage: '',
	id: 11,
	imdb_id: 'tt0076759',
	origin_country: ['US'],
	original_language: 'en',
	original_title: 'Star Wars',
	overview:
		'공화국이 붕괴하고 제국이 수립된 뒤 20년, 제다이 기사단은 전멸하고 강력한 제국군의 횡포에 은하계는 공포에 휩싸여 있다. 그러던 중 공화국 재건을 노리는 반란군이 제국군의 비밀병기 데스스타 설계도를 훔쳐 달아나고 제국군은 이를 쫓는다. 하지만 결국 제국의 손에 붙잡히게 된 그들은 드로이드 R2-D2에 설계도를 넣어서 R2의 친구 C-3PO와 탈출시키는 데 성공하고, 두 드로이드 콤비는 타투인의 시골 마을에서 숙부와 함께 살고 있던 청년 루크 스카이워커에게 오게 되는데...',
	popularity: 113.558,
	poster_path: '/7XFfURIFCJxN1mfBg0SAjk5yGzg.jpg',
	production_companies: [
		{
			id: 1,
			logo_path: '/tlVSws0RvvtPBwViUyOFAO0vcQS.png',
			name: 'Lucasfilm Ltd.',
			origin_country: 'US',
		},
		{
			id: 25,
			logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
			name: '20th Century Fox',
			origin_country: 'US',
		},
	],
	production_countries: [
		{
			iso_3166_1: 'US',
			name: 'United States of America',
		},
	],
	release_date: '1977-05-25',
	revenue: 775398007,
	runtime: 121,
	spoken_languages: [
		{
			english_name: 'English',
			iso_639_1: 'en',
			name: 'English',
		},
	],
	status: 'Released',
	tagline: '아주 오래 전 멀고 먼 은하계에서...',
	title: '스타워즈 에피소드 4: 새로운 희망',
	video: false,
	vote_average: 8.205,
	vote_count: 20755,
}; // 테스트용 더미

let movieList = [];
// movieList = data.results;
init();

/**
 * 초기 화면을 구성하는 함수
 */
async function init() {
	// API를 통해 인기 영화 목록 가져오기
	try {
		const movies = await getMovies();
		movieList = movies.results;

		// 영화 목록 렌더링
		renderMovies([...movieList]);
	} catch (error) {
		console.error(error);
	}

	const $header = document.querySelector('header');
	const $cardsContainer = document.querySelector('.cards-container');
	const $dialog = document.querySelector('.modal-background');

	const $searchInput = document.querySelector('.search-input');
	const $resetBtn = document.querySelector('.search-reset');
	const $modalPoster = document.querySelector('.modal-img');
	const $star = document.querySelector('.star');
	const $starFill = document.querySelector('.star-fill');

	// 검색 기능
	$header.addEventListener('input', (e) => {
		if (e.target.matches('#search-input')) {
			debounce(handleSearchInput(e), 300);
			toggleResetButton(e, $resetBtn);
		}
	});

	$header.addEventListener('click', (e) => {
		if (e.target.closest('.search-reset')) {
			resetSearch(e, $searchInput);
		}
	});

	// 영화 카드 클릭 시 상세 정보 모달 렌더링
	$cardsContainer.addEventListener('click', (e) =>
		handleCardClick(e, $dialog, $modalPoster),
	);

	// 모달 관련 이벤트
	$dialog.addEventListener('click', (e) => {
		if (e.target.matches('.modal-background')) {
			// 모달창 배경 클릭 시 모달창 닫기
			handleModalClose(e, $dialog);
		}

		if (e.target.closest('.modal-btn-bookmark')) {
			// 북마크 버튼 클릭 시 북마크 추가)
			handleBookmark($dialog, $star, $starFill);
		}
	});
}

/**
 *
 * @param {Element} $dialog
 * @param {Element} $star
 * @param {Element} $starFill
 */
function handleBookmark($dialog, $star, $starFill) {
	const id = $dialog.querySelector('.modal-container').dataset.id;
	const isBookmarked = checkIsBookmarked(id);
	updateBookmarkData(isBookmarked);
	renderBookmark($star, $starFill, isBookmarked);
}

/**
 * 북마크 상태를 업데이트하는 함수
 * @param {boolean} isBookmarked - 북마크 상태
 */
function updateBookmarkData(isBookmarked) {
	if (isBookmarked) {
		// 북마크 제거
		setData(
			'bookmarks',
			getData('bookmarks').filter((item) => item !== id),
		);
	} else {
		// 북마크 추가
		setData('bookmarks', [...getData('bookmarks'), id]);
	}
}

/**
 * 북마크 상태에 따라 UI를 업데이트하는 함수
 * @param {Element} $star - 별표 비어있는 상태
 * @param {Element} $starFill - 별표 채워진 상태
 * @param {boolean} isBookmarked - 북마크 상태
 */
function renderBookmark($star, $starFill, isBookmarked) {
	if (isBookmarked) {
		$star.classList.remove('hidden');
		$starFill.classList.add('hidden');
	} else {
		$star.classList.add('hidden');
		$starFill.classList.remove('hidden');
	}
}

function checkIsBookmarked(id) {
	const data = getData('bookmarks');
	return data.some((item) => item === id);
}

/**
 * 영화 목록을 렌더링하는 함수
 * @param {Array} movies 영화 데이터 배열
 */
function renderMovies(movies) {
	const cardsContainer = document.querySelector('.cards-container');

	// 기존 카드 초기화
	cardsContainer.innerHTML = '';

	// 검색 결과가 없는 경우 처리
	if (movies.length === 0) {
		cardsContainer.innerHTML =
			'<div class="no-results">검색 결과를 찾을 수 없습니다.😅</div>';
		return;
	}

	// 영화 데이터로 카드 생성
	movies.forEach((movie) => {
		const card = createCardElement({ ...movie });
		cardsContainer.appendChild(card);
	});
}

/**
 * 개별 영화 카드 엘리먼트를 생성하는 함수
 * @param {number} id 영화 ID
 * @param {string} title 영화 제목
 * @param {number} vote_average 평점
 * @param {string} poster_path 포스터 경로
 * @param {Array} genreIds 장르 ID 배열
 * @returns {HTMLElement} 영화 카드 엘리먼트
 */
function createCardElement({
	id,
	title,
	vote_average,
	poster_path,
	genre_ids,
}) {
	const cardContainer = document.createElement('div');
	cardContainer.dataset.id = id;
	cardContainer.classList.add('card-container');

	// 장르 엘리먼트 생성
	const genresElement = createGenresElement(genre_ids);

	cardContainer.innerHTML = `
        <img class="card-img" src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${title}">
        <div class="card-body">
            <div class="card-title style="font-size : ${
				title.length > 10 ? '1rem' : 'inherit'
			}">${title}</div>
            <div class="card-genres">${genresElement}</div>
            <div class="card-score">
                평점 : <span class="card-score-field">${vote_average.toFixed(
					1,
				)}</span>
            </div>
        </div>
    `;
	return cardContainer;
}

/**
 * 장르 엘리먼트를 생성하는 함수
 * @param {number[]} genreIds 장르 ID 배열
 * @returns {string} HTML 문자열로 반환된 장르 엘리먼트
 */
function createGenresElement(genreIds) {
	const genreMap = {
		28: '액션',
		12: '어드벤처',
		16: '애니메이션',
		35: '코미디',
		80: '범죄',
		99: '다큐멘터리',
		18: '드라마',
		10751: '가족',
		14: '판타지',
		36: '역사',
		27: '공포',
		10402: '음악',
		9648: '미스터리',
		10749: '로맨스',
		878: 'SF',
		10770: 'TV 영화',
		53: '스릴러',
		10752: '전쟁',
		37: '서부극',
	};

	// 장르 ID 배열을 순회하며 매핑된 이름으로 HTML 생성
	return genreIds
		.map((id) => `<div class="card-genre">${genreMap[id] || '기타'}</div>`)
		.join('');
}

/**
 * 검색어 입력 시 호출되는 함수 (debounce 적용)
 * @param {Event} e - input 이벤트 객체
 */
function handleSearchInput(e) {
	const searchWord = e.target.value.trim().toLowerCase();
	const filteredMovies = filterMovies(searchWord);
	renderMovies(filteredMovies);
}

/**
 * 검색어로 영화 필터링하는 함수
 * @param {string} searchWord - 검색어
 * @returns {Array} - 필터링된 영화 목록
 */
function filterMovies(searchWord) {
	return movieList.filter((movie) =>
		movie.title.toLowerCase().includes(searchWord),
	);
}

/**
 * 검색창 비우기 버튼의 활성화 상태를 토글하는 함수
 */
function toggleResetButton(e, resetBtn) {
	resetBtn.classList.toggle('hidden', !e.target.value.trim());
}

/**
 * 검색창을 초기화하는 함수
 */
function resetSearch(e, $searchInput) {
	$searchInput.value = '';
	renderMovies([...movieList]);
}

async function handleCardClick(e, dialog, $modalPoster) {
	const card = e.target.closest('.card-container');
	const movieId = Number(card.dataset.id);
	const movieDetail = await getMovieDetails(movieId);

	renderDetailModal({ ...movieDetail });
	// renderDetailModal({ ...detailData });
	$modalPoster.addEventListener('load', () => {
		dialog.showModal();
	});
}

function getData(key) {
	return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

/**
 *
 * @param {number} id : 영화 ID
 * @param {string} title : 영화 제목
 * @param {string} overview : 줄거리
 * @param {string} poster_path : 포스터 경로
 * @param {{id, name}[]} genres : 장르 목록
 * @param {string} release_date : 개봉일
 * @param {number} vote_average : 평점
 */
function renderDetailModal({
	id,
	title,
	overview,
	poster_path,
	genres,
	release_date,
	vote_average,
}) {
	const $modalContainer = document.querySelector('.modal-container');
	const $modalPoster = $modalContainer.querySelector('.modal-img');
	const $modalTitle = $modalContainer.querySelector('.modal-title');
	const $modalOverview = $modalContainer.querySelector('.modal-overview');
	const $modalReleaseField = $modalContainer.querySelector(
		'.modal-release-field',
	);
	const $modalGenres = $modalContainer.querySelector('.modal-genres');
	const $modalScoreField =
		$modalContainer.querySelector('.modal-score-field');
	const $star = $modalContainer.querySelector('.star');
	const $starFill = $modalContainer.querySelector('.star-fill');

	$modalContainer.dataset.id = id; // 모달창에 영화 ID 추가
	$modalPoster.src = `https://image.tmdb.org/t/p/w300/${poster_path}`; // 포스터 업데이트
	$modalPoster.alt = title;
	$modalTitle.textContent = title;

	$modalOverview.textContent = overview; // 줄거리 업데이트

	$modalReleaseField.textContent = new Date(release_date).toLocaleDateString(
		// 개봉일 업데이트
		'ko-KR',
		{
			year: 'numeric', // 연도
			month: 'long', // 월 (길게 표시, "1월"처럼 표시됨)
			day: 'numeric', // 일
		},
	);

	$modalGenres.innerHTML = ''; // 장르 업데이트
	genres.forEach((genre) => {
		const genreElement = document.createElement('div');
		genreElement.classList.add('modal-genre');
		genreElement.textContent = genre.name;
		$modalGenres.appendChild(genreElement);
	});

	$modalScoreField.textContent = vote_average.toFixed(1); // 평점 업데이트

	if (checkIsBookmarked(id)) {
		$star.classList.add('hidden');
		$starFill.classList.remove('hidden');
	} else {
		$star.classList.remove('hidden');
		$starFill.classList.add('hidden');
	}
}

/**
 * 모달 닫기
 * @param {Event} e - 클릭 이벤트 객체
 * @param {Element} $dialog - 모달 엘리먼트
 */
function handleModalClose(e, $dialog) {
	// e.stopPropagation(); => 이벤트 전파를 막는 메서드
	$dialog.close();
}
