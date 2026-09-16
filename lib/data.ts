export type GameId =
  | 'nova-strike'
  | 'rift-legends'
  | 'apex-arena'
  | 'frontline'
  | 'titan-clash'
  | 'velocity'
  | 'pubg-mobile'

export type Game = {
  id: GameId
  name: string
  short: string
  genre: string
  accent: string
}

export const games: Game[] = [
  { id: 'nova-strike', name: 'Nova Strike', short: 'NS', genre: 'Tactical FPS', accent: 'oklch(0.8 0.145 197)' },
  { id: 'rift-legends', name: 'Rift Legends', short: 'RL', genre: 'MOBA', accent: 'oklch(0.7 0.16 300)' },
  { id: 'apex-arena', name: 'Apex Arena', short: 'AA', genre: 'Battle Royale', accent: 'oklch(0.82 0.15 85)' },
  { id: 'frontline', name: 'Frontline', short: 'FL', genre: 'Team Shooter', accent: 'oklch(0.64 0.24 12)' },
  { id: 'titan-clash', name: 'Titan Clash', short: 'TC', genre: 'Fighting', accent: 'oklch(0.6 0.13 160)' },
  { id: 'velocity', name: 'Velocity', short: 'VL', genre: 'Racing', accent: 'oklch(0.75 0.13 240)' },
  { id: 'pubg-mobile', name: 'PUBG Mobile', short: 'PUBG', genre: 'Battle Royale', accent: 'oklch(0.76 0.15 78)' },
]

export const gameMap: Record<GameId, Game> = Object.fromEntries(
  games.map((g) => [g.id, g]),
) as Record<GameId, Game>

export type TournamentStatus = 'live' | 'upcoming' | 'registration' | 'completed'

export type Tournament = {
  id: string
  name: string
  game: GameId
  status: TournamentStatus
  prizePool: number
  currency: string
  region: string
  format: string
  teams: number
  maxTeams: number
  startDate: string
  endDate: string
  organizer: string
  tier: 'S' | 'A' | 'B'
  banner: string
  viewers?: number
  description: string
}

