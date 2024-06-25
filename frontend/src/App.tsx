import { createBrowserRouter,
  RouterProvider,
  createRoutesFromElements, 
  Route
 } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />}></Route>
  </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
