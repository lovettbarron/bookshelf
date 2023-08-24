import { FetchNewBooks, models } from '@teamkeel/sdk';
import fetch from "node-fetch";
export default FetchNewBooks(async (ctx) => {

	const empty_books = await models.book.findMany({where: { title: null }	})
	
	if(empty_books.length > 0) {

		for (const [key, value] of Object.entries(empty_books)) {
			console.log(`${key}: ${value}`);
		}
		
	}

    return empty_books

});

const SearchISBN = async (isbn) => {
	const books_api_key = "AIzaSyA_9-GbYiVfbwRJEmDwXC8QY-S3OW-k9to"
	const books_endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn+` + isbn

	const handler = (response) => {
		const res = response;
		if(res.items.length > 0) {

			return {	
				title: res.items[0].title,
				author:res.author,
				published: res.published
			};
		} else {
			return { }
		}
	};


	const data = await fetch(books_endpoint, {
		method: "GET",
	}).then((res) => handler(res));

	return {
		title: data.title,
		author:data.author,
		published: data.published

	}
}