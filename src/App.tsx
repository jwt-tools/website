import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/header/Header';
import { loadKeys } from './scripts/keys';
import { validateToken } from './scripts/tokens';
import { createDatabase } from './storage/db';

function App() {
  (async () => {
    await createDatabase();
    await loadKeys('https://www.googleapis.com/oauth2/v3/certs');
    await validateToken('eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1ZjRiZjQ2ZTUyYjMxZDliNjI0OWY3MzA5YWQwMzM4NDAwNjgwY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MTQzMzQ1MzM3ODAtMTEzbDUwZTFtYzhqc2h0cDRvZDZjcWxka3AzaTQzbmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MTQzMzQ1MzM3ODAtMTEzbDUwZTFtYzhqc2h0cDRvZDZjcWxka3AzaTQzbmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUzNTczNzQ1ODU4MzQ0Nzc4NTIiLCJoZCI6InJvd25kLmlvIiwiZW1haWwiOiJib2JieUByb3duZC5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE2OTkzNjg1OTcsIm5hbWUiOiJCb2JieSBSYWRmb3JkIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0w5TVg1QmJoWXdvbmEtcnJBb1lxcHRkeXBaZzdaM0hKclg5Mjc0Vlk5WXpnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkJvYmJ5IiwiZmFtaWx5X25hbWUiOiJSYWRmb3JkIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTkzNjg4OTcsImV4cCI6MTY5OTM3MjQ5NywianRpIjoiNGE0MGI5YTgzMmJiMDEzMmRiMTQxYzQzNjFhOThjYzAxNGMyMTc5NSJ9.opKgLzwxpEm6N7sX-GmvbGrB1Of9NuonVYPBi8HU_FyyfUyjMZrLq2cUkBEUajuSyyXdHqtvX6WUtfI-aKR8LHznykaBfcWYcJd81nlrhXL4sAqU1A4_LhTtGiirDgpKUmRLtnMk5kKiNct3ssGvjbmAytMimGbVHjZWOW_0PGtAuPnyXYqvMV-OFJEFBB-bGmmUBBkcKfzy3w_kavUQNcRL0AcWGONVSznAiAPVexIemjf7eeB16ZqC2qHiC1VcLboDufNXFWVJV9kwBRzErnx5khMDQfvD34Bbwoanqu5MmpSNmj7RRNQGWF1286sTqb339Ud4dxKsj68kzAULEA');
  })();

  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
