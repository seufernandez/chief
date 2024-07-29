import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Feel free to navigate to home page by clicking below:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
