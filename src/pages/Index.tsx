import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { products, categories, type Product } from '@/data/products';

const paymentMethods = [
  { id: 'card', label: 'Банковская карта', icon: 'CreditCard' },
  { id: 'sbp', label: 'СБП', icon: 'Landmark' },
  { id: 'crypto', label: 'Криптовалюта', icon: 'Bitcoin' },
  { id: 'yoomoney', label: 'ЮMoney', icon: 'Wallet' },
];

const liveFeed = [
  { user: 'kir***', item: 'MM2 (70+ LVL)', ago: 'только что' },
  { user: 'Zaw***', item: 'Blade Ball [1+час]', ago: '3 мин' },
  { user: 'van***', item: 'Pet Simulator 99', ago: '3 мин' },
  { user: 'Art***', item: 'Grow a Garden 2', ago: '5 мин' },
  { user: 'nik***', item: 'Blox Fruits (3 Мора)', ago: '6 мин' },
  { user: 'dm1***', item: 'Донат от 10,000 R$', ago: '8 мин' },
];

const reviews = [
  { name: 'ShadowXPlay', avatar: 'S', rating: 5, text: 'Купил аккаунт MM2 с годли ножами — всё выдали за 2 минуты, данные рабочие. Топ магазин!' },
  { name: 'NoobMaster69', avatar: 'N', rating: 5, text: 'Брал Blox Fruits макс лвл, всё честно. Поддержка ответила ночью за 5 минут.' },
  { name: 'PixelQueenn', avatar: 'P', rating: 5, text: 'Донат аккаунт пришёл моментально, робуксы на месте. Уже третий раз покупаю тут.' },
  { name: 'DarkFoxYT', avatar: 'D', rating: 4, text: 'Pet Simulator аккаунт норм, петы редкие. Единственное — ждал минут 10, но всё выдали.' },
  { name: 'ToxicSlayer', avatar: 'T', rating: 5, text: 'Цены реально ниже чем везде. Взял сразу два аккаунта, оба рабочие. Рекомендую!' },
  { name: 'MoonlightGG', avatar: 'M', rating: 5, text: 'Grow a Garden PRO — сад просто огонь, редкие мутации. Спасибо большое!' },
  { name: 'FrostbiteRex', avatar: 'F', rating: 5, text: 'Заказал донат аккаунт на 10к робуксов — всё пришло мгновенно, без обмана.' },
  { name: 'LunaVortex', avatar: 'L', rating: 5, text: 'Первый раз покупала аккаунт онлайн, боялась развода. Всё чётко, спасибо магазину!' },
  { name: 'RapidBlaze', avatar: 'R', rating: 5, text: 'Blade Ball аккаунт с наигранным временем — ровно как описано. Быстро и удобно.' },
  { name: 'CyberNinja88', avatar: 'C', rating: 4, text: 'MM2 стартовый аккаунт для друга — цена супер низкая, всё работает отлично.' },
  { name: 'VelvetStorm', avatar: 'V', rating: 5, text: 'Аккаунт с PLUS статусом огонь, ещё и дешевле чем в других магазинах.' },
  { name: 'GhostRunner_', avatar: 'G', rating: 5, text: 'Уже пятая покупка подряд — стабильно быстрая выдача и честные цены.' },
];

const faq = [
  { q: 'Как быстро придёт аккаунт?', a: 'В большинстве случаев выдача происходит автоматически за 1-3 минуты после оплаты.' },
  { q: 'Данные аккаунта рабочие?', a: 'Да, все аккаунты проверяются перед продажей. При проблеме — заменим или вернём деньги.' },
  { q: 'Можно ли поменять почту и пароль?', a: 'Да, после покупки вы получаете полный доступ и можете сменить данные.' },
  { q: 'Какие способы оплаты?', a: 'Карты РФ, СБП, криптовалюта. Оплата защищена.' },
];

