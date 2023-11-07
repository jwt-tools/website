import React, { FormEvent, useState } from 'react';
import './JWKInput.scss';
import { loadKeys } from '../../../scripts/keys';

const JWKinput: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [endpoint, setEndpoint] = useState('');
  const [validated, setValidated] = useState(false);

  const onSubmit = ((e?: FormEvent<HTMLFormElement>) => {
    if (!e) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    
    const formData = new FormData(e.target as HTMLFormElement)
    const ep = formData.get('') as string;
    submitKeysEndpoint(ep);
  });

  const submitKeysEndpoint = ((ep: string) => {
    if (!ep) {
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);
      setValidated(false);

      try {
        const result = await loadKeys(ep);
        if (result) {
          setValidated(true);
        }
      } catch (err) {
        setError(err as Error);
        setValidated(false);
      } finally {
        setLoading(false);
      }
    })();
  })

  return (
    <div id="jwk_endpoint" className="jwk_endpoint">
      <form id="jwk_endpoint_form" className="jwk_endpoint__form" onSubmit={onSubmit}>
        <div className="jwk_endpoint__header">
          <p>Validate with JWK endpoint</p>
        </div>
        <div className="jwk_endpoint__content">
          <input type="text" name="endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} onBlur={() => submitKeysEndpoint(endpoint)} placeholder="Enter keys endpoint here"></input>
        </div>
        <div className="jwk_endpoint__footer">
          {loading && <p>Loading keys...</p>}
          {validated && <p className="success">Valid endpoint!</p>}
          {error && <p className="failure">Invalid JWKs endpoint!</p>}
        </div>
      </form>
    </div>
  );
}

export default JWKinput;
