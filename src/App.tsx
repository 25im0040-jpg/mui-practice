import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Rating,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Fab,
  Tooltip,
} from '@mui/material';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string;
  rating: number;
  isFavorite: boolean;
  comment: string;
  imageUrl: string;
}

// 第五人格の画像を公式キービジュアル/タイトル画像に更新
const initialGames: Game[] = [
  {
    id: 1,
    title: 'ブロスタ',
    genre: '3vs3バトル/アクション',
    platform: 'スマホ',
    rating: 5,
    isFavorite: true,
    comment: '多彩なキャラクターとテンポの良い3分間バトルが熱い！',
    imageUrl: 'https://item-shopping.c.yimg.jp/i/n/lupo_brawl-st55-01',
  },
  {
    id: 2,
    title: '第五人格',
    genre: '非対称対戦型アクション',
    platform: 'スマホ / PC',
    rating: 4,
    isFavorite: false,
    comment: 'ゴシックな画風と、ハンター対サバイバーの緊張感がたまらない。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Identity_V_cover.jpg',
  },
  {
    id: 3,
    title: '高能英雄',
    genre: 'バトルロイヤル/FPS',
    platform: 'スマホ',
    rating: 5,
    isFavorite: true,
    comment: '近未来的な世界観で、スキルを駆使した爽快な戦闘が楽しめる。',
    imageUrl: 'https://shp.qpic.cn/cfwebcap/0/0310eca3119137a7eb32a133472d6f48/0/?width=1920&height=1080',
  },
];

export default function App() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('RPG');
  const [platform, setPlatform] = useState('PC');
  const [rating, setRating] = useState<number | null>(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState('');

  const handleAddGame = () => {
    if (!title) return;
    const newGame: Game = {
      id: Date.now(),
      title,
      genre,
      platform,
      rating: rating || 3,
      isFavorite,
      comment,
      imageUrl: 'https://item-shopping.c.yimg.jp/i/n/lupo_brawl-st55-01',
    };
    setGames([...games, newGame]);
    setOpenDialog(false);
    resetForm();
    showSnackbar('新しいゲームを追加しました！');
  };

  const resetForm = () => {
    setTitle('');
    setGenre('RPG');
    setPlatform('PC');
    setRating(3);
    setIsFavorite(false);
    setComment('');
  };

  const handleDelete = (id: number) => {
    setGames(games.filter((g) => g.id !== id));
    showSnackbar('ゲームを削除しました。');
  };

  const toggleFavorite = (id: number) => {
    setGames(
      games.map((g) => (g.id === id ? { ...g, isFavorite: !g.isFavorite } : g))
    );
  };

  const showSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
  };

  return (
    <>
      <CssBaseline />

      <AppBar position="static" color="primary">
        <Toolbar>
          <SportsEsportsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            マイ・ゲームライブラリ
          </Typography>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>
            ゲームを追加
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: '#f8f9fa' }}>
          <Typography variant="h5" gutterBottom>
            おすすめ・プレイ済みゲーム一覧
          </Typography>
          <Typography variant="body2" color="text.secondary">
            お気に入りのゲームタイトルやレビュー、星評価をまとめて管理・紹介できます。
          </Typography>
        </Paper>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item key={game.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={game.imageUrl}
                  alt={game.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Chip label={game.genre} color="primary" size="small" />
                    <Chip label={game.platform} variant="outlined" size="small" />
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {game.title}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Rating value={game.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {game.comment}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="favorite"
                    onClick={() => toggleFavorite(game.id)}
                    color="secondary"
                  >
                    {game.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(game.id)}
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Tooltip title="新しいゲームを追加">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpenDialog(true)}
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>新しいゲーム情報の追加</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="ゲームタイトル"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>ジャンル</InputLabel>
                <Select
                  value={genre}
                  label="ジャンル"
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <MenuItem value="3vs3バトル/アクション">3vs3バトル/アクション</MenuItem>
                  <MenuItem value="非対称対戦型アクション">非対称対戦型アクション</MenuItem>
                  <MenuItem value="バトルロイヤル/FPS">バトルロイヤル/FPS</MenuItem>
                  <MenuItem value="RPG">RPG</MenuItem>
                  <MenuItem value="パズル">パズル</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>プラットフォーム</InputLabel>
                <Select
                  value={platform}
                  label="プラットフォーム"
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <MenuItem value="スマホ">スマホ</MenuItem>
                  <MenuItem value="スマホ / PC">スマホ / PC</MenuItem>
                  <MenuItem value="PC">PC</MenuItem>
                  <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
                  <MenuItem value="PS5">PS5</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography component="legend">おすすめ評価</Typography>
                <Rating
                  name="game-rating"
                  value={rating}
                  onChange={(_, newValue) => setRating(newValue)}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFavorite}
                    onChange={(e) => setIsFavorite(e.target.checked)}
                  />
                }
                label="お気に入りに登録する"
              />

              <TextField
                label="レビュー・メモ"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
            <Button onClick={handleAddGame} variant="contained">
              追加する
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}