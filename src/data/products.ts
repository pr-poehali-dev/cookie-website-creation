export interface Product {
  id: number;
  title: string;
  desc: string;
  price: number;
  stock: number;
  category: string;
  hit?: boolean;
}

export const categories = [
  'Все',
  'MM2',
  'Blox Fruits',
  'Pet Simulator',
  'Grow a Garden',
  'Донат / Робуксы',
] as const;

export const products: Product[] = [
  { id: 1, title: 'MM2 (70+ LVL) готовый аккаунт', desc: 'Прокачанный профиль Murder Mystery 2, редкие ножи и петы', price: 349, stock: 42, category: 'MM2', hit: true },
  { id: 2, title: 'MM2 Godly набор', desc: 'Аккаунт с Godly ножами: Chroma, Corrupt и др.', price: 899, stock: 8, category: 'MM2' },
  { id: 3, title: 'MM2 стартовый аккаунт', desc: 'Свежий аккаунт для старта в MM2', price: 99, stock: 320, category: 'MM2' },
  { id: 4, title: 'Blox Fruits (3 Мора)', desc: 'Аккаунт Blox Fruits с 3rd Sea, прокачка и фрукты', price: 549, stock: 27, category: 'Blox Fruits', hit: true },
  { id: 5, title: 'Blox Fruits MAX LVL 2550', desc: 'Максимальный уровень, мифический фрукт в наличии', price: 1290, stock: 5, category: 'Blox Fruits' },
  { id: 6, title: 'Blox Fruits стартовый', desc: 'Аккаунт для новичков, 1st Sea', price: 129, stock: 210, category: 'Blox Fruits' },
  { id: 7, title: 'Pet Simulator 99 [1+ час]', desc: 'Аккаунт с редкими петами и валютой PS99', price: 459, stock: 33, category: 'Pet Simulator' },
  { id: 8, title: 'Pet Simulator Huge набор', desc: 'Huge петы и эксклюзивы Pet Simulator', price: 1590, stock: 4, category: 'Pet Simulator', hit: true },
  { id: 9, title: 'Grow a Garden [Bad...]', desc: 'Прокачанный сад, редкие семена и мутации', price: 279, stock: 61, category: 'Grow a Garden' },
  { id: 10, title: 'Grow a Garden PRO', desc: 'Полный набор редких растений и питомцев', price: 699, stock: 12, category: 'Grow a Garden' },
  { id: 11, title: 'Донат от 1,000 R$', desc: 'Аккаунт с задоначенными робуксами от 1000', price: 129, stock: 6036, category: 'Донат / Робуксы' },
  { id: 12, title: 'Донат от 5,000 R$', desc: 'Аккаунт с задоначенными робуксами от 5000', price: 189, stock: 887, category: 'Донат / Робуксы' },
  { id: 13, title: 'Донат от 10,000 R$', desc: 'Аккаунт с задоначенными робуксами от 10000', price: 319, stock: 600, category: 'Донат / Робуксы', hit: true },
  { id: 14, title: 'Донатки без почты', desc: 'Быстрая выдача, аккаунты с донатом без привязки', price: 189, stock: 3240, category: 'Донат / Робуксы' },
  { id: 15, title: 'Аккаунты с PLUS', desc: 'Бывшая категория premium, редкий статус', price: 699, stock: 170, category: 'Донат / Робуксы' },
  { id: 16, title: 'Blade Ball [1+ час Playtime]', desc: 'Аккаунт Blade Ball с наигранным временем', price: 199, stock: 74, category: 'Донат / Робуксы' },
];
