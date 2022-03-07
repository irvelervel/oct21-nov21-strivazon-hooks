import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addToCartAction, addToCartActionWithThunk } from '../redux/actions'

// to refactor this component with Redux Hooks, we firstly need to convert this into a FUNCTIONAL COMPONENT!

// remember the 2 rules of hooks:
// 1) only use them in functional components (no classes)
// 2) only use them at the top level of your component

// const mapStateToProps = (state) => ({
//   userName: state.user.name,
//   booksInCart: state.cart.products,
// })

// const mapDispatchToProps = (dispatch) => ({
//   // here we're going to write method for DISPATCHING ACTIONS in BookDetail
//   // for adding an element to the products array into the cart slice of the store we need to dispatch an action!
//   addToCart: (bookToAdd) => {
//     dispatch(addToCartActionWithThunk(bookToAdd))
//   },
// })

const BookDetail = ({ bookSelected }) => {
  // state = {
  //   book: null,
  // }

  const [book, setBook] = useState(null)

  useEffect(() => {
    setBook(bookSelected)
  }, [bookSelected])

  // componentDidUpdate(prevProps) {
  //   if (prevProps.bookSelected !== this.props.bookSelected) {
  //     this.setState({
  //       book: this.props.bookSelected,
  //     })
  //   }
  // }

  // state is the whole redux store object
  const userName = useSelector((state) => state.user.name)
  // this is the same userName we had before using mapStateToProps
  // but before we were enriching our BookDetail component with new props! userName was coming from the props before
  // the redux hooks approach allows you the DECLARE the variable INSIDE the component
  const booksInCart = useSelector((state) => state.cart.products)

  const dispatch = useDispatch()

  const isAlreadyInCart = booksInCart.find((b) => b.id === book.id)

  return (
    <div className='mt-3'>
      {book ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{book.title}</h1>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col sm={4}>
              <div className='mt-3'>
                <img
                  className='book-cover'
                  src={book.imageUrl}
                  alt='book selected'
                />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className='font-weight-bold'>Description:</span>
                {book.description}
              </p>
              <p>
                <span className='font-weight-bold'>Price:</span>
                {book.price}
              </p>
              {/* I want to hide the button from a non-loggedin user */}
              {/* has_the_user_logged_in ? show_button : show_message */}
              {userName ? (
                <Button
                  color='primary'
                  onClick={() => dispatch(addToCartActionWithThunk(book))}
                  // .find() returns an element or undefined
                  // we need true or false
                  disabled={isAlreadyInCart}
                >
                  {isAlreadyInCart ? 'ALREADY ADDED' : 'ADD TO CART'}
                </Button>
              ) : (
                <div>You need to log in for purchasing this book!</div>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Please select a book!</h3>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default BookDetail
// here we need to dispatch an action, because we need to add elements to the cart
// so we need the SECOND argument of connect, mapDispatchToProps
