const images = {
  sun: require('./routines/sun.png'),
  moon: require('./routines/moon.png'),
  bag: require('./activities/bag.png'),
  bed: require('./activities/bed.png'),
  blocks: require('./activities/blocks.png'),
  book: require('./activities/book.png'),
  breakfast: require('./activities/breakfast.png'),
  comb: require('./activities/comb.png'),
  drawers: require('./activities/drawers.png'),
  fork: require('./activities/fork.png'),
  shirt: require('./activities/shirt.png'),
  paper: require('./activities/paper.png'),
  toothbrush: require('./activities/toothbrush.png'),
  sneakers: require('./activities/sneakers.png'),
  shower: require('./activities/shower.png'),
  sleep: require('./activities/sleep.png'),
  socks: require('./activities/socks.png'),
  tea: require('./activities/tea.png'),
  pool: require('./pool.jpg'),
  avatar: require('./avatar.png'),
  cap: require('./cap.png'),
  ui: {
    play: require('./navigation/play.png'),
    cancel: require('./navigation/cancel.png'),
    pause: require('./navigation/pause.png'),
    confirm: require('./navigation/confirm.png'),
    next: require('./navigation/next.png'),
    star: require('./star.png'),
    sad: require('./sad.png'),
    info: require('./info-button.png')
  }
}

export const availableImages = [
  { name: 'Armário', image: 'drawers' },
  { name: 'Blocos', image: 'blocks' },
  { name: 'Cama', image: 'bed' },
  { name: 'Cereais', image: 'breakfast' },
  { name: 'Chuveiro', image: 'shower' },
  { name: 'Chá', image: 'tea' },
  { name: 'Dormir', image: 'sleep' },
  { name: 'Escova de dentes', image: 'toothbrush' },
  { name: 'Livro', image: 'book' },
  { name: 'Lua', image: 'moon' },
  { name: 'Meias', image: 'socks' },
  { name: 'Mochila', image: 'bag' },
  { name: 'Pente', image: 'comb' },
  { name: 'Sapatilhas', image: 'sneakers' },
  { name: 'Sol', image: 'sun' },
  { name: 'T-Shirt', image: 'shirt' },
  { name: 'Talheres', image: 'fork' },
  { name: 'Trabalhos', image: 'paper' }
]

export default images
