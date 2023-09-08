import { UpdateWithIsbn, UpdateWithIsbnHooks, models } from '@teamkeel/sdk';
import { r } from 'vitest/dist/index-50755efe';
import fetch from "node-fetch";


// To learn more about what you can do with hooks,
// visit https://docs.keel.so/functions
const hooks : UpdateWithIsbnHooks = {

	beforeWrite: async (ctx, inputs, where) => {

 console.log(where)
        const booktoupdate = await models.book.findOne({
            id: <string>where,
          });
          var bookobj = {};
        if(booktoupdate) {
            bookobj = await SearchISBN(booktoupdate.isbn)
        }

		return {
		  ...inputs,
		  ...bookobj
		}
	  }

};


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


export default UpdateWithIsbn(hooks);
	