import { CreateWithMagic, models } from '@teamkeel/sdk';
import { Book, BookInput } from '../client/keelClient';
import fetch from "node-fetch";


export default CreateWithMagic(async (ctx, inputs) => {

	const bookobj = await SearchISBN(inputs.isbn)

	console.log(bookobj)
	inputs = Object.assign(inputs, bookobj);
	return models.book.create(inputs);
});
	
const SearchISBN = (async (book) => {
	const books_endpoint = `https://www.googleapis.com/books/v1/volumes?q=isbn+` + (<string>book)
	
	await fetch(`${books_endpoint}`, { 
		method: 'GET',
		headers:{
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials':"true",
		  'Access-Control-Allow-Methods':'POST, GET'
		}
	  })
	  .then(response => 		
		{
 
			const res = (<any>response.body)
			console.log(res)

			if(res && res.totalItems > 0) {
				return({
					isbn: book,
					title: res.items[0].volumeInfo.title,
					author: res.items[0].volumeInfo.authors[0],
					published: res.items[0].volumeInfo.publishedDate
				});
			} 
		})
		return({isbn:book})

	});