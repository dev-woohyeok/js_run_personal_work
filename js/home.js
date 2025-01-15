import { fetchMovieDetails, fetchMovieList } from './api.js';
import { debounce } from './common.js';
import { BookmarkManager } from './storage.js';

init();

/**
 * 초기 화면을 구성하는 함수
 */
async function init() {
	// API를 통해 인기 영화 목록 가져오기
	try {
		const movies = await fetchMovieList();
		const movieList = [...movies.results];

		renderHeader();
		renderMovieList([...movieList]);
		bindEvents([...movieList]);
	} catch (error) {
		console.error('에러 발생 : ', error);
	}
}

/**
 * 헤더 영역을 랜더링 하는 함수
 */
function renderHeader() {
	const navBookmark = document.querySelector('.nav-bookmark');
	BookmarkManager.checkBookmarkMode()
		? (navBookmark.textContent = '북마크 끄기')
		: (navBookmark.textContent = '북마크 보기');
}

/**
 * 영화 목록을 렌더링하는 함수
 * @param {Array} movieList 영화 데이터 배열
 */
function renderMovieList(movieList) {
	const cardsContainer = document.querySelector('.cards-container');
	const isBookmarked = BookmarkManager.checkBookmarkMode();
	const searchWords = document.querySelector('.search-input').value.trim();

	const searchMovies = movieList.filter(
		(movie) => !Hangul.search(movie.title, searchWords),
	);

	const bookMarkedMovies = isBookmarked
		? searchMovies.filter((movie) =>
				BookmarkManager.checkIsBookmarked(movie.id),
		  )
		: searchMovies;

	// 기존 카드 초기화
	cardsContainer.innerHTML = '';

	// 검색 결과가 없는 경우 처리
	if (bookMarkedMovies.length === 0) {
		cardsContainer.innerHTML =
			'<div class="no-results">검색 결과를 찾을 수 없습니다.😅</div>';
		return;
	}

	// 영화 데이터로 카드 생성
	bookMarkedMovies.forEach((movie) => {
		const card = createCardElement({ ...movie });
		cardsContainer.appendChild(card);
	});
}

/**
 * 이벤트를 바인딩하는 함수
 * @param {object[]} movieList
 */
function bindEvents(movieList) {
	const header = document.querySelector('header');
	const cardContainer = document.querySelector('.cards-container');
	const dialog = document.querySelector('.modal-background');

	// 검색 기능
	const debouncedSearchInput = debounce(
		(e) => renderMovieList([...movieList]),
		500,
	);

	header.addEventListener('input', (e) => {
		if (e.target.matches('#search-input')) {
			debouncedSearchInput(e);
			renderResetBtn();
		}
	});

	// 검색창 초기화 및 북마크 기능
	header.addEventListener('click', (e) => {
		if (e.target.closest('.search-reset')) {
			handleClickResetBtn(e, [...movieList]);
		}

		if (e.target.matches('.nav-bookmark')) {
			handleClickNavBookmark(e, [...movieList]);
		}
	});

	// 영화 카드 클릭 시 상세 정보 모달 렌더링
	cardContainer.addEventListener('click', (e) => {
		if (e.target.closest('.card-container')) {
			handleClickCard(e);
		}
	});

	// 모달 관련 이벤트
	dialog.addEventListener('click', (e) => {
		if (e.target.matches('.modal-background')) {
			dialog.close();
		}

		if (e.target.closest('.modal-container')) {
			handleClickBookmark(e, movieList);
		}
	});
}

/**
 * 검색어 입력 시 검색어 초기화 버튼 렌더링 함수
 */
function renderResetBtn() {
	const resetBtn = document.querySelector('.search-reset');
	const searchInput = document.querySelector('.search-input');
	searchInput.value.trim().length > 0
		? resetBtn.classList.remove('hidden')
		: resetBtn.classList.add('hidden');
}

/**
 * 검색어 초기화 버튼 클릭 시 호출되는 함수
 * @param {Event} e - click 이벤트 객체
 * @param {object[]} movieList - 전체 영화 목록
 */
function handleClickResetBtn(e, movieList) {
	const searchInput = document.querySelector('.search-input');
	searchInput.value = '';
	renderResetBtn();
	renderMovieList([...movieList]);
}

/**
 * 북마크 모드 전환 함수
 * @param {Event} e - click 이벤트 객체
 * @param {object[]} movieList - 전체 영화 목록
 */
function handleClickNavBookmark(e, movieList) {
	BookmarkManager.setData('mode', !BookmarkManager.checkBookmarkMode());
	renderHeader();
	renderMovieList([...movieList]);
}

/**
 * 북마크 추가/삭제 함수
 * @param {Event} e - click 이벤트 객체
 * @param {object[]} movieList - 전체 영화 목록
 */
function handleClickBookmark(e, movieList) {
	const id = e.target.closest('.modal-container').dataset.id;
	BookmarkManager.checkIsBookmarked(id)
		? BookmarkManager.removeBookMark(id)
		: BookmarkManager.setBookmark(id);
	renderBookMark(id);
	renderMovieList([...movieList]);
}

/**
 * 북마크 버튼을 렌더링 함수
 * @param {number} id - 영화 ID
 */
function renderBookMark(id) {
	const isBookmarked = BookmarkManager.checkIsBookmarked(id);
	const star = document.querySelector('.star');
	const starFill = document.querySelector('.star-fill');

	if (isBookmarked) {
		star.classList.add('hidden');
		starFill.classList.remove('hidden');
	} else {
		star.classList.remove('hidden');
		starFill.classList.add('hidden');
	}
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

async function handleClickCard(e) {
	const card = e.target.closest('.card-container');
	const movieId = Number(card.dataset.id);
	const movieDetail = await fetchMovieDetails(movieId);
	renderDetailModal({ ...movieDetail });

	const dialog = document.querySelector('.modal-background');
	const modalPoster = document.querySelector('.modal-poster');
	modalPoster.addEventListener('load', () => {
		dialog.showModal();
	});
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
	backdrop_path,
	genres,
	release_date,
	vote_average,
}) {
	const modalContainer = document.querySelector('.modal-container');
	const modalPoster = modalContainer.querySelector('.modal-poster');
	const modalTitle = modalContainer.querySelector('.modal-title');
	const modalOverview = modalContainer.querySelector('.modal-overview');
	const modalReleaseField = modalContainer.querySelector(
		'.modal-release-field',
	);
	const $modalGenres = modalContainer.querySelector('.modal-genres');
	const $modalScoreField = modalContainer.querySelector('.modal-score-field');

	modalContainer.dataset.id = id; // 모달창에 영화 ID 추가
	modalPoster.src = `https://image.tmdb.org/t/p/w1280/${backdrop_path}`; // 포스터 업데이트
	modalPoster.alt = title;
	modalTitle.textContent = title;

	modalOverview.textContent = overview; // 줄거리 업데이트

	modalReleaseField.textContent = new Date(release_date).toLocaleDateString(
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
	renderBookMark(id);
}
