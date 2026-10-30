import { useEffect, useMemo, useState } from 'react'
import { stories, type Story } from './stories'

type View = { name: 'home' } | { name: 'saved' } | { name: 'article'; story: Story }

const categories = ['All', 'City', 'Crime', 'Science', 'Opinion'] as const

function Icon({
  name,
  filled = false,
}: {
  name: 'search' | 'bookmark' | 'sun' | 'moon' | 'arrow' | 'menu' | 'close'
  filled?: boolean
}) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.7L6 21V4.8Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />,
    arrow: <><path d="M19 12H5M11 18l-6-6 6-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function SaveButton({
  id,
  saved,
  toggle,
  compact = false,
}: {
  id: number
  saved: boolean
  toggle: (id: number) => void
  compact?: boolean
}) {
  return (
    <button
      className={`save-button ${compact ? 'save-button--compact' : ''} ${saved ? 'is-saved' : ''}`}
      onClick={(event) => {
        event.stopPropagation()
        toggle(id)
      }}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved stories' : 'Save for later'}
    >
      <Icon name="bookmark" filled={saved} />
      {!compact && <span>{saved ? 'Saved' : 'Save for later'}</span>}
    </button>
  )
}

function StoryCard({
  story,
  saved,
  onOpen,
  onSave,
}: {
  story: Story
  saved: boolean
  onOpen: (story: Story) => void
  onSave: (id: number) => void
}) {
  return (
    <article className="story-card" onClick={() => onOpen(story)}>
      <div className="story-card__image-wrap">
        <img className="story-card__image" src={story.image} alt={story.imageAlt} />
        <SaveButton id={story.id} saved={saved} toggle={onSave} compact />
      </div>
      <div className="story-card__content">
        <div className="story-meta">
          <span>{story.category}</span>
          <span>{story.date}</span>
        </div>
        <h3>{story.title}</h3>
        <p>{story.dek}</p>
        <span className="read-link">Read story <span aria-hidden="true">→</span></span>
      </div>
    </article>
  )
}

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' })
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [saved, setSaved] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bugle-saved') || '[]')
    } catch {
      return []
    }
  })
  const [dark, setDark] = useState(() => localStorage.getItem('bugle-theme') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('bugle-saved', JSON.stringify(saved))
  }, [saved])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('bugle-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return stories.slice(1).filter(
      (story) =>
        (category === 'All' || story.category === category) &&
        (!term ||
          story.title.toLowerCase().includes(term) ||
          story.dek.toLowerCase().includes(term) ||
          story.category.toLowerCase().includes(term)),
    )
  }, [query, category])

  const savedStories = stories.filter((story) => saved.includes(story.id))

  const changeView = (next: View) => {
    setView(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleSaved = (id: number) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((storyId) => storyId !== id) : [...current, id],
    )
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-bar__inner">
            <span>Wednesday, June 18, 2025</span>
            <span>Queens, New York · 72°F</span>
          </div>
        </div>
        <div className="container masthead">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
          <button className="brand" onClick={() => changeView({ name: 'home' })}>
            <span className="brand__webmark" aria-hidden="true">Q</span>
            <span className="brand__type">
              <span className="brand__daily">The Daily</span>
              <span className="brand__bugle">Bugle</span>
            </span>
          </button>
          <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Main navigation">
            <button className={view.name === 'home' ? 'active' : ''} onClick={() => changeView({ name: 'home' })}>
              Latest
            </button>
            <button className={view.name === 'saved' ? 'active' : ''} onClick={() => changeView({ name: 'saved' })}>
              Saved <span className="saved-count">{saved.length}</span>
            </button>
          </nav>
          <button className="theme-button" onClick={() => setDark(!dark)} aria-label={`Use ${dark ? 'light' : 'dark'} mode`}>
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
        </div>
      </header>

      <main>
        {view.name === 'home' && (
          <>
            <section className="container hero">
              <div className="hero__image-wrap">
                <img className="hero__image" src={stories[0].image} alt={stories[0].imageAlt} />
                <span className="breaking-label">Breaking news</span>
              </div>
              <div className="hero__content">
                <span className="borough-edition">Queens edition · Friendly neighborhood news</span>
                <div className="story-meta">
                  <span>{stories[0].category}</span>
                  <span>{stories[0].date}</span>
                </div>
                <h1>{stories[0].title}</h1>
                <p>{stories[0].dek}</p>
                <div className="hero__actions">
                  <button className="primary-button" onClick={() => changeView({ name: 'article', story: stories[0] })}>
                    Read full story <span aria-hidden="true">→</span>
                  </button>
                  <SaveButton id={stories[0].id} saved={saved.includes(stories[0].id)} toggle={toggleSaved} />
                </div>
              </div>
            </section>

            <section className="container latest-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Queens newsroom</span>
                  <h2>Latest stories</h2>
                </div>
                <span className="result-count">{filtered.length} stories</span>
              </div>
              <div className="controls">
                <label className="search-box">
                  <Icon name="search" />
                  <span className="sr-only">Search stories</span>
                  <input
                    type="search"
                    placeholder="Search your neighborhood news"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <div className="category-list" aria-label="Filter by category">
                  {categories.map((item) => (
                    <button
                      key={item}
                      className={category === item ? 'active' : ''}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              {filtered.length ? (
                <div className="story-grid">
                  {filtered.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      saved={saved.includes(story.id)}
                      onOpen={(item) => changeView({ name: 'article', story: item })}
                      onSave={toggleSaved}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state__mark">DB</span>
                  <h3>No stories found</h3>
                  <p>Try another search or browse all categories.</p>
                  <button onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button>
                </div>
              )}
            </section>
          </>
        )}

        {view.name === 'article' && (
          <article className="article-page">
            <div className="container article-page__top">
              <button className="back-button" onClick={() => changeView({ name: 'home' })}>
                <Icon name="arrow" /> Back to latest
              </button>
              <div className="article-header">
                <div className="story-meta">
                  <span>{view.story.category}</span>
                  <span>{view.story.date}</span>
                  <span>{view.story.readTime}</span>
                </div>
                <h1>{view.story.title}</h1>
                <p className="article-dek">{view.story.dek}</p>
                <div className="byline">
                  <div className="byline__avatar">BL</div>
                  <div><strong>By Betty Brant</strong><span>Senior Staff Reporter</span></div>
                  <SaveButton id={view.story.id} saved={saved.includes(view.story.id)} toggle={toggleSaved} />
                </div>
              </div>
            </div>
            <figure className="article-figure">
              <img src={view.story.image} alt={view.story.imageAlt} />
              <figcaption className="container">{view.story.imageAlt}. Photo by {view.story.photographer}.</figcaption>
            </figure>
            <div className="container article-body">
              <aside><span>Daily Bugle</span><strong>Independent. Fearless. New York.</strong></aside>
              <div className="article-copy">
                {view.story.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <div className="article-end">DB</div>
              </div>
            </div>
          </article>
        )}

        {view.name === 'saved' && (
          <section className="container saved-page">
            <div className="page-heading">
              <span className="eyebrow">Your reading list</span>
              <h1>Saved stories</h1>
              <p>Stories you’ve bookmarked for later, kept right here on this device.</p>
            </div>
            {savedStories.length ? (
              <div className="story-grid">
                {savedStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    saved
                    onOpen={(item) => changeView({ name: 'article', story: item })}
                    onSave={toggleSaved}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state empty-state--saved">
                <span className="empty-state__mark"><Icon name="bookmark" /></span>
                <h3>Your reading list is empty</h3>
                <p>Save the stories that catch your eye and find them here anytime.</p>
                <button onClick={() => changeView({ name: 'home' })}>Browse latest stories</button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand"><span>The Daily</span> Bugle</div>
          <p>Your friendly neighborhood news source from Queens.</p>
          <span>© 2025 Daily Bugle</span>
        </div>
      </footer>
    </div>
  )
}
