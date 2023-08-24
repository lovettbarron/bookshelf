import { CreateWithMagic, models } from '@teamkeel/sdk';

export default CreateWithMagic(async (ctx, inputs) => {

	const book_input = SearchISBN(inputs.isbn)

	const book = await models.book.create(book_input);
	return book;
});
	
const SearchISBN = async (book) => {
	const books_api_key = "AIzaSyA_9-GbYiVfbwRJEmDwXC8QY-S3OW-k9to"
	const books_endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn+` + book.isbn

	const handler = (response) => {
		const res = response;
		if(res.items.length > 0) {

			return({id: book.id},{	
				title: res.items[0].volumeInfo.title,
				published: res.items[0].volumeInfo.publishedDate
			});
		} 
	};

	const data = await fetch(books_endpoint, {
		method: "GET",
	}).then((res) => handler(res));

	return
}