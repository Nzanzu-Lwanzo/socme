import { Link, useLocation } from "react-router-dom";

const Page404 = () => {
  const { pathname } = useLocation();
  return (
    <main className="page__404">
      <div className="card">
        <h1>ERROR 404</h1>
        <p>Une page n'a pas été trouvée à l'adresse "{pathname}"</p>
        <Link to="/" className="link">
          Retour au Feed
        </Link>
      </div>
    </main>
  );
};

export default Page404;
