import { getMovieDetails, getMovies } from './api.js';
import { debounce } from './common.js';

let movieList = [];
init();

/**
 * 초기 화면을 구성하는 함수
 */
async function init() {
	// API를 통해 인기 영화 목록 가져오기
	try {
		const movies = await getMovies();
		movieList = movies.results;

		// 북마크 모드 여부 확인
		renderBookmarkList(checkModeBookmark());
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
	const debouncedSearchInput = debounce((e) => handleSearchInput(e), 500);
	$header.addEventListener('input', (e) => {
		if (e.target.matches('#search-input')) {
			debouncedSearchInput(e); // 검색어 입력시 검색 기능
			toggleResetButton(e, $resetBtn); // 검색창 비우기 버튼 활성화
		}
	});

	// 검색창 초기화 및 북마크 기능
	$header.addEventListener('click', (e) => {
		if (e.target.closest('.search-reset')) {
			resetSearch(e, $searchInput); // 검색창 비우기
		}

		if (e.target.matches('.nav-bookmark')) {
			const isModeBookmark = checkModeBookmark();
			renderBookmarkList(!isModeBookmark); // 북마크 목록 랜더링
			setData('mode', !isModeBookmark); // 북마크 모드
		}
	});

	// 영화 카드 클릭 시 상세 정보 모달 렌더링
	$cardsContainer.addEventListener('click', (e) => {
		if (e.target.closest('.card-container')) {
			handleCardClick(e, $dialog, $modalPoster);
		}
	});

	// 모달 관련 이벤트
	$dialog.addEventListener('click', (e) => {
		if (e.target.matches('.modal-background')) {
			handleModalClose(e, $dialog); // 모달창 배경 클릭 시 모달창 닫기
		}

		if (e.target.closest('.modal-btn-bookmark')) {
			handleBookmark($dialog, $star, $starFill); // 북마크 버튼 클릭 시 북마크 추가)
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
	updateBookmarkData(isBookmarked, id);
	renderBookmark(!isBookmarked, $star, $starFill);

	if (checkModeBookmark()) {
		const bookmarks = getData('bookmarks');
		const filteredMovies = movieList.filter((movie) =>
			bookmarks.includes(String(movie.id)),
		);
		renderMovies([...filteredMovies]);
	}
}

function updateBookmarkData(isBookmarked, id) {
	if (isBookmarked) {
		setData(
			'bookmarks',
			getData('bookmarks').filter((item) => Number(item) !== Number(id)),
		);
	} else {
		setData('bookmarks', [...getData('bookmarks'), id]);
	}
}

function renderBookmark(isBookmarked, $star, $starFill) {
	if (isBookmarked) {
		$star.classList.add('hidden');
		$starFill.classList.remove('hidden');
	} else {
		$star.classList.remove('hidden');
		$starFill.classList.add('hidden');
	}
}

function checkModeBookmark() {
	return getData('mode', false);
}

function checkIsBookmarked(id) {
	const data = getData('bookmarks') || [];
	return data.some((item) => Number(item) === Number(id));
}

function renderBookmarkList(isModeBookmark) {
	const $navBookmark = document.querySelector('.nav-bookmark');
	const bookmarks = getData('bookmarks');

	if (isModeBookmark) {
		$navBookmark.textContent = '북마크 끄기';
		const filteredMovies = movieList.filter((movie) =>
			bookmarks.includes(String(movie.id)),
		);
		renderMovies([...filteredMovies]);
	} else {
		$navBookmark.textContent = '북마크 보기';
		renderMovies([...movieList]);
	}
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
            <div class="card-title" ${
				title.length > 10 ? 'style ="font-size: 1.1rem;"' : ''
			}>${title}</div>
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
	return movieList.filter((movie) => !Hangul.search(movie.title, searchWord));
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
	$searchInput.dispatchEvent(new Event('input', { bubbles: true }));
	renderMovies([...movieList]);
}

async function handleCardClick(e, dialog, $modalPoster) {
	const card = e.target.closest('.card-container');
	const movieId = Number(card.dataset.id);
	const movieDetail = await getMovieDetails(movieId);

	renderDetailModal({ ...movieDetail });
	$modalPoster.addEventListener('load', () => {
		dialog.showModal();
	});
}

function getData(key, defaultValue = []) {
	return JSON.parse(localStorage.getItem(key)) || defaultValue;
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

	const isBookmarked = checkIsBookmarked(id);
	renderBookmark(isBookmarked, $star, $starFill);
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
