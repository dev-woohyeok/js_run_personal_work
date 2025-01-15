export class StorageManager {
	static getData(key, defaultValue) {
		return JSON.parse(localStorage.getItem(key)) || defaultValue;
	}

	static setData(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export class BookmarkManager extends StorageManager {
	static removeBookMark(id) {
		const result = this.getData('bookmarks', []).filter(
			(movie) => movie != id,
		);
		this.setData('bookmarks', result);
	}

	static setBookmark(id) {
		const result = [...this.getData('bookmarks', []), id];
		this.setData('bookmarks', result);
	}

	static checkIsBookmarked(id) {
		const bookmarkedMovies = this.getData('bookmarks', []);
		return bookmarkedMovies.some((movie) => movie == id);
	}

	static checkBookmarkMode() {
		return this.getData('mode', false);
	}
}
