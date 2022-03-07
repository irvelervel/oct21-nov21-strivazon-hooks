import { useState, useEffect } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row } from 'react-bootstrap'
import { getBooksAction } from '../redux/actions'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// const mapStateToProps = (state) => ({
//   booksFromReduxStore: state.book.stock,
// })

// const mapDispatchToProps = (dispatch) => ({
//   getBooks: () => {
//     // I need to dispatch getBooksAction for initializing the fetch
//     console.log('in mapDispatchToProps')
//     dispatch(getBooksAction())
//   },
// })

const BookStore = () => {
  // state = {
  //   // books: [],
  //   bookSelected: null,
  // }

  const [bookSelected, setBookSelected] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooksAction())
  }, [])

  const booksFromReduxStore = useSelector((state) => state.book.stock)

  // componentDidMount = async () => {
  //   // try {
  //   //   let resp = await fetch(
  //   //     "https://striveschool-api.herokuapp.com/food-books"
  //   //   );
  //   //   if (resp.ok) {
  //   //     let books = await resp.json();
  //   //     this.setState({ books });
  //   //   } else {
  //   //     console.log("error");
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   console.log('this.props', this.props)
  //   this.props.getBooks()
  // }

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row>
      <Col md={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          // books={this.state.books}
          // this should be replaced with the book.stock array into the redux store!
          books={booksFromReduxStore}
        />
      </Col>
      <Col md={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