export const tournaments: Tournament[] = [
  {
    id: 'pubg-mobile-global-cup-2026',
    name: 'PUBG Mobile Global Cup 2026',
    game: 'pubg-mobile',
    status: 'registration',
    prizePool: 250000,
    currency: 'USD',
    region: 'Global',
    format: 'Squad · Points Series',
    teams: 48,
    maxTeams: 64,
    startDate: '2026-11-14',
    endDate: '2026-11-22',
    organizer: 'EsportsHub Global',
    tier: 'S',
    banner: '/promo-pubg.png',
    description: 'The global PUBG Mobile squad championship. Forty-eight elite teams battle across Erangel, Miramar and Sanhok for the Global Cup trophy.',
  },
  {
    id: 'nova-masters-2026',
    name: 'Nova Masters: Ignite',
    game: 'nova-strike',
    status: 'live',
    prizePool: 500000,
    currency: 'USD',
    region: 'Global',
    format: 'Single Elimination',
    teams: 16,
    maxTeams: 16,
    startDate: '2026-09-01',
    endDate: '2026-09-14',
    organizer: 'Nova League',
    tier: 'S',
    banner: '/tournament-fps-arena-neon.png',
    viewers: 248390,
    description:
      'The premier Nova Strike championship of the season. Sixteen elite squads battle across a single-elimination gauntlet for the largest prize pool in franchise history.',
  },
  {
    id: 'rift-world-cup',
    name: 'Rift Legends World Cup',
    game: 'rift-legends',
    status: 'live',
    prizePool: 1200000,
    currency: 'USD',
    region: 'International',
    format: 'Double Elimination',
    teams: 24,
    maxTeams: 24,
    startDate: '2026-08-28',
    endDate: '2026-09-20',
    organizer: 'Rift Pro Circuit',
    tier: 'S',
    banner: '/tournament-moba-fantasy-arena.png',
    viewers: 512004,
    description:
      'Twenty-four regional champions converge for the most prestigious MOBA event on the calendar. A grueling group stage feeds a double-elimination playoff bracket.',
  },
  {
    id: 'apex-showdown',
    name: 'Apex Arena Showdown',
    game: 'apex-arena',
    status: 'upcoming',
    prizePool: 250000,
    currency: 'USD',
    region: 'NA',
    format: 'Points Series',
    teams: 20,
    maxTeams: 20,
    startDate: '2026-09-22',
    endDate: '2026-09-25',
    organizer: 'Arena Circuit',
    tier: 'A',
    banner: '/tournament-battle-royale-desert.png',
    description:
      'Twenty trios drop across four days of high-stakes points racing. Consistency and clutch factor decide who lifts the Showdown trophy.',
  },
  {
    id: 'frontline-clash',
    name: 'Frontline Clash Series',
    game: 'frontline',
    status: 'registration',
    prizePool: 120000,
    currency: 'USD',
    region: 'EU',
    format: 'Single Elimination',
    teams: 22,
    maxTeams: 32,
    startDate: '2026-10-05',
    endDate: '2026-10-12',
    organizer: 'Clash Org',
    tier: 'B',
    banner: '/tournament-team-shooter-urban.png',
    description:
      'Open registration is live for the European Frontline Clash Series. Amateur and semi-pro rosters compete for a slot in the pro promotion league.',
  },
  {
    id: 'titan-kings',
    name: 'Titan Clash Kings',
    game: 'titan-clash',
    status: 'registration',
    prizePool: 80000,
    currency: 'USD',
    region: 'APAC',
    format: '1v1 Bracket',
    teams: 48,
    maxTeams: 64,
    startDate: '2026-10-10',
    endDate: '2026-10-11',
    organizer: 'Kings Fighting League',
    tier: 'B',
    banner: '/tournament-fighting-game-stage.png',
    description:
      'The largest solo fighting-game bracket in the region. Sign up now to test your combos against the best duelists in APAC.',
  },
  {
    id: 'velocity-grand-prix',
    name: 'Velocity Grand Prix',
    game: 'velocity',
    status: 'upcoming',
    prizePool: 150000,
    currency: 'USD',
    region: 'Global',
    format: 'Circuit',
    teams: 18,
    maxTeams: 18,
    startDate: '2026-09-30',
    endDate: '2026-10-02',
    organizer: 'Velocity Racing League',
    tier: 'A',
    banner: '/tournament-racing-neon-track.png',
    description:
      'Eighteen drivers race a three-day circuit across iconic tracks. Every millisecond and every overtake counts toward the championship crown.',
  },
  {
    id: 'nova-challengers',
    name: 'Nova Challengers Cup',
    game: 'nova-strike',
    status: 'completed',
    prizePool: 60000,
    currency: 'USD',
    region: 'NA',
    format: 'Single Elimination',
    teams: 16,
    maxTeams: 16,
    startDate: '2026-08-01',
    endDate: '2026-08-08',
    organizer: 'Nova League',
    tier: 'B',
    banner: '/tournament-fps-arena-blue.png',
    description:
      'The stepping-stone circuit for rising Nova Strike squads. Vortex Gaming took the crown in a stunning reverse sweep.',
  },
  {
    id: 'rift-summer-split',
    name: 'Rift Summer Split Finals',
    game: 'rift-legends',
    status: 'completed',
    prizePool: 400000,
    currency: 'USD',
    region: 'EU',
    format: 'Double Elimination',
    teams: 8,
    maxTeams: 8,
    startDate: '2026-07-18',
    endDate: '2026-07-27',
    organizer: 'Rift Pro Circuit',
    tier: 'A',
    banner: '/tournament-moba-summer-finals.png',
    description:
      'The climax of the European summer season. Phantom Nine defended their title against a resurgent Aether Guard.',
  },
]

export type Team = {
  id: string
  name: string
  tag: string
  game: GameId
  region: string
  logo: string
  rank: number
  rating: number
  wins: number
  losses: number
  winRate: number
  earnings: number
  founded: number
  followers: number
  bio: string
  achievements: { title: string; placement: string; year: number }[]
}

