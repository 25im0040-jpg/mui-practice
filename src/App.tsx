import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MUI アプリへようこそ！
      </Typography>
      <Button variant="contained" color="primary">
        MUI のボタン
      </Button>
    </Container>
  );
}

export default App;