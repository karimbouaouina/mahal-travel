"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { DottedMap } from "@/components/dotted-map";
import { HotelGallery } from "@/components/hotel-gallery";
import { LogoMarquee } from "@/components/logo-marquee";
import { Steps } from "@/components/steps";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

const featuredHotels = [
  {
    src: "/images/hotels/ChaineMouradi1200x675.png",
    title: "Chaine Mouradi",
    location: "Sousse",
  },
  {
    src: "/images/hotels/iberostar1200x675.jpg",
    title: "Iberostar Diar El Andalous",
    location: "Sousse",
  },
  {
    src: "/images/hotels/concorde1200x675.jpg",
    title: "Concorde Green Park Palace",
    location: "Sousse",
  },
  {
    src: "/images/hotels/ChaineMarhaba1200x675.png",
    title: "Chaine Marhaba",
    location: "Sousse",
  },
  {
    src: "/images/hotels/BelleVue1200x675.png",
    title: "Bellevue Park",
    location: "Sousse",
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
      areaServed: ["Tunisie", "Sousse", "Hammamet", "Monastir"],
      description:
        "Reservation d'hotels, groupes et seminaires en Tunisie avec un focus fort sur Sousse.",
    },
    {
      "@type": "WebSite",
      name: "Opale Noire",
      url: "https://opalenoiretravel.vercel.app",
      inLanguage: "fr",
    },
  ],
};

const hotelLines = [
  "Hotels premium et bords de mer",
  "Bloc chambres pour groupes",
  "Formats seminaires avec salles",
  "Reponse rapide et options triees",
];

const serviceTiles = [
  {
    title: "Reservations hotels",
    text: "Disponibilites, categories, pensions et arbitrage budget, dans un format clair et exploitable.",
  },
  {
    title: "Seminaires",
    text: "Hebergement, salles, pauses et rythme du sejour, organises dans une seule trajectoire.",
  },
  {
    title: "Groupes",
    text: "Bloc chambres, coordination des besoins et suivi jusqu'a la confirmation finale.",
  },
];

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
    title: "Seminaires",
    subtitle: "Salle, hebergement, cadence",
    text: "Pour un format equipe ou business, nous cadrons le sejour dans son ensemble et pas seulement les chambres.",
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
            <a className="transition hover:text-white" href="#services">
              Services
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
                  Nous gerons les reservations hotels, les besoins groupes et les formats seminaires avec un focus fort
                  sur Sousse. Tu partages les dates, le budget et le cadre du besoin, nous revenons avec des options
                  claires, activables et bien presentees.
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

                <div className="reveal mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Disponibilites", text: "Selon la periode, le standing et le budget" },
                    { title: "Seminaires", text: "Salle, hebergement, pauses et rythme du sejour" },
                    { title: "Suivi", text: "Jusqu'a la confirmation et aux derniers details" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="hover-panel rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                    >
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs leading-6 text-white/58">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="reveal card ring-glow relative overflow-hidden rounded-[2rem] p-6 md:p-7">
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <div className="pointer-events-none absolute -right-20 top-5 h-44 w-44 rounded-full bg-white/8 blur-3xl" />
                  <div className="pointer-events-none absolute -left-12 bottom-2 h-36 w-36 rounded-full bg-white/6 blur-3xl" />

                  <div className="relative">
                    <div className="text-sm font-semibold text-white">Demande rapide</div>
                    <div className="mt-1 text-xs text-white/52">Hotels, groupes et seminaires en Tunisie</div>

                    <div className="mt-6 grid gap-3">
                      {serviceTiles.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-[1.5rem] border border-white/10 bg-black/24 p-4 transition duration-500 hover:-translate-y-1 hover:border-white/16 hover:bg-white/[0.05]"
                        >
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="mt-2 text-xs leading-6 text-white/56">{item.text}</div>
                        </div>
                      ))}
                    </div>

                    <a
                      className="mt-6 inline-flex w-full items-center justify-center rounded-[1.4rem] bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] hover:bg-green-400"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Recevoir des options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hotels" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Hotels et lieux</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Une selection concrete pour Sousse, les groupes et les seminaires.
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
                <div className="text-xs text-white/42">Sousse • Monastir • Hammamet</div>
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
              <div className="grid gap-4 md:grid-cols-2">
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
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-sm font-semibold text-white">Exemples d&apos;hotels a Sousse</div>
              <div className="mt-2 text-sm leading-6 text-white/58">
                Clique pour ouvrir les apercus en plein ecran avec les visuels locaux selectionnes.
              </div>
            </div>

            <HotelGallery className="mt-6" items={featuredHotels} trailingLabel="Et bien plus encore." />
          </div>
        </section>

        <section id="services" className="container-x py-16 md:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Services</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Une organisation plus simple du premier message a la confirmation.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62">
              La page avance maintenant avec un langage plus direct, des blocs plus nets et des mouvements qui servent
              vraiment la lecture.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <div className="service-spotlight card ring-glow h-full rounded-[2.2rem] p-7 md:p-9">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/38">Opale Noire</div>
                <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.14] tracking-tight text-white">
                  On filtre, on structure et on te fait gagner du temps.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/66">
                  Au lieu d&apos;une liste de pistes opaques, tu recois un ensemble propre a comparer, avec ce qu&apos;il faut
                  pour decider vite et bien.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {hotelLines.map((item) => (
                    <div
                      key={item}
                      className="hook-card rounded-[1.45rem] border border-white/10 bg-black/18 p-4 text-sm font-semibold text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal grid gap-4 lg:col-span-5">
              {[
                {
                  title: "Demande claire",
                  text: "Dates, ville, nombre de personnes, budget et niveau de standing attendu.",
                },
                {
                  title: "Plusieurs options",
                  text: "Des choix utiles, bien presents, avec le bon niveau de detail pour arbitrer.",
                },
                {
                  title: "Coordination finale",
                  text: "Confirmation, derniers ajustements et informations pratiques avant le sejour.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="hover-panel rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                  <div className="text-lg font-semibold tracking-tight text-white">{item.title}</div>
                  <div className="mt-3 text-sm leading-6 text-white/60">{item.text}</div>
                </div>
              ))}
            </div>
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
