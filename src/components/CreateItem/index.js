import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"


const CreateItem = ({history}) => {
  const { loggedIn, user} = useContext(AuthContext) 
    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
        return cookieValue ? cookieValue[2] : null
    }
    console.log(getCookie())
    console.log(getCookie())
  const onCreateSubmitHandler = (e) => {
    e.preventDefault();

    const name = e.target.name.value
    const description = e.target.description.value
    const image = e.target.image.value
    const price = e.target.price.value
    const likes = e.target.likes.value
    console.log(likes)
    fetch('http://localhost:9999/api/item', {
      method: 'POST',
      body: JSON.stringify({ //зависи как е настроено АПИ-то
        name,
        description,
        imageUrl: image,
        price: Number(price), 
        likes: Number(likes)
      }),
      headers: {
        'Content-Type': 'application/json',
         Authorization: getCookie('x-auth-token')
      }
    }).then(promise => promise.json())
    .then(()=> {
      history.push('/')
    })
   
  }
  return (
    <main>
      <section className="create">
        <form onSubmit={onCreateSubmitHandler}>
          <fieldset>
            <legend>Create Item</legend>
       
            <p className="field">
              <label htmlFor="name">Name</label>
              <span className="input">
                <input type="text" name="name" id="name" placeholder="name" />
                <span className="actions"></span>
              </span>
            </p>
            <p className="field">
              <label htmlFor="description">Description</label>
              <span className="input">
                <input type="text" name="description" id="description" placeholder="Description" />
                <span className="actions"></span>
              </span>
            </p>
            <p className="field">
              <label htmlFor="image">Image URL</label>
              <span className="input">
                <input type="text" name="image" id="image" placeholder="Image" />
                <span className="actions"></span>
              </span>
            </p>
            <p className="field">
              <label htmlFor="price">Price</label>
              <span className="input">
                <input type="text" name="price" id="price" placeholder="Price" />
                <span className="actions"></span>
              </span>
            </p>
            <p className="field">
              <label htmlFor="likes">Likes</label>
              <span className="input">
                <input type="text" name="likes" id="likes" placeholder="likes" />
                <span className="actions"></span>
              </span>
            </p>
         
            <input className="btn btn-pink submit" type="submit" value="Create" />
           
          </fieldset>

        </form>
      </section>

    </main>
  )
}
export default CreateItem