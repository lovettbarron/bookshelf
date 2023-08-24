import { FetchNewBooks, models } from '@teamkeel/sdk';
import { CommonTableExpressionNameNode } from 'kysely';
export default FetchNewBooks(async (ctx) => {

});

const SearchISBN = (isbn) => {
	const books_api_key = "AIzaSyA_9-GbYiVfbwRJEmDwXC8QY-S3OW-k9to"
	const books_endpoint = (isbn) => `https://www.googleapis.com/books/v1/volumes?q=isbn+` + isbn;

	const handler = (response) => {
		const res = response;
		return {	
			name: res.name,
			author:res.author,
			published: res.published
		};
	};


	const data = fetch(books_endpoint, {
		method: "POST",
		body: JSON.stringify({ name: "Simon" }),
	}).then((res) => handler(res));

	return {
		name: data.name,
		author:data.author,
		published: data.published

	}
}