const Index = () => {
  const { toast } = useToast();
  const [active, setActive] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [payMethod, setPayMethod] = useState('card');

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        (active === 'Все' || p.category === active) &&
        p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [active, search]);

  const total = cart.reduce((s, p) => s + p.price, 0);
  const add = (p: Product) => {
    setCart((c) => [...c, p]);
    toast({ title: 'Добавлено в корзину', description: p.title });
  };
  const removeAt = (i: number) => setCart((c) => c.filter((_, idx) => idx !== i));
  const checkout = () => {
    toast({
      title: 'Заказ оформлен!',
      description: `Оплата: ${paymentMethods.find((m) => m.id === payMethod)?.label}. Сумма ${total} ₽`,
    });
    setCart([]);
    setCartOpen(false);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-purple glow">
              <Icon name="Cookie" size={20} className="text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">Cookie Stock</span>
          </button>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <button onClick={() => scrollTo('shop')} className="hover:text-foreground transition-colors">Магазин</button>
            <button onClick={() => scrollTo('support')} className="hover:text-foreground transition-colors">Поддержка</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-foreground transition-colors">Отзывы</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-foreground transition-colors">Вопросы</button>
            <button onClick={() => scrollTo('about')} className="hover:text-foreground transition-colors">О нас</button>
          </nav>
          <Button onClick={() => setCartOpen(true)} className="gradient-purple text-white font-semibold gap-2 rounded-full">
            <Icon name="ShoppingBag" size={18} />
            <span>{total} ₽</span>
            {cart.length > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-bold text-primary">{cart.length}</span>
            )}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden grid-bg">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1fr_auto] md:py-24">
          <div className="animate-fade-up max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" /> Магазин аккаунтов Roblox
            </div>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Cookie <span className="gradient-text">Stock</span>
            </h1>
            <div className="my-5 h-1 w-20 rounded-full gradient-purple" />
            <p className="text-lg text-muted-foreground">
              Покупай аккаунты Roblox — MM2, Blox Fruits, Pet Simulator и донат — по выгодным ценам с моментальной выдачей.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollTo('shop')} size="lg" className="gradient-purple glow rounded-full px-7 font-semibold text-white">
                В каталог <Icon name="ArrowRight" size={18} className="ml-1.5" />
              </Button>
              <Button onClick={() => scrollTo('faq')} size="lg" variant="secondary" className="rounded-full px-7 font-semibold">
                Вопросы
              </Button>
            </div>
          </div>

          {/* Stats card */}
          <div className="animate-fade-up rounded-3xl border border-border bg-card/60 p-7 backdrop-blur-sm md:w-80">
            <div className="mb-6">
              <div className="text-4xl font-black gradient-text">601 180</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Продано</div>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-black gradient-text">38 267</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">В наличии</div>
            </div>
            <div className="rounded-2xl bg-secondary/60 p-4">
              <div className="text-sm font-semibold">03.07.2026 — 14:27</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Последний завоз</div>
            </div>
          </div>
        </div>

        {/* Live feed marquee */}
        <div className="relative border-y border-border/60 bg-card/40 py-3">
          <div className="container flex items-center gap-4">
            <span className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400" /> LIVE
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="flex w-max animate-marquee gap-3">
                {[...liveFeed, ...liveFeed].map((f, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
                    <span className="font-bold">{f.user}</span>
                    <span className="text-muted-foreground">{f.item}</span>
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">{f.ago}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="container py-16">
        <div className="mb-8 flex flex-col gap-5">
          <div className="relative max-w-md">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск товара..."
              className="h-12 rounded-full border-border bg-card pl-11"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all ${
                  active === c
                    ? 'gradient-purple text-white glow'
                    : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-baseline gap-3">
          <h2 className="text-2xl font-black">Каталог</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} товаров</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 transition-all"
            >
              {p.hit && (
                <span className="absolute right-4 top-4 rounded-full gradient-purple px-3 py-1 text-xs font-bold uppercase text-white">Хит</span>
              )}
              <div className="mb-4 grid h-32 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-transparent">
                <Icon name="Gamepad2" size={40} className="text-primary/70" />
              </div>
              <h3 className="mb-1 font-bold leading-snug">{p.title}</h3>
              <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-black">{p.price} <span className="text-lg">₽</span></span>
                <span className="grid h-9 min-w-9 place-items-center rounded-full border border-border px-2 text-xs font-semibold text-muted-foreground">
                  {p.stock}
                </span>
              </div>
              <Button onClick={() => add(p)} className="gradient-purple w-full rounded-full font-semibold text-white">
                Купить
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative overflow-hidden py-16">
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black md:text-4xl">Отзывы покупателей</h2>
            <p className="mt-2 text-muted-foreground">Более 15 000 довольных клиентов</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-3xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full gradient-purple font-bold text-white">{r.avatar}</div>
                  <div>
                    <div className="font-bold">{r.name}</div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon key={s} name="Star" size={14} className={s < r.rating ? 'fill-yellow-400' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-16">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">О нас</h2>
            <p className="mt-4 text-muted-foreground">
              Cookie Stock — надёжный магазин аккаунтов Roblox с 2022 года. Мы продаём проверенные аккаунты популярных игр:
              Murder Mystery 2, Blox Fruits, Pet Simulator, Grow a Garden и донат-аккаунты с робуксами.
            </p>
            <p className="mt-3 text-muted-foreground">
              Автоматическая выдача, честные цены и поддержка 24/7. Каждый аккаунт проверяется перед продажей.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'Zap', label: 'Моментальная выдача', v: '1-3 мин' },
              { icon: 'ShieldCheck', label: 'Гарантия на аккаунты', v: '100%' },
              { icon: 'Users', label: 'Довольных клиентов', v: '15 000+' },
              { icon: 'Clock', label: 'Поддержка', v: '24/7' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-secondary/50 p-5">
                <Icon name={s.icon} size={26} className="mb-3 text-primary" />
                <div className="text-2xl font-black">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-16">
        <h2 className="mb-8 text-center text-3xl font-black md:text-4xl">Частые вопросы</h2>
        <div className="mx-auto grid max-w-3xl gap-4">
          {faq.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-2 flex items-center gap-2 font-bold">
                <Icon name="HelpCircle" size={18} className="text-primary" /> {f.q}
              </div>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support / Contacts */}
      <section id="support" className="container py-16">
        <div className="relative overflow-hidden rounded-3xl gradient-purple p-8 text-center text-white md:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-black md:text-4xl">Нужна помощь? Мы на связи</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Поддержка работает круглосуточно. Напишите нам — ответим за пару минут.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" className="rounded-full font-semibold gap-2">
                <Icon name="Send" size={18} /> Telegram
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full font-semibold gap-2">
                <Icon name="MessageCircle" size={18} /> Онлайн-чат
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full font-semibold gap-2">
                <Icon name="Mail" size={18} /> Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-purple">
              <Icon name="Cookie" size={16} className="text-white" />
            </div>
            <span className="font-extrabold">Cookie Stock</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Cookie Stock. Аккаунты Roblox.</p>
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-card animate-fade-up">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h3 className="flex items-center gap-2 text-lg font-black">
                <Icon name="ShoppingBag" size={20} className="text-primary" /> Корзина
              </h3>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-secondary">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              {cart.length === 0 ? (
                <div className="mt-20 text-center text-muted-foreground">
                  <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-40" />
                  Корзина пуста
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-purple">
                        <Icon name="Gamepad2" size={20} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{p.title}</div>
                        <div className="text-sm font-bold text-primary">{p.price} ₽</div>
                      </div>
                      <button onClick={() => removeAt(i)} className="rounded-full p-2 text-muted-foreground hover:text-destructive">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-border p-5">
              {cart.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 text-sm font-semibold text-muted-foreground">Способ оплаты</div>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                          payMethod === m.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={m.icon} size={16} />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Итого</span>
                <span className="text-2xl font-black">{total} ₽</span>
              </div>
              <Button onClick={checkout} disabled={cart.length === 0} className="gradient-purple w-full rounded-full font-semibold text-white">
                Оплатить и оформить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;