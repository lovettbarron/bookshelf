import { CreateWithMagic, models } from '@teamkeel/sdk';
import { Book, BookInput } from '../keelClient';
import fetch from "node-fetch";


export default CreateWithMagic(async (ctx, inputs) => {

	const bookobj = await SearchISBN(inputs.isbn)

	console.log(bookobj)
	inputs = Object.assign(inputs, bookobj);
	return models.book.create(inputs);
});
	
const SearchISBN = (async (book) => {
	const books_endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn+` + (<string>book)
	
	const response = await fetch(`${books_endpoint}`, { 
		method: 'GET',
		headers:{
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials':"true",
		  'Access-Control-Allow-Methods':'POST, GET'
		}
	  })

	const res = await (<any>response.json())
	console.log(res)

	if(res && res.totalItems > 0) {
		console.log("you get a book!")
		return({
			isbn: <string>book,
			title: <string>res.items[0].volumeInfo.title,
			author: <string>res.items[0].volumeInfo.authors[0],
			// published: <string>res.items[0].volumeInfo.publishedDate
		});
	} 
	console.log("Nada")
	return({isbn: <string>book})

	});