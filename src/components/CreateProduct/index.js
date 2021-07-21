import { useContext } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import PageWrapper from "../PageWrapper"


const CreateProduct = () => {
  const context = useContext(AuthContext) 
  const history = useHistory()
    // const getCookie = (name) => {
    //     const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    //     return cookieValue ? cookieValue[2] : null
    // }
   
  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
   const id = context.user.id
    const name = e.target.name.value
    const description = e.target.description.value
    const image = e.target.image.value
    const price = e.target.price.value
    const likes = e.target.likes.value
    // console.log(likes)
    fetch('http://localhost:9999/api/product', {
      method: 'POST',
      body: JSON.stringify({ 
        _id: id,
        name,
        description,
        imageUrl: image,
        price: Number(price), 
        likes: Number(likes)
      }),
      headers: {
        'Content-Type': 'application/json',
         Authorization: window.localStorage.getItem("token")
      }
    }).then(promise => promise.json())
    .then(()=> {
      history.push('/')
    })
   
  }
  return (
    <PageWrapper>
    <main>
      <section className="create">
        <form onSubmit={onCreateSubmitHandler}>
          <fieldset>
            <legend>Create Product</legend>
       
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
    </PageWrapper>
  )

}
export default CreateProduct