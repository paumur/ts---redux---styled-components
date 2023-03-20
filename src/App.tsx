import './App.css';
import { MyButton } from './stories/MyButton';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { decrement, increment } from '../src/stories/counterSlice';
import { api } from './apiSlice';

function App() {
  const count = useAppSelector((state) => state.counter.value);

  const useGetAllProductsQuery = api.endpoints.getAllProducts.useQuery(); // Norejau const iskelti is komponento, taciau negaliu, nes naudoja react hooks. Bent jau taip supratau
  const fetechedData = useGetAllProductsQuery?.currentData?.products.slice(
    0,
    count
  );

  console.log(fetechedData);

  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className='App'>
      <MyButton onClick={handleIncrement} text='Increment'></MyButton>
      <h2>{count}</h2>
      <MyButton onClick={handleDecrement} text='Decrement'></MyButton>
      <h2>Product list</h2>
      {fetechedData?.length !== 0 && (
        <ol>
          {fetechedData?.map((item, i) => (
            <li key={i}>
              {item.title} - {item.price} $
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
