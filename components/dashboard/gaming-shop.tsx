'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3, Package, ShoppingBag, Sparkles, Truck, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const categories = ['All items', 'Gaming coins', 'Gear', 'Digital keys']
const products = [
  { name: 'PUBG UC Pack', game: 'PUBG Mobile', category: 'Gaming coins', price: 9.99, old: 12.99, offer: '23% OFF', detail: '600 UC · instant delivery', color: 'gold' },
  { name: 'BGMI UC Pack', game: 'BGMI', category: 'Gaming coins', price: 8.49, old: 10.99, offer: '23% OFF', detail: '600 UC · instant delivery', color: 'live' },
  { name: 'Nexus Pro Jersey', game: 'Nexus Esports', category: 'Gear', price: 34.99, old: 44.99, offer: 'LIMITED', detail: 'Black · sizes S–XXL', color: 'primary' },
  { name: 'Booyah Diamond Drop', game: 'Free Fire', category: 'Gaming coins', price: 4.99, old: 6.49, offer: 'FLASH', detail: '310 diamonds · instant delivery', color: 'bronze' },
  { name: 'Nightfall Points Card', game: 'Valorant', category: 'Digital keys', price: 19.99, old: 24.99, offer: '20% OFF', detail: '1,725 VP · digital key', color: 'accent' },
  { name: 'Org Supporter Bundle', game: 'Nexus Esports', category: 'Gear', price: 49.99, old: 59.99, offer: 'BUNDLE', detail: 'Cap + jersey + badge', color: 'primary' },
]

export function GamingShop() {
  const [category, setCategory] = useState('All items')
  const [cart, setCart] = useState<string[]>([])
  const [showOrders, setShowOrders] = useState(false)
  const filtered = useMemo(() => products.filter((product) => category === 'All items' || product.category === category), [category])
  return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Sparkles className="size-3" /> Nexus Gaming Shop</div><h1 className="font-display text-3xl font-bold sm:text-4xl">Gear up. Play more.</h1><p className="mt-1 text-sm text-muted-foreground">Gaming coins, digital keys and official organization gear with mock checkout flow.</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => setShowOrders(!showOrders)}><Package className="size-4" /> Orders</Button><Button className="glow-primary"><ShoppingBag className="size-4" /> Cart ({cart.length})</Button></div></div>
    {showOrders && <div className="mb-6 grid gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:grid-cols-3"><div className="flex items-center gap-3"><CheckCircle2 className="size-5 text-primary" /><div><div className="text-sm font-semibold">Order NX-2048</div><div className="text-xs text-muted-foreground">PUBG UC Pack · Delivered</div></div></div><div className="flex items-center gap-3"><Truck className="size-5 text-gold" /><div><div className="text-sm font-semibold">Order NX-2044</div><div className="text-xs text-muted-foreground">Jersey · In transit</div></div></div><div className="flex items-center gap-3"><Clock3 className="size-5 text-muted-foreground" /><div><div className="text-sm font-semibold">Order NX-2039</div><div className="text-xs text-muted-foreground">Digital key · Processing</div></div></div></div>}
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={cn('shrink-0 rounded-full border px-4 py-2 text-sm font-semibold', category === item ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground')}>{item}</button>)}</div>
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="glass rounded-2xl p-4"><Wallet className="size-5 text-primary" /><div className="mt-3 text-lg font-bold">Instant delivery</div><p className="text-xs text-muted-foreground">Coins and keys delivered after secure checkout.</p></div><div className="glass rounded-2xl p-4"><Sparkles className="size-5 text-gold" /><div className="mt-3 text-lg font-bold">Offer levels</div><p className="text-xs text-muted-foreground">Flash, bundle, limited and percentage discounts.</p></div><div className="glass rounded-2xl p-4"><Truck className="size-5 text-live" /><div className="mt-3 text-lg font-bold">Track every order</div><p className="text-xs text-muted-foreground">Processing, in transit and delivered states.</p></div></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <article key={product.name} className="glass glass-hover overflow-hidden rounded-2xl"><div className={cn('flex h-36 items-end justify-between bg-gradient-to-br p-5', product.color === 'gold' ? 'from-gold/30 to-background' : product.color === 'live' ? 'from-live/25 to-background' : product.color === 'bronze' ? 'from-bronze/30 to-background' : 'from-primary/25 to-background')}><div className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-background/40 text-2xl"><ShoppingBag className="size-7" /></div><Badge variant="gold">{product.offer}</Badge></div><div className="p-5"><div className="text-xs text-muted-foreground">{product.game} · {product.category}</div><h2 className="mt-1 font-display text-xl font-bold">{product.name}</h2><p className="mt-1 text-sm text-muted-foreground">{product.detail}</p><div className="mt-5 flex items-end justify-between"><div><span className="font-display text-2xl font-bold">${product.price.toFixed(2)}</span><span className="ml-2 text-sm text-muted-foreground line-through">${product.old.toFixed(2)}</span></div><Button size="sm" onClick={() => setCart((items) => items.includes(product.name) ? items : [...items, product.name])}>{cart.includes(product.name) ? 'Added' : 'Add to cart'}</Button></div></div></article>)}</div>
  </div>
}