export const teams: Team[] = [
  {
    id: 'vortex',
    name: 'Vortex Gaming',
    tag: 'VTX',
    game: 'nova-strike',
    region: 'NA',
    logo: '/team-logo-vortex.jpg',
    rank: 1,
    rating: 2184,
    wins: 142,
    losses: 38,
    winRate: 78.9,
    earnings: 2450000,
    founded: 2019,
    followers: 892000,
    bio: 'Vortex Gaming is the reigning Nova Strike powerhouse, known for their aggressive tempo and unshakable clutch presence in elimination scenarios.',
    achievements: [
      { title: 'Nova Masters: Ignite', placement: '1st', year: 2026 },
      { title: 'Nova Challengers Cup', placement: '1st', year: 2026 },
      { title: 'Global Nova Invitational', placement: '2nd', year: 2025 },
    ],
  },
  {
    id: 'phantom-nine',
    name: 'Phantom Nine',
    tag: 'PH9',
    game: 'rift-legends',
    region: 'EU',
    logo: '/team-logo-phantom.jpg',
    rank: 1,
    rating: 2231,
    wins: 156,
    losses: 41,
    winRate: 79.2,
    earnings: 3120000,
    founded: 2017,
    followers: 1240000,
    bio: 'European Rift Legends dynasty with back-to-back split titles. Renowned for macro discipline and a legendary support duo.',
    achievements: [
      { title: 'Rift Summer Split Finals', placement: '1st', year: 2026 },
      { title: 'Rift World Cup', placement: '1st', year: 2025 },
      { title: 'Continental Rift League', placement: '1st', year: 2025 },
    ],
  },
  {
    id: 'crimson-wolves',
    name: 'Crimson Wolves',
    tag: 'CRW',
    game: 'nova-strike',
    region: 'EU',
    logo: '/team-logo-wolves.jpg',
    rank: 2,
    rating: 2098,
    wins: 121,
    losses: 49,
    winRate: 71.2,
    earnings: 1380000,
    founded: 2020,
    followers: 540000,
    bio: 'A tactical juggernaut from Central Europe, the Wolves grind out methodical, map-control-heavy victories.',
    achievements: [
      { title: 'Nova Masters: Ignite', placement: '2nd', year: 2026 },
      { title: 'EU Nova Series', placement: '1st', year: 2025 },
    ],
  },
  {
    id: 'aether-guard',
    name: 'Aether Guard',
    tag: 'AEG',
    game: 'rift-legends',
    region: 'EU',
    logo: '/team-logo-aether.jpg',
    rank: 2,
    rating: 2140,
    wins: 133,
    losses: 55,
    winRate: 70.7,
    earnings: 1720000,
    founded: 2018,
    followers: 610000,
    bio: 'Aether Guard blends veteran shot-calling with fearless rookie carries. Perennial finalists chasing their first world title.',
    achievements: [
      { title: 'Rift Summer Split Finals', placement: '2nd', year: 2026 },
      { title: 'Rift World Cup', placement: '3rd', year: 2025 },
    ],
  },
  {
    id: 'neon-syndicate',
    name: 'Neon Syndicate',
    tag: 'NSY',
    game: 'apex-arena',
    region: 'NA',
    logo: '/team-logo-neon.jpg',
    rank: 1,
    rating: 2056,
    wins: 98,
    losses: 34,
    winRate: 74.2,
    earnings: 940000,
    founded: 2021,
    followers: 388000,
    bio: 'Battle-royale specialists with an unmatched rotation IQ. Neon Syndicate turns end-game chaos into clean point wins.',
    achievements: [
      { title: 'Apex Global Series', placement: '1st', year: 2025 },
      { title: 'Arena Circuit Finals', placement: '2nd', year: 2026 },
    ],
  },
  {
    id: 'iron-vanguard',
    name: 'Iron Vanguard',
    tag: 'IRV',
    game: 'frontline',
    region: 'EU',
    logo: '/team-logo-iron.jpg',
    rank: 1,
    rating: 1988,
    wins: 87,
    losses: 40,
    winRate: 68.5,
    earnings: 520000,
    founded: 2020,
    followers: 210000,
    bio: 'Disciplined objective play and rock-solid defaults define Iron Vanguard, the benchmark for European Frontline squads.',
    achievements: [{ title: 'Frontline EU Masters', placement: '1st', year: 2025 }],
  },
  {
    id: 'solstice',
    name: 'Solstice',
    tag: 'SOL',
    game: 'nova-strike',
    region: 'APAC',
    logo: '/team-logo-solstice.jpg',
    rank: 3,
    rating: 2011,
    wins: 110,
    losses: 60,
    winRate: 64.7,
    earnings: 760000,
    founded: 2019,
    followers: 425000,
    bio: 'APAC firepower built around explosive entry fragging and lightning-fast site executes.',
    achievements: [{ title: 'APAC Nova Championship', placement: '1st', year: 2025 }],
  },
  {
    id: 'obsidian',
    name: 'Obsidian Esports',
    tag: 'OBS',
    game: 'rift-legends',
    region: 'NA',
    logo: '/team-logo-obsidian.jpg',
    rank: 3,
    rating: 1972,
    wins: 101,
    losses: 63,
    winRate: 61.6,
    earnings: 680000,
    founded: 2019,
    followers: 355000,
    bio: 'North American Rift contenders famous for unpredictable draft priorities and scrappy comebacks.',
    achievements: [{ title: 'NA Rift League', placement: '2nd', year: 2026 }],
  },
  {
    id: 'riptide',
    name: 'Riptide',
    tag: 'RIP',
    game: 'apex-arena',
    region: 'APAC',
    logo: '/team-logo-riptide.jpg',
    rank: 2,
    rating: 1944,
    wins: 78,
    losses: 42,
    winRate: 65.0,
    earnings: 410000,
    founded: 2021,
    followers: 176000,
    bio: 'Aggressive APAC trio that thrives in hot drops and early-game brawls.',
    achievements: [{ title: 'APAC Arena Cup', placement: '1st', year: 2026 }],
  },
  {
    id: 'zenith',
    name: 'Zenith GG',
    tag: 'ZEN',
    game: 'frontline',
    region: 'NA',
    logo: '/team-logo-zenith.jpg',
    rank: 2,
    rating: 1901,
    wins: 71,
    losses: 45,
    winRate: 61.2,
    earnings: 300000,
    founded: 2022,
    followers: 132000,
    bio: 'A young, hungry Frontline roster climbing fast on the back of mechanical outplays.',
    achievements: [{ title: 'Clash Series NA', placement: '2nd', year: 2026 }],
  },
  {
    id: 'volt-dynasty',
    name: 'Volt Dynasty',
    tag: 'VLT',
    game: 'velocity',
    region: 'Global',
    logo: '/team-logo-volt.jpg',
    rank: 1,
    rating: 2075,
    wins: 64,
    losses: 22,
    winRate: 74.4,
    earnings: 590000,
    founded: 2020,
    followers: 244000,
    bio: 'The most decorated Velocity racing outfit, blending qualifying pace with flawless race craft.',
    achievements: [{ title: 'Velocity World Series', placement: '1st', year: 2025 }],
  },
  {
    id: 'stormbreak',
    name: 'Stormbreak',
    tag: 'STB',
    game: 'nova-strike',
    region: 'NA',
    logo: '/team-logo-storm.jpg',
    rank: 4,
    rating: 1955,
    wins: 94,
    losses: 66,
    winRate: 58.8,
    earnings: 430000,
    founded: 2021,
    followers: 198000,
    bio: 'Unorthodox utility usage and daring mid-round calls make Stormbreak a nightmare to scout.',
    achievements: [{ title: 'Nova Challengers Cup', placement: '3rd', year: 2026 }],
  },
]

export const teamMap: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t]),
)

export type Player = {
  id: string
  handle: string
  name: string
  team: string
  teamTag: string
  game: GameId
  role: string
  country: string
  avatar: string
  rank: number
  rating: number
  kd: number
  acs: number
  winRate: number
  hoursPlayed: number
  age: number
  earnings: number
  followers: number
  bio: string
  socials: { twitch: string; x: string }
  recentForm: ('W' | 'L')[]
}

export const players: Player[] = [
  {
    id: 'razor',
    handle: 'Razor',
    name: 'Diego Alvarez',
    team: 'vortex',
    teamTag: 'VTX',
    game: 'nova-strike',
    role: 'Duelist / Entry',
    country: 'US',
    avatar: '/player-avatar-razor.jpg',
    rank: 1,
    rating: 1.42,
    kd: 1.38,
    acs: 289,
    winRate: 78.9,
    hoursPlayed: 6420,
    age: 22,
    earnings: 540000,
    followers: 410000,
    bio: 'The most feared entry fragger in Nova Strike. Razor opens sites with surgical aim and impossible reaction speed.',
    socials: { twitch: 'razor_ns', x: 'razorVTX' },
    recentForm: ['W', 'W', 'W', 'L', 'W'],
  },
  {
    id: 'vesper',
    handle: 'Vesper',
    name: 'Lena Novak',
    team: 'phantom-nine',
    teamTag: 'PH9',
    game: 'rift-legends',
    role: 'Mid Lane',
    country: 'CZ',
    avatar: '/player-avatar-vesper.jpg',
    rank: 1,
    rating: 8.9,
    kd: 5.1,
    acs: 0,
    winRate: 79.2,
    hoursPlayed: 7810,
    age: 24,
    earnings: 720000,
    followers: 680000,
    bio: 'A generational mid-lane talent. Vesper dictates tempo and snowballs leads into unstoppable objectives.',
    socials: { twitch: 'vesper_rl', x: 'vesperPH9' },
    recentForm: ['W', 'W', 'W', 'W', 'L'],
  },
  {
    id: 'blitz',
    handle: 'Blitz',
    name: 'Marcus Feld',
    team: 'crimson-wolves',
    teamTag: 'CRW',
    game: 'nova-strike',
    role: 'IGL / Sentinel',
    country: 'DE',
    avatar: '/player-avatar-blitz.jpg',
    rank: 2,
    rating: 1.19,
    kd: 1.12,
    acs: 231,
    winRate: 71.2,
    hoursPlayed: 8900,
    age: 27,
    earnings: 480000,
    followers: 290000,
    bio: 'The tactical mastermind behind Crimson Wolves. Blitz reads the game three rounds ahead of everyone else.',
    socials: { twitch: 'blitz_igl', x: 'blitzCRW' },
    recentForm: ['W', 'L', 'W', 'W', 'W'],
  },
  {
    id: 'nova',
    handle: 'Nova',
    name: 'Amara Okafor',
    team: 'aether-guard',
    teamTag: 'AEG',
    game: 'rift-legends',
    role: 'Bot Lane / Carry',
    country: 'GB',
    avatar: '/player-avatar-nova.jpg',
    rank: 2,
    rating: 8.2,
    kd: 4.6,
    acs: 0,
    winRate: 70.7,
    hoursPlayed: 6100,
    age: 21,
    earnings: 390000,
    followers: 445000,
    bio: 'A fearless hyper-carry with the highest damage share in the league. Nova hits her power spikes and never looks back.',
    socials: { twitch: 'nova_adc', x: 'novaAEG' },
    recentForm: ['L', 'W', 'W', 'W', 'W'],
  },
  {
    id: 'ghost',
    handle: 'Ghost',
    name: 'Kaito Mori',
    team: 'neon-syndicate',
    teamTag: 'NSY',
    game: 'apex-arena',
    role: 'IGL / Support',
    country: 'JP',
    avatar: '/player-avatar-ghost.jpg',
    rank: 1,
    rating: 4.8,
    kd: 3.2,
    acs: 0,
    winRate: 74.2,
    hoursPlayed: 5400,
    age: 25,
    earnings: 310000,
    followers: 233000,
    bio: 'The calm voice in the storm. Ghost calls the rotations that turn 12th-place drops into championship points.',
    socials: { twitch: 'ghost_br', x: 'ghostNSY' },
    recentForm: ['W', 'W', 'L', 'W', 'W'],
  },
  {
    id: 'axiom',
    handle: 'Axiom',
    name: 'Sofia Ramos',
    team: 'solstice',
    teamTag: 'SOL',
    game: 'nova-strike',
    role: 'Flex / Support',
    country: 'BR',
    avatar: '/player-avatar-axiom.jpg',
    rank: 3,
    rating: 1.24,
    kd: 1.16,
    acs: 244,
    winRate: 64.7,
    hoursPlayed: 4700,
    age: 20,
    earnings: 260000,
    followers: 187000,
    bio: 'A do-it-all flex player whose utility timing bends rounds in Solstice\u2019s favor.',
    socials: { twitch: 'axiom_ns', x: 'axiomSOL' },
    recentForm: ['W', 'W', 'W', 'L', 'L'],
  },
  {
    id: 'talon',
    handle: 'Talon',
    name: 'Owen Pryce',
    team: 'iron-vanguard',
    teamTag: 'IRV',
    game: 'frontline',
    role: 'Anchor',
    country: 'IE',
    avatar: '/player-avatar-talon.jpg',
    rank: 1,
    rating: 1.31,
    kd: 1.27,
    acs: 262,
    winRate: 68.5,
    hoursPlayed: 5200,
    age: 23,
    earnings: 180000,
    followers: 96000,
    bio: 'The immovable anchor of Iron Vanguard. Talon holds sites alone and lives to tell the tale.',
    socials: { twitch: 'talon_fl', x: 'talonIRV' },
    recentForm: ['W', 'L', 'W', 'W', 'L'],
  },
  {
    id: 'echo',
    handle: 'Echo',
    name: 'Yuna Park',
    team: 'riptide',
    teamTag: 'RIP',
    game: 'apex-arena',
    role: 'Fragger',
    country: 'KR',
    avatar: '/player-avatar-echo.jpg',
    rank: 2,
    rating: 4.4,
    kd: 3.0,
    acs: 0,
    winRate: 65.0,
    hoursPlayed: 4100,
    age: 19,
    earnings: 140000,
    followers: 205000,
    bio: 'The youngest star in APAC Apex Arena. Echo\u2019s hot-drop aggression sets the pace for Riptide.',
    socials: { twitch: 'echo_aa', x: 'echoRIP' },
    recentForm: ['W', 'W', 'W', 'W', 'W'],
  },
]

export const playerMap: Record<string, Player> = Object.fromEntries(
  players.map((p) => [p.id, p]),
)

/* Rosters: which players belong to which team (extended beyond the star player) */
export const rosters: Record<string, { handle: string; name: string; role: string; country: string; rating: string; captain?: boolean }[]> = {
  vortex: [
    { handle: 'Razor', name: 'Diego Alvarez', role: 'Duelist / Entry', country: 'US', rating: '1.42', captain: true },
    { handle: 'Cipher', name: 'Noah Kim', role: 'Sentinel', country: 'US', rating: '1.14' },
    { handle: 'Volt', name: 'Eli Turner', role: 'Controller', country: 'CA', rating: '1.09' },
    { handle: 'Mirage', name: 'Adan Haddad', role: 'Initiator', country: 'US', rating: '1.21' },
    { handle: 'Frost', name: 'Leo Brandt', role: 'Flex', country: 'SE', rating: '1.17' },
  ],
  'phantom-nine': [
    { handle: 'Vesper', name: 'Lena Novak', role: 'Mid Lane', country: 'CZ', rating: '8.9', captain: true },
    { handle: 'Rune', name: 'Otto Vala', role: 'Top Lane', country: 'FI', rating: '7.1' },
    { handle: 'Grove', name: 'Milan Horak', role: 'Jungle', country: 'CZ', rating: '7.6' },
    { handle: 'Halo', name: 'Ivan Petrov', role: 'Bot Lane', country: 'BG', rating: '8.0' },
    { handle: 'Vow', name: 'Sara Blom', role: 'Support', country: 'NO', rating: '6.9' },
  ],
  'crimson-wolves': [
    { handle: 'Blitz', name: 'Marcus Feld', role: 'IGL / Sentinel', country: 'DE', rating: '1.19', captain: true },
    { handle: 'Wraith', name: 'Tomas Kral', role: 'Duelist', country: 'SK', rating: '1.28' },
    { handle: 'Onyx', name: 'Pavel Ruz', role: 'Controller', country: 'PL', rating: '1.05' },
    { handle: 'Kite', name: 'Luca Bianchi', role: 'Initiator', country: 'IT', rating: '1.13' },
    { handle: 'Dune', name: 'Sven Aksel', role: 'Flex', country: 'DK', rating: '1.10' },
  ],
}

export type BracketTeam = { id: string; tag: string; seed: number; logo: string } | null

export type Match = {
  id: string
  round: number
  a: BracketTeam
  b: BracketTeam
  scoreA: number | null
  scoreB: number | null
  status: 'completed' | 'live' | 'upcoming'
  time: string
  winner: 'a' | 'b' | null
}

export const bracketRounds = ['Round of 16', 'Quarter Finals', 'Semi Finals', 'Grand Final']

function bt(id: string, seed: number): BracketTeam {
  const t = teamMap[id]
  return { id, tag: t?.tag ?? id.toUpperCase().slice(0, 3), seed, logo: t?.logo ?? '/placeholder.svg' }
}

export const bracketMatches: Match[] = [
  // Round of 16
  { id: 'r16-1', round: 0, a: bt('vortex', 1), b: bt('stormbreak', 16), scoreA: 2, scoreB: 0, status: 'completed', time: 'Sep 1', winner: 'a' },
  { id: 'r16-2', round: 0, a: bt('solstice', 8), b: bt('zenith', 9), scoreA: 2, scoreB: 1, status: 'completed', time: 'Sep 1', winner: 'a' },
  { id: 'r16-3', round: 0, a: bt('crimson-wolves', 4), b: bt('riptide', 13), scoreA: 2, scoreB: 0, status: 'completed', time: 'Sep 2', winner: 'a' },
  { id: 'r16-4', round: 0, a: bt('obsidian', 5), b: bt('volt-dynasty', 12), scoreA: 1, scoreB: 2, status: 'completed', time: 'Sep 2', winner: 'b' },
  { id: 'r16-5', round: 0, a: bt('phantom-nine', 2), b: bt('neon-syndicate', 15), scoreA: 2, scoreB: 1, status: 'completed', time: 'Sep 3', winner: 'a' },
  { id: 'r16-6', round: 0, a: bt('aether-guard', 7), b: bt('iron-vanguard', 10), scoreA: 2, scoreB: 0, status: 'completed', time: 'Sep 3', winner: 'a' },
  { id: 'r16-7', round: 0, a: bt('vortex', 3), b: bt('solstice', 14), scoreA: 2, scoreB: 1, status: 'completed', time: 'Sep 4', winner: 'a' },
  { id: 'r16-8', round: 0, a: bt('crimson-wolves', 6), b: bt('obsidian', 11), scoreA: 2, scoreB: 0, status: 'completed', time: 'Sep 4', winner: 'a' },
  // Quarter Finals
  { id: 'qf-1', round: 1, a: bt('vortex', 1), b: bt('solstice', 8), scoreA: 3, scoreB: 1, status: 'completed', time: 'Sep 7', winner: 'a' },
  { id: 'qf-2', round: 1, a: bt('crimson-wolves', 4), b: bt('volt-dynasty', 12), scoreA: 3, scoreB: 2, status: 'completed', time: 'Sep 7', winner: 'a' },
  { id: 'qf-3', round: 1, a: bt('phantom-nine', 2), b: bt('aether-guard', 7), scoreA: 3, scoreB: 0, status: 'completed', time: 'Sep 8', winner: 'a' },
  { id: 'qf-4', round: 1, a: bt('vortex', 3), b: bt('crimson-wolves', 6), scoreA: 2, scoreB: 1, status: 'live', time: 'Now', winner: null },
  // Semi Finals
  { id: 'sf-1', round: 2, a: bt('vortex', 1), b: bt('crimson-wolves', 4), scoreA: null, scoreB: null, status: 'upcoming', time: 'Sep 11', winner: null },
  { id: 'sf-2', round: 2, a: bt('phantom-nine', 2), b: null, scoreA: null, scoreB: null, status: 'upcoming', time: 'Sep 11', winner: null },
  // Grand Final
  { id: 'gf-1', round: 3, a: null, b: null, scoreA: null, scoreB: null, status: 'upcoming', time: 'Sep 14', winner: null },
]

export type RankingRow = {
  rank: number
  prev: number
  id: string
  name: string
  tag: string
  logo: string
  region: string
  game: GameId
  rating: number
  points: number
  winRate: number
  streak: number
}

export const teamRankings: RankingRow[] = teams
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .map((t, i) => ({
    rank: i + 1,
    prev: i + 1 + (i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0),
    id: t.id,
    name: t.name,
    tag: t.tag,
    logo: t.logo,
    region: t.region,
    game: t.game,
    rating: t.rating,
    points: Math.round(t.rating * 4.2),
    winRate: t.winRate,
    streak: [5, -2, 3, 1, -1, 4, 2, -3, 1, 2, 6, -1][i] ?? 1,
  }))

export const playerRankings = players
  .slice()
  .sort((a, b) => b.followers - a.followers)
  .map((p, i) => ({
    rank: i + 1,
    prev: i + 1 + (i % 2 === 0 ? 1 : -1),
    id: p.id,
    handle: p.handle,
    name: p.name,
    team: p.teamTag,
    avatar: p.avatar,
    game: p.game,
    role: p.role,
    country: p.country,
    rating: p.rating,
    kd: p.kd,
    winRate: p.winRate,
  }))

export type Recruitment = {
  id: string
  type: 'player' | 'team'
  title: string
  game: GameId
  region: string
  role: string
  rank: string
  by: string
  avatar: string
  posted: string
  tags: string[]
  description: string
}

