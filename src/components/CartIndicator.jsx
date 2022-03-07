import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUsernameAction } from '../redux/actions'
import { useSelector } from 'react-redux'

// the goal of mapStateToProps is defining which new props your component is going to receive
// every property of the object mapStateToProps is returning will be a new prop for CartIndicator!
// const mapStateToProps = (state) => ({
//   // every property in this object will be a prop for CartIndicator
//   cartLength: state.cart.products.length,
//   userName: state.user.name,
//   bookFetchFailed: state.book.isError,
//   areBooksStillFetching: state.book.isLoading,
// })

// const mapDispatchToProps = (dispatch) => ({
//   setUsername: (name) => {
//     dispatch(setUsernameAction(name))
//   },
// })

// const mapStateToProps = (state) => state

const CartIndicator = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const cartLength = useSelector((state) => state.cart.products.length)
  const userName = useSelector((state) => state.user.name)
  const bookFetchFailed = useSelector((state) => state.book.isError)
  const areBooksStillFetching = useSelector((state) => state.book.isLoading)

  const dispatch = useDispatch()

  return (
    <div className='ml-auto mt-2'>
      {areBooksStillFetching ? (
        <Spinner variant='success' animation='border' />
      ) : bookFetchFailed ? (
        <Alert variant='danger'>Fetch error, try again</Alert>
      ) : userName ? (
        <Button color='primary' onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          <span className='ml-2'>{cartLength}</span>
        </Button>
      ) : (
        <Form.Control
          placeholder='Insert your username'
          value={name}
          onChange={(e) => setName(e.target.value)}
          // now I should invoke my prop of setUsername when I press enter
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // you just pressed the enter key!
              dispatch(setUsernameAction(name))
            }
          }}
        />
      )}
    </div>
  )
}

export default CartIndicator
