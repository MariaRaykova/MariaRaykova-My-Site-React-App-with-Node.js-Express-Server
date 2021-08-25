const { useSelector, useDispatch } = require("react-redux")


const Counter = () =>{
  //четем стойността от store-а
  const count = useSelector(selectCount)
  //връща dispatch метода
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')
  return (
    <div>
      <div >
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  )
}

}