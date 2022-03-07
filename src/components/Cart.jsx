import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { removeFromCartAction } from '../redux/actions'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// const mapStateToProps = (state) => ({
//   cart: state.cart.products,
// })

// const mapDispatchToProps = (dispatch) => ({
//   removeFromCart: (index) => {
//     dispatch(removeFromCartAction(index))
//   },
// })

const Cart = () => {
  const cart = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cart.map((book, i) => (
            <li key={i} className='my-4'>
              <Button
                variant='danger'
                onClick={() => dispatch(removeFromCartAction(i))}
              >
                <FaTrash />
              </Button>
              <img
                className='book-cover-small'
                src={book.imageUrl}
                alt='book selected'
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className='font-weight-bold'>
          TOTAL:{' '}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart
// the Cart component needs to READ the current value of products AND
// being able to remove elements from it!
// it means: mapStateToProps + mapDispatchToProps
