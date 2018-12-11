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
  child: require('./child.png'),
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
  { name: 'Sol', image: 'sun' },
  { name: 'Lua', image: 'moon' },
  { name: 'Mochila', image: 'bag' },
  { name: 'Cama', image: 'bed' },
  { name: 'Blocos', image: 'blocks' },
  { name: 'Livro', image: 'book' },
  { name: 'Cereais', image: 'breakfast' },
  { name: 'Pente', image: 'comb' },
  { name: 'Armario', image: 'drawers' },
  { name: 'Talheres', image: 'fork' },
  { name: 'T-Shirt', image: 'shirt' },
  { name: 'Trabalhos', image: 'paper' },
  { name: 'Escova de dentes', image: 'toothbrush' },
  { name: 'Sapatilhas', image: 'sneakers' },
  { name: 'Chuveiro', image: 'shower' },
  { name: 'Dormir', image: 'sleep' },
  { name: 'Meias', image: 'socks' },
  { name: 'Cha', image: 'tea' }
]

export const avatars = {
  boy: { overlay: require('./avatar/boy.png'), position: 0 },
  girl: { overlay: require('./avatar/girl.png'), position: 0 }
}

export const avatarItems = [
  { id: 0, overlay: require('./avatar/dogOverlay.png'), thumbnail: require('./avatar/dog.png'), position: 4, price: 30, category: 'Mascotes' },
  { id: 1, overlay: require('./avatar/catOverlay.png'), thumbnail: require('./avatar/cat.png'), position: 4, price: 20, category: 'Mascotes' },
  { id: 2, overlay: require('./avatar/dragonOverlay.png'), thumbnail: require('./avatar/dragon.png'), position: 4, price: 100, category: 'Mascotes' },
  { id: 3, overlay: require('./avatar/ballOverlay.png'), thumbnail: require('./avatar/ball.png'), position: 3, price: 10, category: 'Objectos' },
  { id: 4, overlay: require('./avatar/santaHatOverlay.png'), thumbnail: require('./avatar/santaHat.png'), position: 3, price: 20, category: 'Chapéus' },
  { id: 5, overlay: require('./avatar/tophatOverlay.png'), thumbnail: require('./avatar/tophat.png'), position: 3, price: 20, category: 'Chapéus' },
  { id: 6, overlay: require('./avatar/wandOverlay.png'), thumbnail: require('./avatar/wand.png'), position: 3, price: 10, category: 'Objectos' },
  { id: 7, overlay: require('./avatar/guitarOverlay.png'), thumbnail: require('./avatar/guitar.png'), position: 3, price: 80, category: 'Objectos' },
  { id: 8, overlay: require('./avatar/headphonesOverlay.png'), thumbnail: require('./avatar/headphones.png'), position: 2, price: 40, category: 'Objectos' },
  { id: 9, overlay: require('./avatar/bowOverlay.png'), thumbnail: require('./avatar/bow.png'), position: 2, price: 40, category: 'Acessórios' },
  { id: 10, overlay: require('./avatar/skiGlassesOverlay.png'), thumbnail: require('./avatar/skiGlasses.png'), position: 2, price: 10, category: 'Acessórios' },
  { id: 11, overlay: require('./avatar/astronautOverlay.png'), thumbnail: require('./avatar/astronaut.png'), position: 1, price: 150, category: 'Objectos' },
  { id: 12, overlay: require('./avatar/capeOverlay.png'), thumbnail: require('./avatar/cape.png'), position: -1, price: 50, category: 'Acessórios' }
]

export const avatarCategories = [ 'Acessórios', 'Chapéus', 'Mascotes', 'Objectos' ]

export default images
