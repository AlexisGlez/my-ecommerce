import { CartStore } from '@app-stores/CartStore'

interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
  const cartItems = CartStore.useGetCartItems()
  return (
    <div>
      Cart
      <div>
        {cartItems.map((item) => (
          <div key={item.product._id}>
            <p>{item.product.name}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
