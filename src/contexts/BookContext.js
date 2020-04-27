import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from '../reducers/BookReducer';


export const BookContext = createContext();

const BookContextProvider = (props) => {
    const [books, dispatch] = useReducer(bookReducer, [], () => {
        const localData = localStorage.getItem('books');
        return localData ? JSON.parse(localData) : []
    })
    /* the function passed as the third argument passed to the useReduce function, will set the data in the localStorage as the default value, if there there is data saved there. 
    otherwise it will return an empty array. If we pass a third argument to useReducer, it will ignore the data passed as the second argument
    and return the one returned by the function passed as the third argument.
    */
    useEffect(() =>{
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])
    // Because useEffect fires every time something changes, it is ideal to save the books data into the localStorage, every time there is a change to the books array.
    
    /*  The following would be the functions defined without a reducer in place
    
     const addBook = (title, author) => {
         setBooks([...books, {title,author, id: uuid()}])
     }
     const removeBook = (id) => {
         setBooks(books.filter( book => book.id !== id));
     } */
    return (
        <BookContext.Provider value={{
            books,
            //addBook, removeBook || this will be passed without a reducer in place
            dispatch
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider