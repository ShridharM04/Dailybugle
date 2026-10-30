export type Story = {
  id: number
  title: string
  category: 'City' | 'Crime' | 'Science' | 'Opinion'
  date: string
  readTime: string
  image: string
  imageAlt: string
  photographer: string
  dek: string
  body: string[]
}

export const stories: Story[] = [
  {
    id: 1,
    title: 'Spider-Man Saves Queensboro Traffic in Daring Daylight Rescue',
    category: 'Crime',
    date: 'June 18, 2025',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'The New York skyline and bridge seen across the East River',
    photographer: 'Patrick Tomasso',
    dek: 'Your friendly neighborhood Spider-Man brought traffic to a standstill—and three suspects to the pavement—after a high-speed chase toward Queens.',
    body: [
      'LONG ISLAND CITY — What began as an ordinary Wednesday commute became a spectacle worthy of the silver screen when Spider-Man intercepted an armored van speeding toward the Queensboro Bridge.',
      'Witnesses say the masked figure appeared between the towers just after 11 a.m., swinging low above traffic before landing on the roof of the vehicle. Within moments, the van was suspended in a lattice of webbing near the bridge approach.',
      '“I heard tires, then everyone started pointing up,” said Maria Chen, who watched from a coffee shop on Queens Plaza. “He moved so quickly. Then he stopped to make sure the driver of a taxi was okay.”',
      'Police confirmed that three suspects were taken into custody and that stolen technology was recovered from the vehicle. No serious injuries were reported, though the incident caused delays from Midtown to Long Island City.',
      'The latest intervention has reignited debate at City Hall over Spider-Man’s role in public safety. For the Queens commuters he helped, however, the verdict appeared far less complicated.',
    ],
  },
  {
    id: 2,
    title: 'Who Watches the Web-Slinger?',
    category: 'Opinion',
    date: 'June 17, 2025',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1730033560698-2d5b00407906?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A black and white view of a Manhattan high-rise',
    photographer: 'Nathanaël Desmeules',
    dek: 'New Yorkers deserve heroes. They also deserve answers about who is accountable when heroics go wrong.',
    body: [
      'Spider-Man has become a fixture of our skyline, as familiar to many New Yorkers as water towers and yellow cabs. Familiarity, however, should not be mistaken for accountability.',
      'For every commuter pulled from danger, there is a street closed without warning. For every captured criminal, there is a question about evidence, due process and who pays for the shattered glass.',
      'This is not an argument against courage. It is an argument for transparency. A city of eight million cannot outsource its public safety policy to an anonymous young man in a mask.',
    ],
  },
  {
    id: 3,
    title: 'Queens Neighbors Rally After Apartment Fire',
    category: 'City',
    date: 'June 16, 2025',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1665399319700-90b454c69d1e?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'People walking along a busy New York street',
    photographer: 'Diane Picchiottino',
    dek: 'A block shaken by fire found strength in each other—and help from an unexpected visitor.',
    body: [
      'QUEENS — By sunrise, folding tables lined the sidewalk outside St. Anne’s, crowded with donated coats, meals and phone chargers for families displaced by Tuesday night’s apartment fire.',
      'Residents described seeing Spider-Man help firefighters clear the upper floors before disappearing over the rooftops. The FDNY has not commented on his involvement.',
      'The greater story, residents insist, is what happened afterward. “This block takes care of its own,” organizer Malik Ford said. “That is what New York does.”',
    ],
  },
  {
    id: 4,
    title: 'Oscorp Unveils Clean Energy Initiative',
    category: 'Science',
    date: 'June 15, 2025',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1772004709117-ff16a196ef5b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A modern glass structure surrounded by city buildings',
    photographer: 'Johannes Hübner',
    dek: 'The corporation promises a revolution in urban power, but independent researchers remain cautious.',
    body: [
      'Oscorp Industries unveiled a compact energy cell on Monday that executives claim could power an entire city block without direct emissions.',
      'Chief researchers called the presentation an important milestone, but declined to provide full technical data ahead of peer review. The company expects a limited Queens pilot later this year.',
      'Energy policy experts welcomed the investment while urging patience. Transformative claims, they noted, require equally extraordinary evidence.',
    ],
  },
  {
    id: 5,
    title: 'Mysterious Webs Appear Across Lower Manhattan',
    category: 'Crime',
    date: 'June 14, 2025',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1664353655040-301f17a909a4?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Tall buildings framing a narrow city street',
    photographer: 'Diane Picchiottino',
    dek: 'A trail of unusual webbing has detectives—and curious tourists—looking up.',
    body: [
      'LOWER MANHATTAN — Police cordoned off three alleys early Saturday after residents reported unusually dense strands of webbing stretched between fire escapes.',
      'The material resembles Spider-Man’s signature webs, but sources close to the investigation say its composition differs from samples previously recovered.',
      'Authorities asked the public not to touch the substance while laboratory analysis continues.',
    ],
  },
  {
    id: 6,
    title: 'The Hidden Cost of a Safer City',
    category: 'Opinion',
    date: 'June 13, 2025',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1552158300-22b14daea1b1?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'An aerial view of dense New York high-rises',
    photographer: 'Sander Crombach',
    dek: 'Heroic interventions make headlines. The people rebuilding after them rarely do.',
    body: [
      'The footage usually ends when the danger does: the villain restrained, the crowd cheering and Spider-Man already a red-and-blue blur above the avenue.',
      'For shop owners and residents, that is when another story begins. Windows must be replaced, sidewalks cleared and insurance claims filed.',
      'Admiration and accountability can coexist. New York should create a rapid relief fund for residents caught in the collateral damage of super-powered conflict.',
    ],
  },
  {
    id: 7,
    title: 'Inside the Lab Studying Superhuman Strength',
    category: 'Science',
    date: 'June 12, 2025',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1692756227212-554860533282?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'The geometric facade of a Manhattan office tower',
    photographer: 'Rafael Hoyos Weht',
    dek: 'Empire State University researchers are asking what extraordinary biology can teach ordinary medicine.',
    body: [
      'Behind two secured doors at Empire State University, a team of biologists is studying how human tissue might safely repair itself at unprecedented speed.',
      'The work is not based on Spider-Man, researchers insist. Yet his documented feats have changed what funders and scientists consider possible.',
      'Potential applications range from traumatic injury treatment to degenerative disease. Any clinical use, the team cautions, remains years away.',
    ],
  },
  {
    id: 8,
    title: 'A Night Shift Beneath the City Lights',
    category: 'City',
    date: 'June 11, 2025',
    readTime: '3 min read',
    image:
      'https://images.unsplash.com/photo-1634482896419-ea3783408381?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Traffic moving through a busy Manhattan street',
    photographer: 'Nick Night',
    dek: 'Meet the New Yorkers who keep the city moving while heroes command the skyline.',
    body: [
      'At 2 a.m., the city belongs to a different New York: bakers, nurses, transit crews and cab drivers carrying the morning on their shoulders.',
      'They have Spider-Man stories, of course. Everyone working after midnight seems to. But they are less interested in spectacle than in getting home safely.',
      'This is a portrait of the people under the skyline—the ordinary workers performing quiet heroics every night.',
    ],
  },
  {
    id: 9,
    title: 'City Council Debates Vigilante Damage Fund',
    category: 'City',
    date: 'June 10, 2025',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1715110237796-f8933df1d991?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A sunlit avenue between New York skyscrapers',
    photographer: 'Joe',
    dek: 'A new proposal would compensate small businesses caught in the wake of super-powered clashes.',
    body: [
      'CITY HALL — A proposed emergency fund for small businesses affected by super-powered incidents drew a packed public hearing on Tuesday.',
      'Supporters say existing insurance systems are too slow and frequently exclude extraordinary damage. Critics question how the city would define a qualifying event.',
      'A revised proposal is expected before the council next month.',
    ],
  },
]
