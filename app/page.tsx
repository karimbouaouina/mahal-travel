"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { DottedMap } from "@/components/dotted-map";
import { HeroLottie } from "@/components/hero-lottie";
import { HotelGallery, type GalleryItem } from "@/components/hotel-gallery";
import { LogoMarquee } from "@/components/logo-marquee";
import { Steps } from "@/components/steps";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

const hotelImagePool = {
  mouradi: "/images/hotels/ChaineMouradi1200x675.png",
  iberostar: "/images/hotels/iberostar1200x675.jpg",
  concorde: "/images/hotels/concorde1200x675.jpg",
  marhaba: "/images/hotels/ChaineMarhaba1200x675.png",
  bellevue: "/images/hotels/BelleVue1200x675.png",
} as const;

type GalleryCollection = {
  key: string;
  title: string;
  heading: string;
  description: string;
  items: GalleryItem[];
};

const galleryCollections: GalleryCollection[] = [
  {
    key: "sousse",
    title: "Sousse",
    heading: "Exemples d'hotels a Sousse",
    description: "Une selection locale solide pour les sejours premium, les groupes et les formats seminaires.",
    items: [
      {
        src: hotelImagePool.iberostar,
        title: "Iberostar Diar El Andalous",
        location: "Sousse",
      },
      {
        src: hotelImagePool.concorde,
        title: "Concorde Green Park Palace",
        location: "Sousse",
      },
      {
        src: hotelImagePool.marhaba,
        title: "Chaine Marhaba",
        location: "Sousse",
      },
      {
        src: hotelImagePool.bellevue,
        title: "Bellevue Park",
        location: "Sousse",
      },
      {
        src: hotelImagePool.mouradi,
        title: "Chaine Mouradi",
        location: "Sousse",
      },
      {
        src: hotelImagePool.marhaba,
        title: "Tej Marhaba",
        location: "Sousse",
      },
    ],
  },
  {
    key: "monastir",
    title: "Monastir",
    heading: "Exemples d'hotels a Monastir",
    description: "Des apercus de reference pour visualiser le type d'options que nous pouvons cadrer sur Monastir.",
      items: [
        {
          src: "/images/hotels/royalThalassaMonastir1200x675.jpg",
          title: "Royal Thalassa Monastir",
          location: "Monastir",
        },
        {
          src: "/images/hotels/iberostarKuriatPalace1200x675.png",
          title: "Iberostar Selection Kuriat Palace",
          location: "Monastir",
        },
        {
          src: "/images/hotels/hotelTropicanaMonastir1200x675.jpg",
          title: "Hotel Tropicana Monastir",
          location: "Monastir",
        },
        {
          src: "/images/hotels/skanesSerail1200x675.png",
          title: "Skanes Serail",
          location: "Monastir",
        },
        {
          src: "/images/hotels/AmirPalace1200x675.jpg",
          title: "Amir Palace",
          location: "Monastir",
        },
        {
          src: "/images/hotels/hiltonSkanesMonastir1200x675.jpg",
          title: "Hilton Skanes Monastir Beach Resort",
          location: "Monastir",
        },
      ],
  },
  {
    key: "hammamet",
    title: "Hammamet",
    heading: "Exemples d'hotels a Hammamet",
    description: "Une lecture rapide des formats resort, week-end et sejours plus detente sur Hammamet.",
    items: [
      {
        src: "/images/hotels/HasdrubalHammamet1200x675.png",
        title: "Hasdrubal Thalassa & Spa Yasmine Hammamet",
        location: "Hammamet",
      },
      {
        src: "/images/hotels/Mehari1200x675.png",
        title: "Hotel Mehari Hammamet",
        location: "Hammamet",
      },
      {
        src: "/images/hotels/TheOrangers1200x675.png",
        title: "The Orangers Garden Villas & Bungalows",
        location: "Hammamet",
      },
      {
        src: "/images/hotels/RoyalTulipTajSoltan1200x675.jpg",
        title: "Royal Tulip Taj Sultan",
        location: "Hammamet",
      },
      {
        src: "/images/hotels/SteigenbergerHammamet1200x675.jpg",
        title: "Steigenberger Marhaba Thalasso Hammamet",
        location: "Hammamet",
      },
      {
        src: "/images/hotels/laBadira1200x675.jpg",
        title: "La Badira",
        location: "Hammamet",
      },
    ],
  },
  {
    key: "djerba",
    title: "Djerba",
    heading: "Exemples d'hotels a Djerba",
    description: "Des exemples resort et balneaires pour projeter des formats loisirs, all inclusive ou groupes.",
    items: [
      {
        src: "/images/hotels/IberostarSelectionDjerba1200x675.png",
        title: "Iberostar Selection Eolia Djerba",
        location: "Djerba",
      },
      {
        src: "/images/hotels/HasdrubalDjerba1200x675.png",
        title: "Hasdrubal Prestige Thalassa & Spa Djerba",
        location: "Djerba",
      },
      {
        src: "/images/hotels/RadissonBluDjerba1200x675.png",
        title: "Radisson Blu Palace Resort & Thalasso, Djerba",
        location: "Djerba",
      },
      {
        src: "/images/hotels/RoyalGardenPalaceDjerba1200x675.png",
        title: "Royal Garden Palace",
        location: "Djerba",
      },
      {
        src: "/images/hotels/PalmBeachDjerba1200x675.png",
        title: "Palm Beach Palace Djerba",
        location: "Djerba",
      },
      {
        src: "/images/hotels/PlazaDjerba1200x675.png",
        title: "Djerba Plaza Thalasso & Spa",
        location: "Djerba",
      },
    ],
  },
  {
    key: "tabarka",
    title: "Tabarka",
    heading: "Exemples d'hotels a Tabarka",
    description: "Des exemples plus calmes et plus nature pour illustrer un autre ton de sejour en Tunisie.",
    items: [
      {
        src: "/images/hotels/LaCigaleTabarka1200x675.png",
        title: "La Cigale Tabarka Hotel Thalasso Golf",
        location: "Tabarka",
      },
      {
        src: "/images/hotels/GoldenMehariTabarka1200x675.png",
        title: "Golden Yasmine Mehari Tabarka",
        location: "Tabarka",
      },
      {
        src: "/images/hotels/ItropikaTabarka1200x675.png",
        title: "Itropika Hotel",
        location: "Tabarka",
      },
      {
        src: "/images/hotels/DarIsmailTabarka1200x675.png",
        title: "Dar Ismail Tabarka",
        location: "Tabarka",
      },
      {
        src: "/images/hotels/ThabracaTabarka1200x675.png",
        title: "Thabraca Thalasso & Diving",
        location: "Tabarka",
      },
    ],
  },
];

