'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AnimationWrapper from '@/components/ui/AnimationWrapper';

const geleStyles = [
  {
    id: 1,
    name: 'Classic Round Gele',
    subtitle: 'Infinity or "Crown" Style',
    look: 'Perfectly rounded fan around the head — very symmetrical and regal.',
    how: 'The gele is wrapped around the head evenly, pleats are formed layer by layer toward the back, and the ends are tucked in or pinned securely.',
    occasion: 'Weddings, engagements, church services, formal events.',
    fabric: 'Stiff sego or aso-oke for structure.',
    steps: [
      'Fold the gele in half lengthwise for a clean edge.',
      'Place it on your head so one end is shorter (about one-third) and the other longer.',
      'Cross both ends firmly at the nape of your neck and pull tight.',
      'Start at the forehead — make small, even pleats and stack them neatly backward toward the crown.',
      'Bring the longer end over your head again, forming more pleats as you go.',
      'Arrange the top into a perfect circular or fan shape — use pins if needed to hold it up.',
      'Tuck both ends neatly at the back or side for a seamless finish.',
      'Adjust the symmetry — both sides should fan evenly like a halo.',
    ],
    image: '/images/gele-styles/classic-round.jpg',
  },
  {
    id: 2,
    name: 'Slanted Gele',
    subtitle: 'One-Sided Style',
    look: 'Asymmetrical and modern, with one side higher than the other.',
    how: 'Pleats are formed diagonally instead of straight, creating a slant or tilt. One end is raised higher while the other dips low.',
    vibe: 'Trendy, fashion-forward, often paired with lace or satin outfits.',
    occasion: 'High-society weddings, celebrity events.',
    steps: [
      'Fold the gele in half lengthwise for a clean top edge.',
      'Place on the head with one side shorter (about one-third) and the other longer.',
      'Cross both ends firmly at the nape and pull tight to stabilize.',
      'Start pleating from the front center of your forehead. Stack each pleat diagonally — not straight.',
      'Continue layering pleats toward one side (usually the right).',
      'Take the longer end over your head, maintaining the slant\'s direction.',
      'Pin or tuck the tail neatly at the back or beneath the opposite side.',
      'Ensure one side sits higher and fans out beautifully, while the other side dips softly.',
    ],
    image: '/images/gele-styles/slanted.jpg',
  },
  {
    id: 3,
    name: 'Rose Gele',
    subtitle: 'Flower or Petal Style',
    look: 'Shaped like a blooming rose or layered flower.',
    how: 'The gele is folded and twisted into circular layers that resemble rose petals.',
    occasion: 'High-fashion weddings and parties — often for brides or celebrants.',
    fabric: 'Softer materials like damask or soft sego.',
    steps: [
      'Fold the gele slightly lengthwise for a neat top edge.',
      'Place it around your head evenly, leaving equal lengths on both sides.',
      'Tie the gele firmly at the back or nape — this creates your anchor.',
      'Take one loose end and twist it tightly from base to tip.',
      'Start wrapping the twisted length around itself in a circular motion, like forming a bun.',
      'As you wrap, loosen the outer layers slightly to resemble rose petals.',
      'Use small pins or clips to secure each "petal" so the flower shape holds.',
      'Shape the petals outward and ensure the rose sits slightly to one side for balance.',
    ],
    image: '/images/gele-styles/rose.jpg',
  },
  {
    id: 4,
    name: 'Avant-Garde Gele',
    subtitle: 'Sculptural Style',
    look: 'Bold, artistic, statement-making — can include loops, wings, or sculpted shapes.',
    how: 'Created using thick aso-oke or damask, often pre-molded and supported with wire or stiffening spray.',
    occasion: 'Fashion shows, photo shoots, or luxury events.',
    steps: [
      'Start with a structured fabric like stiff aso-oke, damask, or metallic sego.',
      'Fold the gele slightly for a smooth top edge.',
      'Tie it firmly around your head, making sure it\'s tight at the base.',
      'Twist, roll, or fold sections upward to create loops or wing-like structures.',
      'Layer folds to one side or at the top for added drama.',
      'Use pins or wire (hidden within folds) to maintain the structure.',
      'Adjust angles — think of creating motion and balance rather than uniform pleats.',
      'Make sure the shape frames the face gracefully and that it feels secure.',
    ],
    image: '/images/gele-styles/avant-garde.jpg',
  },
  {
    id: 5,
    name: 'Butterfly Gele',
    subtitle: 'Open Wing Style',
    look: 'Spread out at the top with wings that flare out like a butterfly.',
    how: 'The gele is tied with wide pleats that extend outward, then shaped into two flared sides.',
    vibe: 'Romantic, elegant, airy.',
    occasion: 'Bridesmaids, wedding guests.',
    steps: [
      'Fold the gele in half lengthwise for a smooth edge.',
      'Place on your head with one side slightly shorter than the other.',
      'Cross both ends firmly and tie once to hold it in place.',
      'Begin creating pleats from the forehead to the crown — these will become the "wings."',
      'As you reach the top, start to spread out the pleats horizontally instead of stacking them tightly.',
      'Gently fan each side outward — creating symmetrical "wings" on either side of your head.',
      'Use small pins underneath to support the flares.',
      'Tuck or knot the ends at the back, keeping the top wide and open.',
    ],
    image: '/images/gele-styles/butterfly.jpg',
  },
  {
    id: 6,
    name: 'Turban Gele',
    subtitle: 'Infinity or Bow Turban',
    look: 'More casual and chic, with knots or bows in front or at the side.',
    how: 'Instead of pleats, the gele is wrapped and knotted like a headscarf, with visible twists or front bows.',
    occasion: 'Everyday wear, dinner outings, or modern looks.',
    fabric: 'Ankara, stretchy fabric, or silk.',
    steps: [
      'Use a soft or semi-stiff fabric like Ankara, silk, stretchy aso-oke, or velvet.',
      'Place the gele at the back of your head with both ends even.',
      'Bring both ends to the front and cross them firmly at your forehead.',
      'Twist or wrap the ends around each other — you can twist once for a clean knot or multiple times.',
      'For infinity style: Keep twisting and wrap around your head to tuck in the ends neatly at the back.',
      'For bow style: Create a bow at the front or side with the remaining fabric.',
      'Adjust the shape: Spread or tighten the wrap depending on the style.',
      'Smooth out the front folds for a neat, sculpted look.',
    ],
    image: '/images/gele-styles/turban.jpg',
  },
  {
    id: 7,
    name: 'Double Gele',
    subtitle: 'Layered Style',
    look: 'Two geles — often in complementary colors — stacked or layered for dramatic volume.',
    how: 'The first gele is tied as a base, and the second is layered over it to create contrast or height.',
    occasion: 'Bridal events and high-end parties.',
    steps: [
      'Choose base fabric: Stiff aso-oke or damask for structure.',
      'Choose top fabric: Softer sego or metallic aso-oke for shaping.',
      'Tie the base gele first, wrapping it around evenly with pleating.',
      'Secure tightly at the back — this is your foundation.',
      'Place the second gele directly over the base, slightly higher.',
      'Repeat pleating, stacking each fold over the previous one for depth.',
      'Fan the pleats outward for a full, layered crown effect.',
      'Pin both geles together at the back or sides to keep them stable.',
    ],
    image: '/images/gele-styles/double.jpg',
  },
  {
    id: 8,
    name: 'Ankara Gele',
    subtitle: 'Patterned Style',
    look: 'Colorful and patterned, with a softer and more relaxed finish.',
    how: 'Tied similarly to traditional styles but using Ankara fabric, which requires more folding because it\'s less stiff.',
    occasion: 'Everyday wear, semi-formal events, or cultural days.',
    steps: [
      'Choose a vibrant Ankara fabric — medium-weight works best.',
      'Fold the fabric to create a smooth edge at the forehead.',
      'Position on the head with one side slightly shorter than the other.',
      'Cross the ends and tie firmly at the back.',
      'Gently fold or twist the fabric along the head — Ankara is softer, so pleats will appear relaxed.',
      'Pin or tuck ends neatly to frame the face.',
      'Pull edges outward for a wider, more stylish silhouette.',
      'Smooth wrinkles and adjust so the patterns are visible.',
    ],
    image: '/images/gele-styles/ankara.jpg',
  },
  {
    id: 9,
    name: 'Pleated Gele',
    subtitle: 'Layered Style',
    look: 'Sharp, evenly folded pleats across the front and crown.',
    how: 'Each pleat is created manually and laid over the previous one, creating a detailed, professional finish.',
    skillLevel: 'Intermediate to advanced.',
    steps: [
      'Choose a stiff fabric like sego, aso-oke, or damask to hold sharp pleats.',
      'Fold the gele to create a smooth top edge for the forehead.',
      'Place on the head with one side slightly shorter than the other.',
      'Cross both ends and tie tightly at the back.',
      'Start from the forehead and fold fabric in small, uniform pleats, stacking toward the crown.',
      'Continue folding and stacking until the longer end is fully incorporated.',
      'Fan the pleats outward slightly to give height and elegance.',
      'Ensure all ends are hidden, and the pleats maintain a crisp, uniform structure.',
    ],
    image: '/images/gele-styles/pleated.jpg',
  },
  {
    id: 10,
    name: 'Auto-Gele',
    subtitle: 'Ready-Made Gele',
    look: 'Pre-tied and perfectly pleated — slips on like a cap.',
    how: 'No tying needed; elastic or Velcro holds it in place.',
    idealFor: 'Beginners or quick dressing.',
    steps: [
      'Choose your auto-gele in your preferred color and fabric.',
      'Slip it on like a headband or turban, centering it on your forehead.',
      'Pull gently to make it snug but comfortable.',
      'Most auto-geles have built-in pleats or folds — arrange them neatly using your hands.',
      'Tuck or pin loose ends if needed.',
      'Smooth fabric edges and adjust symmetry to frame the face.',
    ],
    image: '/images/gele-styles/auto-gele.jpg',
  },
];

