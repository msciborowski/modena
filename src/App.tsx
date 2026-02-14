import { Contact } from './components/Contact.tsx'
import { Details } from './components/Details.tsx'
import { Features } from './components/Features.tsx'
import { Footer } from './components/Footer.tsx'
import { Gallery } from './components/Gallery.tsx'
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { LocationSection } from './components/LocationSection.tsx'
import { Main } from './components/Main.tsx'
import { SkipLink } from './components/SkipLink.tsx'
import { Story } from './components/Story.tsx'

const App = () => (
  <>
    <SkipLink href="#main-content">Przejdź do treści</SkipLink>
    <Header />
    <Main id="main-content">
      <Hero />
      <Gallery />
      <Story />
      <Details />
      <Features />
      <LocationSection />
      <Contact />
    </Main>
    <Footer />
  </>
)

export { App }
