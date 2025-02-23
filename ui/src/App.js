import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Education from './Education';
import Header from './Header';
import Skills from './Skills';

function CreateBookComponent({message, onBookCreated}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  function handleSubmit(event){
    event.preventDefault();

    const newBook = {
      title, author, published_date:publishedDate
    };

    fetch('http://127.0.0.1:8000/books/books-api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    }).then((response) => {
      if (!response.ok){
        throw new Error('Not ok network response');
      }
      return response.json();
    }).then(data => {
      console.log(data)
      onBookCreated(title);
      setTitle('');
      setAuthor('');
      setPublishedDate('');
    }).catch(err => {
      console.error('error adding book', err);
    });
  }

  return (
    <div>
      <h2>Add a New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input 
            id='title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input 
            id='author'
            type='text'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='publishedDate'>Published Date: </label>
          <input 
            id='publishedDate'
            type='date'
            value={publishedDate}
            onChange={e => setPublishedDate(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add Book</button>
      </form>
    </div>
  )
}

function BooksComponent({books, loading, error, onDelete }) {

  const handleDelete = (book) => {
    fetch(`http://127.0.0.1:8000/books/books-api/delete/${book.id}/`, {
      method: 'DELETE',
    }).then(response => {
      if (!response.ok){
        throw new Error('Could not delete book');
      }
      return response.status;
    }).then(() => {
      onDelete(book.title);
    }).catch(err => {
      console.error('error deleting book: ', error);
    })
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} <button onClick={() => handleDelete(book)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const fetchBooks = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/books/books-api/get-all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error encountered');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookCreated = (bookTitle) => {
    setMessage('Book added: ' + bookTitle );
    fetchBooks();
  };

  const handleBookDeleted = (bookTitle) => {
    setMessage('Book deleted: ' + bookTitle);
    fetchBooks();
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Education />
        <Skills />
        <CreateBookComponent onBookCreated={handleBookCreated} message={message}/>
        <BooksComponent books={books} loading={loading} error={error} onDelete={handleBookDeleted}/>
      </header>
    </div>
  );
}

export default App;
