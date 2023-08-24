import { FetchNewBooks, models } from '@teamkeel/sdk';
import fetch from "node-fetch";
export default FetchNewBooks(async (ctx) => {

	const empty_books = await models.book.findMany({where: { name: null }	})
	
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
				name: res.items[0].title,
				author:res.author,
				published: res.published
			};
		}
	};


	const data = await fetch(books_endpoint, {
		method: "POST",
		body: JSON.stringify({ name: "Simon" }),
	}).then((res) => handler(res));

	return {
		name: data.name,
		author:data.author,
		published: data.published

	}
}