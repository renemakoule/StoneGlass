export interface ProductVariety {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  description: string;
  specification: string[];
  more: string;
  features: string[];
  image: string;
  isSoldOut?: boolean;
  curr?: string;
  countdown?: { days: number; hours: number; mins: number; secs: number };
  colors: string[];
  sizes: string[];
  varieties: ProductVariety[];
}

export const PRODUCTS: Product[] = [
  {
    id: "anxiety-trinity-bracelet-of-stress-resilience",
    name: "Anxiety Trinity Bracelet of Stress Resilience",
    price: 1.0,
    description:
      "The Anxiety: Trinity Bracelet of Stress Resilience is designed to support calm, balance, and emotional grounding in everyday life. Thoughtfully crafted with a harmonious combination of natural gemstones, this bracelet serves as a gentle reminder to slow down, breathe, and stay centered during moments of pressure.Wear it on its own for a subtle, reassuring presence or layer it with other bracelets to reinforce your intention of calm and inner stability. Each bracelet is made with genuine, carefully selected gemstone beads for lasting quality and comfort.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Traditionally, calming gemstones have been worn to promote emotional balance, grounding, and a sense of inner peace. The Trinity Bracelet represents harmony between mind, body, and intention, encouraging a composed and resilient mindset throughout the day.",
    image:
      "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm1.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-0",
        name: "calm1",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm1.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-1",
        name: "calm2",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm2.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-2",
        name: "calm3",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm3.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-3",
        name: "calm4",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm4.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-4",
        name: "calm5",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm5.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-5",
        name: "calm6",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/calm6.webp",
      },
      {
        id: "v-anxiety-trinity-bracelet-of-stress-resilience-6",
        name: "friend2",
        image:
          "/StoneGlas/anxiety-trinity-bracelet-of-stress-resilience/friend2.webp",
      },
    ],
  },
  {
    id: "azurite-bracelet",
    name: "Azurite Bracelet",
    price: 4500.0,
    description:
      "The Azurite Bracelet highlights the deep blue beauty of natural azurite, a stone admired for its rich color and distinctive character. Crafted for those who value authenticity and natural elegance, this bracelet brings a refined, mineral presence to everyday wear.Wear it alone for a bold yet sophisticated look or pair it with other bracelets to create a balanced, natural style. Each piece is made with genuine azurite beads, carefully selected for their intense color variations and natural texture.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Azurite is a copper-based mineral known for its deep blue tones and historical use in art and ornamentation. Valued for its striking appearance and natural depth, azurite is often associated with insight, awareness, and clarity. Its unique formation and color variations ensure that every bracelet is one of a kind, reflecting the raw beauty of natural stone.",
    image: "/StoneGlas/azurite-bracelet/azurite-1.jpg",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-azurite-bracelet-0",
        name: "azurite 1",
        image: "/StoneGlas/azurite-bracelet/azurite-1.jpg",
      },
      {
        id: "v-azurite-bracelet-1",
        name: "azurite",
        image: "/StoneGlas/azurite-bracelet/azurite.webp",
      },
      {
        id: "v-azurite-bracelet-2",
        name: "azurite3",
        image: "/StoneGlas/azurite-bracelet/azurite3.jpg",
      },
      {
        id: "v-azurite-bracelet-3",
        name: "azurite4",
        image: "/StoneGlas/azurite-bracelet/azurite4.jpg",
      },
      {
        id: "v-azurite-bracelet-4",
        name: "azurite5",
        image: "/StoneGlas/azurite-bracelet/azurite5.jpg",
      },
      {
        id: "v-azurite-bracelet-5",
        name: "azurtite6",
        image: "/StoneGlas/azurite-bracelet/azurtite6.jpg",
      },
      {
        id: "v-azurite-bracelet-6",
        name: "friend2",
        image: "/StoneGlas/azurite-bracelet/friend2.webp",
      },
    ],
  },
  {
    id: "blue-apatite-the-blue-focus-bracelet",
    name: "Blue Apatite The Blue Focus Bracelet",
    price: 435.0,
    description:
      "This Blue Apatite bracelet is designed to stimulate mental clarity, focus, and self-expression, helping you stay on track with your daily goals. It's perfect for those seeking a stone that inspires creativity, discernment, and clearer communication.Wear this bracelet alone for subtle energy or layer it with other bracelets to enhance your intention of balance and focus. This bracelet is crafted with genuine, high-quality Blue Apatite beads, carefully selected for their natural luster.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Blue Apatite is a stone associated with clarity of mind, inspiration, and communication. It is known to encourage authentic self-expression, stimulate creativity, and help dispel mental confusion. This stone is also linked to opening the throat chakra, facilitating confident communication and a deeper understanding of oneself.",
    image: "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blu.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-0",
        name: "blu",
        image: "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blu.webp",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-1",
        name: "blue apatite",
        image:
          "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blue-apatite.jpg",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-2",
        name: "blue apatite2",
        image:
          "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blue-apatite2.jpg",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-3",
        name: "blue apatite3",
        image:
          "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blue-apatite3.webp",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-4",
        name: "blue apatite4",
        image:
          "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blue-apatite4.jpg",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-5",
        name: "blue apatite6",
        image:
          "/StoneGlas/blue-apatite-the-blue-focus-bracelet/blue-apatite6.jpg",
      },
      {
        id: "v-blue-apatite-the-blue-focus-bracelet-6",
        name: "friend2",
        image: "/StoneGlas/blue-apatite-the-blue-focus-bracelet/friend2.webp",
      },
    ],
  },
  {
    id: "blue-spot-stone-bracelet",
    name: "Blue Spot Stone Bracelet",
    price: 999.0,
    description:
      "The Blue Spot Stone Bracelet showcases the natural charm and visual appeal of genuine Blue Spot Stone, known for its distinctive blue and white patterns and organic beauty. Designed for those who value both style and subtle symbolic meaning, this bracelet brings a calm yet expressive presence to your everyday look.Wear it on its own for a natural, effortless style or stack it with other bracelets to reflect your personal intention. Each bracelet is made with carefully selected natural Blue Spot Stone beads, chosen for their unique color variations and harmonious patterns.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Blue Spot Stone is a naturally patterned gemstone often associated with calm, emotional balance, and inner strength. Its serene blue hues and unique markings make each piece truly one of a kind. Traditionally, this stone is believed to support emotional harmony, peace of mind, and clearer communication.",
    image: "/StoneGlas/blue-spot-stone-bracelet/blue.avif",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-blue-spot-stone-bracelet-0",
        name: "blue",
        image: "/StoneGlas/blue-spot-stone-bracelet/blue.avif",
      },
      {
        id: "v-blue-spot-stone-bracelet-1",
        name: "blue1",
        image: "/StoneGlas/blue-spot-stone-bracelet/blue1.avif",
      },
      {
        id: "v-blue-spot-stone-bracelet-2",
        name: "blue2",
        image: "/StoneGlas/blue-spot-stone-bracelet/blue2.avif",
      },
      {
        id: "v-blue-spot-stone-bracelet-3",
        name: "blue3",
        image: "/StoneGlas/blue-spot-stone-bracelet/blue3.avif",
      },
      {
        id: "v-blue-spot-stone-bracelet-4",
        name: "blue5",
        image: "/StoneGlas/blue-spot-stone-bracelet/blue5.avif",
      },
    ],
  },
  {
    id: "dream-the-bracelet-of-resolve",
    name: "dream the bracelet of resolve",
    price: 4999.0,
    description:
      "Designed to support inner strength and determination, the Dream Bracelet of Resolve is a symbol of focus, resilience, and personal commitment. It is created for those who move forward with intention, even in moments of doubt, and seek clarity while pursuing their goals. Wear it alone for a refined, meaningful statement or layer it with other bracelets to reinforce your personal intention. This bracelet is crafted with genuine natural gemstone beads, carefully selected for their quality and timeless appeal.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "The Dream Bracelet of Resolve represents perseverance, clarity of purpose, and the courage to stay aligned with one’s path. Traditionally, intention-based gemstones are worn as daily reminders to remain grounded, focused, and committed to personal growth, making this bracelet a meaningful companion for everyday life.",
    image: "/StoneGlas/dream-the-bracelet-of-resolve/dram1.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-dream-the-bracelet-of-resolve-0",
        name: "dram1",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dram1.webp",
      },
      {
        id: "v-dream-the-bracelet-of-resolve-1",
        name: "dream",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dream.webp",
      },
      {
        id: "v-dream-the-bracelet-of-resolve-2",
        name: "dream2",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dream2.webp",
      },
      {
        id: "v-dream-the-bracelet-of-resolve-3",
        name: "dream3",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dream3.jpg",
      },
      {
        id: "v-dream-the-bracelet-of-resolve-4",
        name: "dream4",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dream4.webp",
      },
      {
        id: "v-dream-the-bracelet-of-resolve-5",
        name: "dream5",
        image: "/StoneGlas/dream-the-bracelet-of-resolve/dream5.jpg",
      },
    ],
  },
  {
    id: "Friendship",
    name: "Friendship",
    price: 1899.0,
    description:
      "The Friendship bracelet is designed to celebrate connection, loyalty, and meaningful bonds. Created as a symbol of trust and harmony, it represents the value of shared moments, mutual support, and lasting relationships. Wear it as a daily reminder of connection or gift it to someone special as a symbol of appreciation and unity. Each bracelet is crafted with genuine natural gemstone beads, carefully selected for their balance, quality, and timeless design.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Throughout history, symbolic jewelry has been worn to honor connection and shared intention. The Friendship bracelet represents unity, trust, and emotional balance, making it a meaningful piece to strengthen bonds and celebrate authentic relationships.",
    image: "/StoneGlas/Friendship/friend1.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-Friendship-0",
        name: "friend1",
        image: "/StoneGlas/Friendship/friend1.webp",
      },
      {
        id: "v-Friendship-1",
        name: "friend2",
        image: "/StoneGlas/Friendship/friend2.webp",
      },
      {
        id: "v-Friendship-2",
        name: "friend3",
        image: "/StoneGlas/Friendship/friend3.jpg",
      },
      {
        id: "v-Friendship-3",
        name: "friend4",
        image: "/StoneGlas/Friendship/friend4.jpg",
      },
      {
        id: "v-Friendship-4",
        name: "friend5",
        image: "/StoneGlas/Friendship/friend5.jpg",
      },
    ],
  },
  {
    id: "good-luck-pure-luck-horseshoe-amethyst-bracelet",
    name: "Good luck Pure Luck - Horseshoe Amethyst Bracelet",
    price: 299.0,
    description:
      "The Good Luck: Pure Luck Horseshoe Amethyst Bracelet is designed to symbolize positivity, protection, and fortunate energy. Featuring natural amethyst gemstones and a horseshoe accent, this bracelet represents luck, balance, and a calm state of mind. Wear it on its own for a meaningful and elegant look or stack it with other bracelets to enhance your intention of good fortune. Each bracelet is crafted with genuine amethyst beads, carefully selected for their rich color, clarity, and lasting beauty.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Amethyst has long been associated with clarity, calm, and protection. Traditionally worn as a symbol of balance and positive energy, it is believed to encourage inner peace and attract favorable outcomes, making it a timeless stone for intention and good luck.",
    image:
      "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck.jpg",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-0",
        name: "friend2",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/friend2.webp",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-1",
        name: "luck",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck.jpg",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-2",
        name: "luck1",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck1.jpg",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-3",
        name: "luck2",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck2.jpg",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-4",
        name: "luck3",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck3.jpg",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-5",
        name: "luck5",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck5.jpg",
      },
      {
        id: "v-good-luck-pure-luck-horseshoe-amethyst-bracelet-6",
        name: "luck6",
        image:
          "/StoneGlas/good-luck-pure-luck-horseshoe-amethyst-bracelet/luck6.jpg",
      },
    ],
  },
  {
    id: "labradorite-bracelet",
    name: "Labradorite Bracelet",
    price: 355.0,
    description:
      "The Labradorite Bracelet showcases the breathtaking beauty and iridescent flashes of natural Labradorite, known for its unique play of colors and organic elegance. Designed for those who appreciate both visual depth and meaningful symbolism, this bracelet brings an earthy yet striking presence to everyday wear. Wear it on its own for a distinctive, natural look or stack it with other pieces to elevate your personal style. Each bracelet is crafted with genuine Labradorite beads, selected for their vibrant labradorescence and refined finish.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Labradorite is celebrated for its shimmering play of colors and is often referred to as a stone of protection, intuition, and transformation. Its reflective surface displays iridescent flashes that shift with movement and light, offering a sense of depth and mystique. Traditionally, Labradorite is believed to help shield the aura from negative energies, enhance clarity and inner wisdom, and support emotional balance and spiritual growth.",
    image: "/StoneGlas/labradorite-bracelet/labra.avif",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-labradorite-bracelet-0",
        name: "friend2",
        image: "/StoneGlas/labradorite-bracelet/friend2.webp",
      },
      {
        id: "v-labradorite-bracelet-1",
        name: "labra",
        image: "/StoneGlas/labradorite-bracelet/labra.avif",
      },
      {
        id: "v-labradorite-bracelet-2",
        name: "labra1",
        image: "/StoneGlas/labradorite-bracelet/labra1.avif",
      },
      {
        id: "v-labradorite-bracelet-3",
        name: "labra2",
        image: "/StoneGlas/labradorite-bracelet/labra2.avif",
      },
      {
        id: "v-labradorite-bracelet-4",
        name: "labra4",
        image: "/StoneGlas/labradorite-bracelet/labra4.avif",
      },
      {
        id: "v-labradorite-bracelet-5",
        name: "labra5",
        image: "/StoneGlas/labradorite-bracelet/labra5.avif",
      },
      {
        id: "v-labradorite-bracelet-6",
        name: "labradorite men",
        image: "/StoneGlas/labradorite-bracelet/labradorite-men.jpg",
      },
    ],
  },
  {
    id: "love-repair-my-hairt",
    name: "Love Repair",
    price: 2500.0,
    description:
      "The Love: Repair My Heart bracelet is designed to support emotional healing, self-love, and inner balance. Created as a gentle symbol of renewal, it accompanies those who wish to reconnect with their emotions and move forward with openness and compassion. Wear it alone as a meaningful daily reminder or layer it with other bracelets to reinforce your intention of love and emotional harmony. Each bracelet is crafted with genuine natural gemstone beads, carefully selected for their softness, quality, and timeless elegance.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Traditionally, heart-centered gemstones have been worn to encourage emotional balance, compassion, and self-acceptance. The Repair My Heart bracelet represents a mindful approach to healing, helping to restore trust, calm emotions, and invite love in all its forms.",
    image: "/StoneGlas/love-repair-my-hairt/love-1.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-love-repair-my-hairt-0",
        name: "love 1",
        image: "/StoneGlas/love-repair-my-hairt/love-1.webp",
      },
      {
        id: "v-love-repair-my-hairt-1",
        name: "love 2",
        image: "/StoneGlas/love-repair-my-hairt/love-2.webp",
      },
      {
        id: "v-love-repair-my-hairt-2",
        name: "love 3",
        image: "/StoneGlas/love-repair-my-hairt/love-3.webp",
      },
      {
        id: "v-love-repair-my-hairt-3",
        name: "love4",
        image: "/StoneGlas/love-repair-my-hairt/love4.webp",
      },
      {
        id: "v-love-repair-my-hairt-4",
        name: "love5",
        image: "/StoneGlas/love-repair-my-hairt/love5.webp",
      },
    ],
  },
  {
    id: "money-the-ultimate-wealth-bracelet",
    name: "money the ultimate wealth bracelet",
    price: 4099.0,
    description:
      "The Money: Ultimate Wealth Bracelet is designed to symbolize ambition, confidence, and a success-driven mindset. Crafted for those who value focus and consistency, this bracelet represents a clear intention toward growth, opportunity, and personal achievement. Wear it as a refined daily statement or combine it with other bracelets to strengthen your intention of prosperity. Each piece is made with genuine natural gemstone beads, carefully selected for their quality, balance, and timeless elegance.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Throughout history, intention-based gemstones have been worn as symbols of abundance, focus, and confidence. The Ultimate Wealth Bracelet reflects a mindful approach to success, encouraging clarity, motivation, and alignment with one’s personal goals.",
    image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money1.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-money-the-ultimate-wealth-bracelet-0",
        name: "money1",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money1.webp",
      },
      {
        id: "v-money-the-ultimate-wealth-bracelet-1",
        name: "money2",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money2.jpg",
      },
      {
        id: "v-money-the-ultimate-wealth-bracelet-2",
        name: "money3",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money3.jpg",
      },
      {
        id: "v-money-the-ultimate-wealth-bracelet-3",
        name: "money4",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money4.jpg",
      },
      {
        id: "v-money-the-ultimate-wealth-bracelet-4",
        name: "money5",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money5.jpg",
      },
      {
        id: "v-money-the-ultimate-wealth-bracelet-5",
        name: "money6",
        image: "/StoneGlas/money-the-ultimate-wealth-bracelet/money6.jpg",
      },
    ],
  },
  {
    id: "natural-sparrow-stone",
    name: "Natural Sparrow Stone",
    price: 499.0,
    description:
      "The Natural Sparrow Stone Bracelet highlights the beauty and authenticity of raw, natural materials. Crafted with genuine Sparrow Stone, this piece reflects a connection to nature, simplicity, and timeless craftsmanship, making it ideal for those who appreciate organic textures and understated elegance. Designed to be worn daily, this bracelet can stand alone for a natural, minimalist look or be paired with other pieces for a balanced and earthy style. Each bracelet is made with carefully selected Sparrow Stone beads, chosen for their unique patterns and natural character.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Sparrow Stone is valued for its natural appearance and grounded energy. Often associated with stability, simplicity, and a return to essentials, it is appreciated for its subtle tones and organic patterns, making each bracelet truly unique. Its natural formation ensures that no two pieces are exactly alike.",
    image: "/StoneGlas/natural-sparrow-stone/sparrow-1.avif",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-natural-sparrow-stone-0",
        name: "sparrow 1",
        image: "/StoneGlas/natural-sparrow-stone/sparrow-1.avif",
      },
      {
        id: "v-natural-sparrow-stone-1",
        name: "sparrow 2",
        image: "/StoneGlas/natural-sparrow-stone/sparrow-2.avif",
      },
      {
        id: "v-natural-sparrow-stone-2",
        name: "sparrow 4",
        image: "/StoneGlas/natural-sparrow-stone/sparrow-4.avif",
      },
      {
        id: "v-natural-sparrow-stone-3",
        name: "sparrow3 1",
        image: "/StoneGlas/natural-sparrow-stone/sparrow3-1.avif",
      },
      {
        id: "v-natural-sparrow-stone-4",
        name: "sparrow5 1",
        image: "/StoneGlas/natural-sparrow-stone/sparrow5-1.avif",
      },
    ],
  },
  {
    id: "pink-crystal-bracelet",
    name: "Pink Crystal Bracelet",
    price: 799.0,
    description:
      "The Pink Crystal Bracelet highlights the soft elegance and natural beauty of pink crystal stones. Designed for those who appreciate subtle color tones and refined materials, this bracelet brings a gentle, timeless touch to everyday style. Wear it alone for a delicate, minimalist look, or layer it with other bracelets to create a harmonious, balanced appearance. Each bracelet is crafted with genuine pink crystal beads, carefully selected for their clarity, smooth texture, and soft natural hues.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Pink crystal stones are appreciated for their gentle tones and refined aesthetic. Often associated with softness, harmony, and emotional balance, pink crystals are valued for their calming presence and timeless appeal. Their natural variations make each bracelet unique, reflecting both elegance and authenticity.",
    image: "/StoneGlas/pink-crystal-bracelet/pi.avif",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-pink-crystal-bracelet-0",
        name: "friend2",
        image: "/StoneGlas/pink-crystal-bracelet/friend2.webp",
      },
      {
        id: "v-pink-crystal-bracelet-1",
        name: "pi",
        image: "/StoneGlas/pink-crystal-bracelet/pi.avif",
      },
      {
        id: "v-pink-crystal-bracelet-2",
        name: "pink",
        image: "/StoneGlas/pink-crystal-bracelet/pink.jpg",
      },
      {
        id: "v-pink-crystal-bracelet-3",
        name: "pink2",
        image: "/StoneGlas/pink-crystal-bracelet/pink2.jpg",
      },
      {
        id: "v-pink-crystal-bracelet-4",
        name: "pink3",
        image: "/StoneGlas/pink-crystal-bracelet/pink3.webp",
      },
      {
        id: "v-pink-crystal-bracelet-5",
        name: "pink5",
        image: "/StoneGlas/pink-crystal-bracelet/pink5.jpg",
      },
      {
        id: "v-pink-crystal-bracelet-6",
        name: "pink6",
        image: "/StoneGlas/pink-crystal-bracelet/pink6.jpg",
      },
      {
        id: "v-pink-crystal-bracelet-7",
        name: "pink7",
        image: "/StoneGlas/pink-crystal-bracelet/pink7.jpg",
      },
      {
        id: "v-pink-crystal-bracelet-8",
        name: "po",
        image: "/StoneGlas/pink-crystal-bracelet/po.avif",
      },
    ],
  },
  {
    id: "power-the-energy-protection-bracelet",
    name: "power the energy protection bracelet",
    price: 3999.0,
    description:
      "The Power: Energy Protection Bracelet is designed to support strength, grounding, and energetic balance. Crafted as a symbol of personal protection and inner stability, it accompanies those who seek to move through their day with confidence and calm presence. Wear it alone for a bold yet refined statement or stack it with other bracelets to reinforce your intention of protection and balance. Each bracelet is made with genuine natural gemstone beads, carefully selected for their durability, texture, and timeless appeal.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Protective gemstones have long been worn as symbols of grounding and energetic strength. The Energy Protection Bracelet represents a mindful approach to personal balance, helping to maintain focus, resilience, and a sense of inner security throughout daily life.",
    image: "/StoneGlas/power-the-energy-protection-bracelet/power.jpg",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-power-the-energy-protection-bracelet-0",
        name: "friend2",
        image: "/StoneGlas/power-the-energy-protection-bracelet/friend2.webp",
      },
      {
        id: "v-power-the-energy-protection-bracelet-1",
        name: "power",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power.jpg",
      },
      {
        id: "v-power-the-energy-protection-bracelet-2",
        name: "power1",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power1.jpg",
      },
      {
        id: "v-power-the-energy-protection-bracelet-3",
        name: "power2",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power2.jpg",
      },
      {
        id: "v-power-the-energy-protection-bracelet-4",
        name: "power3",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power3.jpg",
      },
      {
        id: "v-power-the-energy-protection-bracelet-5",
        name: "power5",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power5.webp",
      },
      {
        id: "v-power-the-energy-protection-bracelet-6",
        name: "power55",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power55.webp",
      },
      {
        id: "v-power-the-energy-protection-bracelet-7",
        name: "power6",
        image: "/StoneGlas/power-the-energy-protection-bracelet/power6.jpg",
      },
    ],
  },
  {
    id: "strawberry-crystal-bracelet",
    name: "Strawberry Crystal Bracelet",
    price: 499.0,
    description:
      "The Strawberry Crystal Bracelet is a delicate and elegant piece crafted from natural strawberry crystal, a stone admired for its soft pink tones infused with subtle red inclusions that resemble tiny strawberry seeds. This unique appearance gives each bracelet a warm, romantic, and uplifting character. Designed for everyday wear, this bracelet combines natural beauty with a refined aesthetic. Strawberry crystal is often associated with love, emotional harmony, and positive energy, making it a meaningful accessory as well as a stylish one. Each bead is carefully selected to highlight the stone’s natural glow and individuality.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Strawberry crystal is a variety of quartz known for its gentle yet vibrant energy. It is traditionally linked to love, joy, and emotional balance, helping to attract positive feelings and strengthen connections with oneself and others. Its warm pink-red hues make it a perfect stone for those seeking both beauty and meaning in their jewelry.",
    image: "/StoneGlas/strawberry-crystal-bracelet/17.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-strawberry-crystal-bracelet-0",
        name: "17",
        image: "/StoneGlas/strawberry-crystal-bracelet/17.webp",
      },
      {
        id: "v-strawberry-crystal-bracelet-1",
        name: "braceletquartzfraise cristalnaturelaaadehautequalitepourl amouretlaguerisonemotionnelle8mm",
        image:
          "/StoneGlas/strawberry-crystal-bracelet/braceletquartzfraise-cristalnaturelaaadehautequalitepourl-amouretlaguerisonemotionnelle8mm.webp",
      },
      {
        id: "v-strawberry-crystal-bracelet-2",
        name: "braceletquartzfraisepourfemme braceletdeperlesquartzfraise braceletcreativite braceletquartzrose braceletsdeguerisonenperles",
        image:
          "/StoneGlas/strawberry-crystal-bracelet/braceletquartzfraisepourfemme-braceletdeperlesquartzfraise-braceletcreativite-braceletquartzrose-braceletsdeguerisonenperles.jpg",
      },
      {
        id: "v-strawberry-crystal-bracelet-3",
        name: "healingcrystalbracelet naturalstrawberryquartzbracelet birthdaygift braceletsforwomen mensbracelet gradestretchbracelet",
        image:
          "/StoneGlas/strawberry-crystal-bracelet/healingcrystalbracelet-naturalstrawberryquartzbracelet-birthdaygift-braceletsforwomen-mensbracelet-gradestretchbracelet.webp",
      },
      {
        id: "v-strawberry-crystal-bracelet-4",
        name: "natural8mmstrawberryquartzstoneredcrystalstretchbracelethandmade7 5 1",
        image:
          "/StoneGlas/strawberry-crystal-bracelet/natural8mmstrawberryquartzstoneredcrystalstretchbracelethandmade7-5-1.webp",
      },
      {
        id: "v-strawberry-crystal-bracelet-5",
        name: "thisitemisunavailable etsy",
        image:
          "/StoneGlas/strawberry-crystal-bracelet/thisitemisunavailable-etsy.jpg",
      },
    ],
  },
  {
    id: "success-built-to-win-7a-grade-tiger-s-eye-bracelet",
    name: "success built to win 7a grade tiger s eye bracelet",
    price: 345.0,
    description:
      "The Success: Built to Win bracelet is designed to embody confidence, determination, and personal power. Crafted with 7A Grade Tiger's Eye gemstones, this bracelet is made for those who pursue their goals with focus, courage, and consistency. Wear it as a daily reminder of strength and ambition, either on its own or stacked with other bracelets for a bold yet refined look. Each piece is made with genuine, high-quality gemstones selected for their depth, polish, and lasting beauty.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Tiger’s Eye has long been associated with confidence, focus, and personal empowerment. Traditionally worn as a symbol of strength and success, it is believed to support decision-making, encourage perseverance, and help maintain balance while pursuing long-term goals.",
    image:
      "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/succes.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-0",
        name: "succes",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/succes.webp",
      },
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-1",
        name: "success1",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/success1.webp",
      },
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-2",
        name: "success3",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/success3.jpg",
      },
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-3",
        name: "success4",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/success4.webp",
      },
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-4",
        name: "success5",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/success5.webp",
      },
      {
        id: "v-success-built-to-win-7a-grade-tiger-s-eye-bracelet-5",
        name: "success6",
        image:
          "/StoneGlas/success-built-to-win-7a-grade-tiger-s-eye-bracelet/success6.webp",
      },
    ],
  },
  {
    id: "the-spiritual-protection",
    name: "The spiritual protection",
    price: 200.0,
    description:
      "Even when you encounter fear, this tiger's eye gemstone will help you feel empowered and emboldened to move past it.  This Tiger Eye stretch bracelet features a sterling silver half moon cut accent bead. Wear as a single bracelet or mix it up to make a bracelet stack for added energy. This bracelet is made with genuine Grade A gemstone beads. ",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Historically Tiger's Eye has been used in protective medicine. Roman soldiers would wear engraved stones during battle; it is especially helpful against dark magic. A good luck stone, it is also used for discerning the truth in any situation.",
    image: "/StoneGlas/the-spiritual-protection/pprotection1.jpg",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-the-spiritual-protection-0",
        name: "pprotection1",
        image: "/StoneGlas/the-spiritual-protection/pprotection1.jpg",
      },
      {
        id: "v-the-spiritual-protection-1",
        name: "protection2",
        image: "/StoneGlas/the-spiritual-protection/protection2.jpg",
      },
      {
        id: "v-the-spiritual-protection-2",
        name: "protection3",
        image: "/StoneGlas/the-spiritual-protection/protection3.jpg",
      },
      {
        id: "v-the-spiritual-protection-3",
        name: "protection4",
        image: "/StoneGlas/the-spiritual-protection/protection4.jpg",
      },
      {
        id: "v-the-spiritual-protection-4",
        name: "protection5",
        image: "/StoneGlas/the-spiritual-protection/protection5.webp",
      },
    ],
  },
  {
    id: "the-triple-protection-bracelet",
    name: "The Triple Protection Bracelet",
    price: 899.0,
    description:
      "The Triple Protection Bracelet is designed to symbolize strength, balance, and personal protection. Crafted with a thoughtful combination of natural gemstones, it represents a layered approach to grounding, resilience, and energetic stability throughout daily life. Wear it alone for a strong, confident statement or stack it with other bracelets to reinforce your intention of protection and inner balance. Each bracelet is made with genuine gemstone beads, carefully selected for their durability, harmony, and refined finish.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Triple protection bracelets are traditionally worn to represent balance between mind, body, and intention. By combining complementary stones, this bracelet reflects a mindful approach to maintaining focus, stability, and a sense of personal security in everyday life.",
    image: "/StoneGlas/the-triple-protection-bracelet/tiple-protection.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-the-triple-protection-bracelet-0",
        name: "friend2",
        image: "/StoneGlas/the-triple-protection-bracelet/friend2.webp",
      },
      {
        id: "v-the-triple-protection-bracelet-1",
        name: "tiple protection",
        image:
          "/StoneGlas/the-triple-protection-bracelet/tiple-protection.webp",
      },
      {
        id: "v-the-triple-protection-bracelet-2",
        name: "triple protection1",
        image:
          "/StoneGlas/the-triple-protection-bracelet/triple-protection1.webp",
      },
      {
        id: "v-the-triple-protection-bracelet-3",
        name: "triple protection2",
        image:
          "/StoneGlas/the-triple-protection-bracelet/triple-protection2.webp",
      },
      {
        id: "v-the-triple-protection-bracelet-4",
        name: "triple protection4",
        image:
          "/StoneGlas/the-triple-protection-bracelet/triple-protection4.webp",
      },
      {
        id: "v-the-triple-protection-bracelet-5",
        name: "triple protection6",
        image:
          "/StoneGlas/the-triple-protection-bracelet/triple-protection6.jpg",
      },
      {
        id: "v-the-triple-protection-bracelet-6",
        name: "triple protection7",
        image:
          "/StoneGlas/the-triple-protection-bracelet/triple-protection7.jpg",
      },
      {
        id: "v-the-triple-protection-bracelet-7",
        name: "whatsapp image 2026 01 05 at 09 25 56",
        image:
          "/StoneGlas/the-triple-protection-bracelet/whatsapp-image-2026-01-05-at-09-25-56.jpeg",
      },
    ],
  },
  {
    id: "unakite-bracelet",
    name: "UNAKITE Bracelet",
    price: 599.0,
    description:
      "The Unakite Bracelet features the unique blend of soft green and pink tones found in genuine Unakite stone, offering a naturally expressive and one-of-a-kind look. Designed for those who appreciate organic beauty and emotional balance, this bracelet brings a grounded yet graceful presence to any outfit. Wear it alone for a timeless, earthy aesthetic or stack it with other pieces to deepen your personal style. Each bracelet is crafted with carefully selected Unakite beads, known for their distinctive patterns and natural character.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Unakite is a metamorphic stone composed of green epidote and pink feldspar, often with touches of quartz, giving it a unique mottled appearance cherished in jewelry making. Its combination of colors symbolizes emotional balance, harmony, and inner reflection, and the stone is traditionally associated with peace, renewal, and heart-centered intentions.",
    image:
      "/StoneGlas/unakite-bracelet/braceletencristald-unakite-braceletenunakiteextensible-bijouxenunakite-braceletencristaldeguerison-braceletnouveaudepart-braceletencristalpourfemme.webp",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-unakite-bracelet-0",
        name: "braceletencristald unakite braceletenunakiteextensible bijouxenunakite braceletencristaldeguerison braceletnouveaudepart braceletencristalpourfemme",
        image:
          "/StoneGlas/unakite-bracelet/braceletencristald-unakite-braceletenunakiteextensible-bijouxenunakite-braceletencristaldeguerison-braceletnouveaudepart-braceletencristalpourfemme.webp",
      },
      {
        id: "v-unakite-bracelet-1",
        name: "unah 1",
        image: "/StoneGlas/unakite-bracelet/unah-1.avif",
      },
      {
        id: "v-unakite-bracelet-2",
        name: "unahu 1",
        image: "/StoneGlas/unakite-bracelet/unahu-1.avif",
      },
      {
        id: "v-unakite-bracelet-3",
        name: "unak 1",
        image: "/StoneGlas/unakite-bracelet/unak-1.avif",
      },
      {
        id: "v-unakite-bracelet-4",
        name: "unak1 1",
        image: "/StoneGlas/unakite-bracelet/unak1-1.avif",
      },
      {
        id: "v-unakite-bracelet-5",
        name: "unakitebracelet 1",
        image: "/StoneGlas/unakite-bracelet/unakitebracelet-1.webp",
      },
      {
        id: "v-unakite-bracelet-6",
        name: "unakitebracelet",
        image: "/StoneGlas/unakite-bracelet/unakitebracelet.webp",
      },
    ],
  },
  {
    id: "yellow-tiger-eye-bracelet",
    name: "Yellow Tiger Eye Bracelet",
    price: 1999.0,
    description:
      "The Yellow Tiger Eye Bracelet is crafted from natural yellow tiger eye stone, recognized for its golden-yellow tones and silky, reflective bands. This stone is valued for its bold appearance and timeless appeal, making the bracelet both powerful and elegant. Designed for daily wear, this bracelet brings a confident and grounded presence to any look. Each bead is carefully polished to enhance the stone’s natural shine and distinctive chatoyancy, ensuring that every bracelet is unique.",
    features: [
      "🍀 Attracts Positive Energy and Good Fortune",
      "🔮 Enhances Mental Clarity and Intuition",
      "✨ Amplifies Luck and Opportunity",
    ],
    specification: [
      "Dimensions — Various Sizes or Custom Fit",
      "Jewellery Type — Bracelet",
      "Main Stone Type — Natural Gemstones",
      "Material — Sterling Silver and Natural Gemstones",
      "Brand — STONEGLASS",
      "Metal Type — Sterling Silver",
      "Bracelet Type — Stretch Elastic",
    ],
    more: "Yellow tiger eye has been used for centuries as a stone of strength, courage, and confidence. Traditionally associated with protection and mental clarity, it is believed to help promote focus, determination, and balanced decision-making. Its golden hue has also made it a symbol of prosperity and personal power throughout history.",
    image:
      "/StoneGlas/yellow-tiger-eye-bracelet/tiger-eye-bracelet-crystal-bead-bracelet-tiger-eye-bracelet-8mm-tiger-eye-tumbled-bracelet-gemstone.jpeg",
    sizes: ["XS:14cm", "S:15cm", "M:16cm", "L:17cm", "XL:18cm", "XXL:19cm"],
    colors: [],
    varieties: [
      {
        id: "v-yellow-tiger-eye-bracelet-0",
        name: "friend2",
        image: "/StoneGlas/yellow-tiger-eye-bracelet/friend2.webp",
      },
      {
        id: "v-yellow-tiger-eye-bracelet-1",
        name: "tiger eye bracelet crystal bead bracelet tiger eye bracelet 8mm tiger eye tumbled bracelet gemstone",
        image:
          "/StoneGlas/yellow-tiger-eye-bracelet/tiger-eye-bracelet-crystal-bead-bracelet-tiger-eye-bracelet-8mm-tiger-eye-tumbled-bracelet-gemstone.jpeg",
      },
      {
        id: "v-yellow-tiger-eye-bracelet-2",
        name: "tiger",
        image: "/StoneGlas/yellow-tiger-eye-bracelet/tiger.avif",
      },
      {
        id: "v-yellow-tiger-eye-bracelet-3",
        name: "tiger2",
        image: "/StoneGlas/yellow-tiger-eye-bracelet/tiger2.avif",
      },
      {
        id: "v-yellow-tiger-eye-bracelet-4",
        name: "tiger3",
        image: "/StoneGlas/yellow-tiger-eye-bracelet/tiger3.avif",
      },
      {
        id: "v-yellow-tiger-eye-bracelet-5",
        name: "tiger5",
        image: "/StoneGlas/yellow-tiger-eye-bracelet/tiger5.avif",
      },
    ],
  },
];

export const BESTSELLERS = [
  PRODUCTS[0],
  PRODUCTS[1],
  PRODUCTS[2],
  PRODUCTS[PRODUCTS.length > 15 ? 15 : 0],
];