// Accordion component for step-by-step instructions
function StepAccordion({ steps }: { steps: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-neutral/5 hover:bg-neutral/10 transition-colors"
      >
        <h3 className="text-lg font-semibold text-primary">
          Step-by-Step Guide
        </h3>
        <span className="text-accent text-xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <ol className="space-y-3">
            {steps.map((step, stepIndex) => (
              <li key={stepIndex} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-semibold">
                  {stepIndex + 1}
                </span>
                <span className="text-text-secondary text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// Main accordion for each gele style
function GeleStyleAccordion({ style, index }: { style: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral/30 rounded-xl overflow-hidden h-full flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex flex-col items-center gap-3 bg-white hover:bg-neutral/5 transition-colors"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
          {index + 1}
        </span>
        <div className="text-center">
          <h2 className="text-lg font-bold text-primary leading-tight">
            {style.name}
          </h2>
          <p className="text-accent text-xs font-medium mt-1">{style.subtitle}</p>
        </div>
        <span className="text-accent text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 py-4 bg-neutral/5 flex-1">
          <div className="space-y-4">
            {/* Image */}
            <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
              <Image
                src={style.image}
                alt={style.name}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  The Look
                </h3>
                <p className="text-text-secondary text-sm">{style.look}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  How It's Done
                </h3>
                <p className="text-text-secondary text-sm">{style.how}</p>
              </div>

              {style.occasion && (
                <div>
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Best For
                  </h3>
                  <p className="text-text-secondary text-sm">{style.occasion}</p>
                </div>
              )}

              {style.fabric && (
                <div>
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Recommended Fabric
                  </h3>
                  <p className="text-text-secondary text-sm">{style.fabric}</p>
                </div>
              )}

              {style.vibe && (
                <div>
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Vibe
                  </h3>
                  <p className="text-text-secondary text-sm">{style.vibe}</p>
                </div>
              )}

              {/* Step-by-Step Guide with Accordion */}
              <StepAccordion steps={style.steps} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/5 to-neutral/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <p className="text-sm text-accent tracking-extra-wide uppercase mb-4">
              Educational Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Gele Wrapping Styles
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover the art of gele tying. From classic crowns to modern avant-garde styles,
              learn the techniques behind Nigeria's most beautiful headwrap traditions.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Styles Accordion Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {geleStyles.map((style, index) => (
              <AnimationWrapper key={style.id} animation="fadeUp" delay={index * 0.05}>
                <GeleStyleAccordion style={style} index={index} />
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimationWrapper animation="fadeUp">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Try Your Look?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Use our virtual try-on to see how different gele styles look on you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/try-on"
                className="px-8 py-3 bg-accent text-white rounded-full hover:bg-accent/90 transition-all duration-300 font-semibold"
              >
                Try Virtual Try-On
              </a>
              <a
                href="/shop"
                className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
              >
                Shop Collection
              </a>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}
