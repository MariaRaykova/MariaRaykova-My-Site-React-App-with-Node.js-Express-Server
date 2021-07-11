import { useEffect, useState } from 'react'
import Item from '../Item';
import './index.scss'



const Main = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9999/api/item')
        .then((res) =>  res.json()).then(res => setItems(res)).catch(err => console.log(err))
    }, []); //празния обект означава, че ще се изпълни само първия път
    return (
        <main>
            <div className="card-container">
                <article className="layout-flex">
                  {/* за да заредим всички items */}
                  {items.map(x=> <Item key={x.id} {...x}/>)}
                </article>
            </div>
        </main>
    )
}
export default Main