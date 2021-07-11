import './index.scss'



const Item = ({ id, name, description, imageUrl, category, price, likes }) => {
  return (
    <section className="card">
      <img alt="11"
        src={imageUrl} />
      <header>{name}</header>
      <footer>Price: {price} Euro</footer>
    </section>
  )
}
export default Item