export const recruitments: Recruitment[] = [
  {
    id: 'r1',
    type: 'team',
    title: 'Rift Legends contender seeking Jungle main',
    game: 'rift-legends',
    region: 'EU',
    role: 'Jungle',
    rank: 'Master+',
    by: 'Nightfall Academy',
    avatar: '/team-logo-nightfall.jpg',
    posted: '2h ago',
    tags: ['Salaried', 'Full-time', 'Bootcamp provided'],
    description:
      'Rising academy roster looking for a mechanically gifted jungler to complete our starting five for the promotion split. Scrims 5 days a week.',
  },
  {
    id: 'r2',
    type: 'player',
    title: 'Duelist main LFT — ex-Challengers finalist',
    game: 'nova-strike',
    region: 'NA',
    role: 'Duelist',
    rank: 'Radiant',
    by: 'SpectreX',
    avatar: '/player-avatar-spectre.jpg',
    posted: '5h ago',
    tags: ['Free agent', 'Willing to relocate', 'FPP coach'],
    description:
      'Former Challengers finalist entry fragger available immediately. Looking for an organized roster with pro ambitions and a structured practice schedule.',
  },
  {
    id: 'r3',
    type: 'team',
    title: 'Apex Arena trio needs a third (IGL preferred)',
    game: 'apex-arena',
    region: 'APAC',
    role: 'IGL',
    rank: 'Predator',
    by: 'Tidal Force',
    avatar: '/team-logo-tidal.jpg',
    posted: '1d ago',
    tags: ['Revenue split', 'Tournament active'],
    description:
      'Two Predator-ranked players seeking a shot-caller for the upcoming Arena Circuit. Consistent point placement and clean comms required.',
  },
  {
    id: 'r4',
    type: 'player',
    title: 'Support main LFT — 6k hours, EU servers',
    game: 'rift-legends',
    region: 'EU',
    role: 'Support',
    rank: 'Grandmaster',
    by: 'Lumen',
    avatar: '/player-avatar-lumen.jpg',
    posted: '1d ago',
    tags: ['Free agent', 'VOD review', 'Flexible hours'],
    description:
      'Vision-focused support with deep champion pool. Looking to join a semi-pro or academy team pushing for the next split.',
  },
  {
    id: 'r5',
    type: 'team',
    title: 'Frontline org building EU academy roster',
    game: 'frontline',
    region: 'EU',
    role: 'Flex',
    rank: 'Diamond+',
    by: 'Helix Org',
    avatar: '/team-logo-helix.jpg',
    posted: '2d ago',
    tags: ['Salaried', 'Content required', 'Gaming house'],
    description:
      'Established org opening tryouts for a fresh academy squad. We provide a gaming house, coaching staff, and a direct promotion pathway to the main team.',
  },
  {
    id: 'r6',
    type: 'player',
    title: 'IGL / Sentinel available — 4 years pro exp',
    game: 'nova-strike',
    region: 'EU',
    role: 'IGL',
    rank: 'Immortal',
    by: 'Cardinal',
    avatar: '/player-avatar-cardinal.jpg',
    posted: '3d ago',
    tags: ['Free agent', 'Veteran', 'Analyst-minded'],
    description:
      'Experienced in-game leader with four years at Tier 2/3. Strong at building structured defaults and developing young talent.',
  },
]

export type NotificationType = 'match' | 'team' | 'tournament' | 'system' | 'social'

export type AppNotification = {
  id: string
  type: NotificationType
  title: string
  body: string
  time: string
  unread: boolean
}

export const notifications: AppNotification[] = [
  { id: 'n1', type: 'match', title: 'Match starting soon', body: 'Vortex Gaming vs Crimson Wolves — Quarter Finals kicks off in 15 minutes.', time: '15m', unread: true },
  { id: 'n2', type: 'tournament', title: 'Bracket updated', body: 'The Nova Masters: Ignite semi-final bracket has been finalized.', time: '1h', unread: true },
  { id: 'n3', type: 'team', title: 'Roster invite', body: 'Iron Vanguard invited you to trial for their academy roster.', time: '3h', unread: true },
  { id: 'n4', type: 'social', title: 'New follower', body: 'Razor and 1,204 others started following your profile.', time: '6h', unread: false },
  { id: 'n5', type: 'system', title: 'Account verified', body: 'Your competitor profile has been verified. You can now register for S-tier events.', time: '1d', unread: false },
  { id: 'n6', type: 'tournament', title: 'Registration confirmed', body: 'You are registered for the Frontline Clash Series. Check-in opens Oct 4.', time: '2d', unread: false },
  { id: 'n7', type: 'match', title: 'Result posted', body: 'Phantom Nine defeated Aether Guard 3-0 in the semi-finals.', time: '2d', unread: false },
]

export function formatMoney(n: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatCompact(n: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

export const statusMeta: Record<TournamentStatus, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-live/15 text-live border-live/30' },
  upcoming: { label: 'Upcoming', className: 'bg-primary/15 text-primary border-primary/30' },
  registration: { label: 'Registration Open', className: 'bg-gold/15 text-gold border-gold/30' },
  completed: { label: 'Completed', className: 'bg-muted text-muted-foreground border-border' },
}