const testimonials = [
  {
    name: "Sana",
    location: "Hammamet",
    avatar: "/icons/icons8-user-female-dark-48.png",
    rating: 5,
    content:
      "Reponse rapide et options claires. Hotel parfait pour notre week-end. On recommande sans hesitation.",
  },
  {
    name: "Mehdi",
    location: "Sousse",
    avatar: "/icons/icons8-user-male-dark-48.png",
    rating: 4,
    content:
      "Tres pro. Plusieurs choix concrets, sans detours inutiles. Reservation confirmee rapidement et sans friction.",
  },
  {
    name: "Ines",
    location: "Monastir",
    avatar: "/icons/icons8-user-female-dark-48.png",
    rating: 5,
    content:
      "Bon suivi jusqu'a l'arrivee. Tout etait simple, transparent et bien cadence du premier message a l'arrivee.",
  },
  {
    name: "Youssef",
    location: "Sousse",
    avatar: "/icons/icons8-user-male-dark-48.png",
    rating: 5,
    content:
      "Pour notre seminaire, l'equipe a gere l'hebergement, les salles et le rythme du sejour avec un vrai sens du detail.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      name: "Opale Noire",
      url: "https://opalenoiretravel.vercel.app",
      logo: "https://opalenoiretravel.vercel.app/images/whiteOutlineLogoWithoutText.png",
      image: "https://opalenoiretravel.vercel.app/images/ONWINDOW.png",
      telephone: "+21698503197",
      email: "contact@opalenoire.tn",
      areaServed: ["Tunisie", "Sousse", "Monastir", "Hammamet", "Djerba", "Tabarka"],
      description:
        "Reservation d'hotels, groupes et seminaires en Tunisie avec un accompagnement clair sur plusieurs destinations.",
    },
    {
      "@type": "WebSite",
      name: "Opale Noire",
      url: "https://opalenoiretravel.vercel.app",
      inLanguage: "fr",
    },
  ],
};

