import { CreateWithMagic, models } from '@teamkeel/sdk';
import { Book, BookInput } from '../client/keelClient';

export default CreateWithMagic(async (ctx, inputs) => {

	const book_input = await SearchISBN(inputs.isbn)

	const book = await models.book.create(book_input);
	return book;
});
	
const SearchISBN = (async (book) => {
	const books_api_key = "AIzaSyA_9-GbYiVfbwRJEmDwXC8QY-S3OW-k9to"
	const books_endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn+` + book
	
	await fetch(`${books_endpoint}`, { 
		method: 'GET',
		headers:{
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials':true,
		  'Access-Control-Allow-Methods':'POST, GET'
		}
	  })
	  .then(response => 		
		{
			if(response.items.length > 0) {
	   console.log(response.items)
				return({
					isbn: book,
					title: response.items[0].volumeInfo.title,
					published: response.items[0].volumeInfo.publishedDate
				});
			} else {
				return({isbn:book})
			}
		})
		return({isbn:book})

	});