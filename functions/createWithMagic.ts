import { CreateWithMagic, models } from '@teamkeel/sdk';
import { Book, BookInput } from '../client/keelClient';
import fetch from "node-fetch";


export default CreateWithMagic(async (ctx, inputs) => {

	const book = await SearchISBN(inputs.isbn)

	// const book = await models.book.create(book_input);
	console.log(book)
	inputs = Object.assign(inputs, book)
	return models.book.create(inputs);
});
	
const SearchISBN = (async (book) => {
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
					author: response.items[0].volumeInfo.authors[0],
					published: response.items[0].volumeInfo.publishedDate
				});
			} else {
				return({isbn:book})
			}
		})
		return({isbn:book})

	});