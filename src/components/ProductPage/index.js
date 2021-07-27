const ProductPage = ( {id, name, description, imageUrl, category, price, quantity}) => {
  return (

    <main>
      <section className="card">
        <div className="body">
          <div className="image-big">
            <img alt="11"  src="https://ae01.alicdn.com/kf/HTB1jBoCXiHrK1Rjy0Flq6AsaFXa2.jpg"  />
          </div>
          <section className="images-small-wrapper">

            <div className="image-small">
              <img alt="17"  src="https://ae01.alicdn.com/kf/HTB19SUCXdzvK1RkSnfoq6zMwVXas.jpg"  />
            </div>

            <div className="image-small">
              <img alt="18"  src="https://ae01.alicdn.com/kf/HTB1I3ZCXoLrK1Rjy1zbq6AenFXar.jpg"  />
            </div>
            <div className="image-small">
              <img alt="16"  src={imageUrl}/>
            </div>
          </section>
        </div>
        <div className="description">
          <header className="article-header">
            <div className="article-header-name">{name}</div>
            <div className="article-price">{price}</div>
          </header>
          <div className="article-details">
            <div className="details-header">Детайли:</div>
            <div className="details-body">{description}и</div>
          </div>

          <div className="quantity-select">
            <label for="single-option" className="select-label">Quantity</label>
            <div className="select-options">
              <select className="single-option">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button className="btn btn-outline-light">ADD TO CARD</button>
          </div>

          <footer className="article-footer">Footer is here!</footer>
        </div>
      </section>
      <section className="card">
        <div className="body">
          <div className="image-big">
            <img alt="11"  src="https://ae01.alicdn.com/kf/HTB1jBoCXiHrK1Rjy0Flq6AsaFXa2.jpg"  />
          </div>
          <section className="images-small-wrapper">

            <div className="image-small">
              <img alt="17"  src="https://ae01.alicdn.com/kf/HTB19SUCXdzvK1RkSnfoq6zMwVXas.jpg"  />
            </div>

            <div className="image-small">
              <img alt="18"  src="https://ae01.alicdn.com/kf/HTB1I3ZCXoLrK1Rjy1zbq6AenFXar.jpg"  />
            </div>
            <div className="image-small">
              <img alt="16"  src="https://ae01.alicdn.com/kf/HTB1hCQ.Xli5K1Rjt_hNq6zUDVXar.jpg"  />
            </div>
          </section>
        </div>
        <div className="description">
          <header className="article-header">
            <div className="article-header-name">Article Name</div>
            <div className="article-price">$19.90</div>
          </header>
          <div className="article-details">
            <div className="details-header">Детайли:</div>
            <div className="details-body">Обеци с перли</div>
          </div>

          <div className="quantity-select">
            <label for="single-option" className="select-label">Quantity</label>
            <div className="select-options">
              <select className="single-option">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button className="btn btn-outline-light">ADD TO CARD</button>
          </div>

          <footer className="article-footer">Footer is here!</footer>
        </div>
      </section>
      
    </main>

  )
}
export default ProductPage