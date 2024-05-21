import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import styles from '../styles/ErrorPage.module.css';

/**
 * Page shown when navigating to a non-existent route.
 */
export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className={styles.container}>
      <h1>
        Oh no, um erro foi encontrado!
      </h1>
      {isRouteErrorResponse(error) && (
        <>
          <p>{`Status: ${error.status} ${error.statusText}`}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </>
      )}
      <button className={styles.button} onClick={() => navigate('/')}>
        Go back
      </button>
    </div>
  );
}