const destinationCards = [
  {
    title: "Sousse",
    subtitle: "Base principale",
    text: "Une selection locale solide pour les sejours premium, les groupes et les formats seminaires.",
  },
  {
    title: "Monastir",
    subtitle: "Cote et sejours loisirs",
    text: "Des options utiles pour les demandes plage, all inclusive ou groupes en mouvement.",
  },
  {
    title: "Hammamet",
    subtitle: "Resorts et weekends",
    text: "Une bonne destination quand il faut garder une touche resort et une logistique simple.",
  },
  {
    title: "Djerba",
    subtitle: "Ile, resort et sejours balneaires",
    text: "Une destination utile pour les demandes soleil, detente, all inclusive et formats loisirs plus immersifs.",
  },
  {
    title: "Tabarka",
    subtitle: "Nature, calme et sejours singuliers",
    text: "Une option interessante pour des demandes plus calmes, plus vertes ou des sejours avec un decor different.",
  },
  {
    title: "Seminaires",
    subtitle: "Salle, hebergement, cadence",
    text: "Pour un format equipe ou business, nous cadrons le sejour dans son ensemble et pas seulement les chambres.",
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const whatsappUrl =
    "https://wa.me/21698503197?text=" +
    encodeURIComponent(
      "Bonjour Opale Noire, je souhaite reserver un hotel ou organiser un seminaire. Voici mon besoin :"
    );

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const timer = window.setTimeout(() => setShowSplash(false), 0);
      return () => window.clearTimeout(timer);
    }

    const leaveTimer = window.setTimeout(() => setSplashLeaving(true), 1050);
    const hideTimer = window.setTimeout(() => setShowSplash(false), 1625);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeGallery = galleryCollections[galleryIndex];

  const cycleGallery = (dir: -1 | 1) => {
    setGalleryIndex((current) => (current + dir + galleryCollections.length) % galleryCollections.length);
  };

  return (
    <div className="flex flex-1 flex-col">
      {showSplash ? (
        <div className={`splash${splashLeaving ? " is-leaving" : ""}`} aria-hidden="true">
          <Image
            className="splash__logo"
            src="/images/WhiteOutlineTransparentBackground.png"
            alt="Opale Noire"
            width={560}
            height={560}
            priority
          />
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="container-x flex h-[68px] items-center justify-between gap-4 py-2">
          <a href="#" className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl">
              <Image
                src="/images/whiteOutlineLogoWithoutText.png"
                alt="Opale Noire"
                width={44}
                height={44}
                priority
              />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">Opale Noire</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/76 md:flex">
            <a className="transition hover:text-white" href="#hotels">
              Hotels
            </a>
            <a className="transition hover:text-white" href="#process">
              Comment ca marche
            </a>
            <a className="transition hover:text-white" href="#partners">
              Partenaires
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <a
            className="inline-flex h-11 items-center justify-center rounded-full bg-green-500 px-5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-green-400"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="grain">
          <div className="container-x py-18 md:py-28">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="reveal attention-pill">Reservations hotels et seminaires en Tunisie</div>

                <h1 className="reveal mt-6 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
                  Ton hotel ou ton seminaire en Tunisie, organise avec une approche plus nette.
                </h1>

                <p className="reveal mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
                  Nous gerons les reservations hotels, les besoins groupes et les formats seminaires sur plusieurs
                  destinations en Tunisie. Tu partages les dates, le budget et le cadre du besoin, nous revenons avec
                  des options claires, activables et bien presentees.
                </p>

                <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-green-500 px-6 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-green-400"
                    href="#contact"
                  >
                    Demander une option
                  </a>
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.03] px-6 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/[0.06]"
                    href="#hotels"
                  >
                    Voir la selection
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <HeroLottie className="reveal" />
              </div>
            </div>
          </div>
        </section>

        <section id="hotels" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Hotels et lieux</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Des destinations utiles pour les sejours, les groupes et les seminaires en Tunisie.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62">
              Les visuels ci-dessous utilisent les vraies photos deja presentes dans le projet, pour garder la page
              plus credible et plus precise.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="reveal card ring-glow overflow-hidden rounded-[2rem] p-6 lg:col-span-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Carte</div>
                  <div className="mt-1 text-xs text-white/52">Focus Tunisie</div>
                </div>
                <div className="text-xs text-white/42">Sousse • Monastir • Hammamet • Djerba • Tabarka</div>
              </div>

              <div className="mt-6 aspect-[2/1] w-full">
                <DottedMap
                  width={150}
                  height={75}
                  mapSamples={6500}
                  dotRadius={0.23}
                  dotColor="rgba(255,255,255,0.28)"
                  markerColor="rgba(255,255,255,0.92)"
                  pulse
                  markers={[{ lat: 34.0, lng: 9.0, size: 0.62, pulse: true }]}
                  renderMarkerOverlay={({ x, y }) => (
                    <g>
                      <text
                        x={x + 1.8}
                        y={y - 1.4}
                        fontSize={3.2}
                        fill="rgba(255,255,255,0.92)"
                        fontFamily="system-ui"
                      >
                        Tunisie
                      </text>
                    </g>
                  )}
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {destinationCards.map((item) => (
                  <div
                    key={item.title}
                    className="reveal hover-panel rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                  >
                    <div className="text-sm font-semibold text-white/72">{item.title}</div>
                    <div className="mt-2 text-xl font-semibold tracking-tight text-white">{item.subtitle}</div>
                    <div className="mt-3 text-sm leading-6 text-white/60">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal mx-auto mt-6 max-w-5xl rounded-[2rem] border border-white/10 bg-black/22 p-6 md:p-7">
            <div className="mx-auto max-w-3xl text-center">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 md:gap-12">
                <button
                  type="button"
                  onClick={() => cycleGallery(-1)}
                  aria-label="Afficher la destination precedente"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/88 transition hover:bg-white/[0.08]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">{activeGallery.heading}</div>
                  <div className="mt-2 text-sm leading-6 text-white/58">{activeGallery.description}</div>
                </div>
                <button
                  type="button"
                  onClick={() => cycleGallery(1)}
                  aria-label="Afficher la destination suivante"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/88 transition hover:bg-white/[0.08]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <HotelGallery className="mt-6" items={activeGallery.items} collectionLabel={activeGallery.title} />
          </div>
        </section>

        <section id="process" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Comment ca marche</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Trois etapes, un seul parcours, une lecture bien plus fluide.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62">
              Tout reste centre et facile a suivre, sans blocs secondaires qui cassent le rythme.
            </p>
          </div>

          <Steps
            className="reveal mt-8"
            steps={[
              {
                title: "Tu envoies le brief",
                description:
                  "Dates, ville, nombre de personnes, budget et, si besoin, le format du seminaire ou les attentes du groupe.",
              },
              {
                title: "On te propose des options",
                description:
                  "On verifie les disponibilites et on t'envoie des choix concrets: hotel, pension, salle, rythme, prix et conditions.",
              },
              {
                title: "Validation et confirmation",
                description:
                  "Tu choisis l'option la plus adaptee, puis on confirme la reservation et on partage les details utiles.",
              },
            ]}
          />
        </section>

        <section id="avis" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto mb-8 max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Avis clients</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Un retour clair, centre, sans rien autour qui parasite la lecture.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62">
              La section reste volontairement simple: un grand temoignage, bien cadre, adapte a l&apos;ecran.
            </p>
          </div>

          <TestimonialsCarousel className="reveal" testimonials={testimonials} />
        </section>

        <section id="partners" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Partenaires</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Nous avons pour le moment deux partenaires actifs.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62">
              Une presentation plus simple, plus nette et plus credible avec les vrais logos.
            </p>
          </div>

          <LogoMarquee
            className="reveal mt-8"
            items={[
              {
                alt: "Tunisiabeds",
                src: "/images/tunisiabeds-transparent.png",
                href: "https://www.tunisiabeds.tn/",
              },
              {
                alt: "Happywayclic",
                src: "/images/happywayclic-transparent.png",
                href: "https://www.happywayclic.com/",
              },
            ]}
          />
        </section>

        <section id="contact" className="container-x py-16 md:py-24">
          <div className="reveal card ring-glow overflow-hidden rounded-[2.2rem] p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-white/38">Contact</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Dis-moi quel hotel ou quel seminaire tu veux organiser.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/66">
                  Envoie les dates, la ville, le nombre de personnes, le budget et le cadre du besoin. On revient avec
                  une selection claire et rapide.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/[0.03] px-6 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/[0.06]"
                    href="mailto:contact@opalenoire.tn?subject=Demande%20de%20reservation%20-%20Opale%20Noire"
                  >
                    Envoyer un email
                  </a>
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-green-500 px-6 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-green-400"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp recommande
                  </a>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-[1.9rem] border border-white/10 bg-black/22 p-6">
                  <div className="text-base font-semibold text-white">Opale Noire</div>
                  <div className="mt-2 text-sm text-white/56">Hotels, groupes et seminaires en Tunisie</div>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-white/55">Telephone</span>
                      <a className="font-semibold text-white transition hover:text-white/80" href="tel:+21698503197">
                        +216 98 503 197
                      </a>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-white/55">Email</span>
                      <a
                        className="font-semibold text-white transition hover:text-white/80"
                        href="mailto:contact@opalenoire.tn"
                      >
                        contact@opalenoire.tn
                      </a>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-white/55">Presence</span>
                      <span className="font-semibold text-white">Basee en Tunisie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        aria-label="Revenir en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/60 text-white shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-black/75 md:bottom-7 md:right-7 ${
          showBackToTop ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m6 14 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
