import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooksAction } from '../redux/actions'

const mapStateToProps = (state) => ({
  booksFromReduxStore: state.book.stock,
})

const mapDispatchToProps = (dispatch) => ({
  getBooks: () => {
    // I need to dispatch getBooksAction for initializing the fetch
    console.log('in mapDispatchToProps')
    dispatch(getBooksAction())
  },
})

class BookStore extends Component {
  state = {
    // books: [],
    bookSelected: null,
  }

  componentDidMount = async () => {
    // try {
    //   let resp = await fetch(
    //     "https://striveschool-api.herokuapp.com/food-books"
    //   );
    //   if (resp.ok) {
    //     let books = await resp.json();
    //     this.setState({ books });
    //   } else {
    //     console.log("error");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    console.log('this.props', this.props)
    this.props.getBooks()
  }

  changeBook = (book) => this.setState({ bookSelected: book })

  render() {
    return (
      <Row>
        <Col md={4}>
          <BookList
            bookSelected={this.state.bookSelected}
            changeBook={this.changeBook}
            // books={this.state.books}
            // this should be replaced with the book.stock array into the redux store!
            books={this.props.booksFromReduxStore}
          />
        </Col>
        <Col md={8}>
          <BookDetail bookSelected={this.state.bookSelected} />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
