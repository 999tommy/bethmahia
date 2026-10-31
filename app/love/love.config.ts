// ============================================================
// love.config.ts — All personal content lives here.
// Edit this file to personalise the experience.
// Zero component code needs to change.
// ============================================================

export const loveConfig = {
  // ── Identity ──────────────────────────────────────────────
  herName: "Bethany",
  herNickname: "Bebe",
  herInitial: "B",
  myInitial: "T",
  myName: "Tommy",

  // ── Secret Gate ───────────────────────────────────────────
  secretQuestion: "On what date did everything begin?",
  secretHint: "DDMMYYYY · the day I asked",
  secretAnswer: "13052024", // 13th May 2024

  // ── Key Dates & Places ────────────────────────────────────
  anniversaryDate: "13th May 2024",
  timelineDates: [
    {
      id: "marvnook",
      label: "Marv Nook",
      date: "November 2024",
      caption: "The first date.",
      photo: "IMG_0511.jpeg",
      emoji: "🌿",
    },
    {
      id: "lagos-tacos",
      label: "Lagos · Tacos & Boba",
      date: "December 2025",
      caption:
        "You didn't even like the boba tea and I loved you for it — so I drank yours too.",
      photo: "IMG_7317.jpeg",
      emoji: "🌮",
    },
    {
      id: "cinema",
      label: "Spaghetti, Burrito & Michael",
      date: "2025",
      caption:
        "The cinema. The movie. Your hand in mine. That feeling I couldn't name but didn't want to let go of.",
      photo: "ac89a02c-b009-4a13-baed-9f738adcac13.jpeg",
      emoji: "🎬",
    },
    {
      id: "beginning",
      label: "The Beginning",
      date: "13th May 2024",
      caption: "The day I asked and the world rearranged itself around you.",
      photo: "beth.jpeg",
      emoji: "💌",
    },
  ],

  // ── Photos (filenames in /public) ─────────────────────────
  // First photo is used as the "hero" in the polaroid gallery
  photos: [
    "beth.jpeg",
    "IMG_0511.jpeg",
    "IMG_7317.jpeg",
    "ac89a02c-b009-4a13-baed-9f738adcac13.jpeg",
    "b2a157f7-9b89-4068-a242-9c6894219cdf.jpeg",
    "daf5897d-f92d-425b-b122-dcfa2d9e9da0.jpeg",
  ],

  // ── Videos ────────────────────────────────────────────────
  videos: [
    "879a0b01-ef13-46d5-8e77-1c585f74eb48.mov",
    "f1fe17ab-024d-4f9c-9f4d-8c6aea10351a.mov",
    "E468900F-529A-4EB2-896B-17C5BD6167D2.mp4",
  ],

  // ── Favourite flower ──────────────────────────────────────
  favouriteFlower: "rose",
  flowerColour: "#E8B4B8",
  flowerAccent: "#C8868E",

  // ── The Letter (KJV-style romantic poem) ──────────────────
  letterLines: [
    { text: "My Dearest Bethany,", style: "salutation" },
    { text: "", style: "spacer" },
    {
      text: "Hearken, O my heart, for it overfloweth with words",
      style: "verse",
    },
    {
      text: "that no tongue hath yet been worthy to speak.",
      style: "verse-indent",
    },
    {
      text: "As the rose doth turn her face unto the morning sun,",
      style: "verse",
    },
    {
      text: "so do I turn mine eyes unto thee — and find I cannot look away.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "Thou art the quietness after the storm,",
      style: "verse",
    },
    {
      text: "the warmth of bread at the end of a long road,",
      style: "verse-indent",
    },
    {
      text: "the letter I did not know I was waiting for.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "In the pouting of thy lips is a poem.",
      style: "verse",
    },
    {
      text: "In the warmth of thy embrace, a country I would dwell in forever.",
      style: "verse-indent",
    },
    {
      text: "When thou dost rest upon my chest,",
      style: "verse",
    },
    {
      text: "I understand why the earth holdeth still —",
      style: "verse-indent",
    },
    {
      text: "that it too might listen.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "I have looked into thine eyes and seen eternity play there,",
      style: "verse",
    },
    {
      text: "a deep and laughing and tender eternity.",
      style: "verse-indent",
    },
    {
      text: "Thy smile is a mercy. Thy laughter, a benediction.",
      style: "verse",
    },
    {
      text: "The way thou callest my name — it maketh me new each time.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "Thy cooking is a love letter written in warmth and flavour.",
      style: "verse",
    },
    {
      text: "Thy patience is a grace I did not earn.",
      style: "verse",
    },
    {
      text: "Thy neatness, thy care for those around thee,",
      style: "verse",
    },
    {
      text: "thy knowing of me before I have even spoken —",
      style: "verse-indent",
    },
    {
      text: "these things have undone me, softly and completely.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "Thou art pure and good and quietly magnificent.",
      style: "verse",
    },
    {
      text: "Thou thinkest of me every day — and I thee, without ceasing.",
      style: "verse",
    },
    {
      text: "Thou sendest goodnight videos as though thou wouldst not rest",
      style: "verse",
    },
    {
      text: "without leaving a piece of thyself with me.",
      style: "verse-indent",
    },
    { text: "", style: "spacer" },
    {
      text: "This is love, Bethany. Ours. Unlike any written before.",
      style: "verse-emphasis",
    },
    { text: "", style: "spacer" },
    { text: "Ever and wholly thine,", style: "closing" },
    { text: "— T", style: "signature" },
  ],

  // ── Ink Blot Easter Eggs (clickable hidden phrases) ───────
  inkBlots: [
    "...the way your porridge tastes like Sunday mornings.",
    "...how impossibly cute you are when you are annoyed.",
    "...that you accept my goofiness as though it were a gift.",
  ],

  // ── 31 Reasons I Love You ─────────────────────────────────
  reasons: [
    "The way your lips find their pout — as though the whole world ought to pause and notice.",
    "Your kisses. Each one a small miracle I did not deserve.",
    "The way you cook — every meal a love letter, every dish a piece of your heart.",
    "Your porridge on a quiet morning — warm and simple and perfect, like you.",
    "The way your hugs close around me like a sentence that finally makes sense.",
    "When you rest your head on my chest and the whole world goes quiet.",
    "Your eyes. I could spend a lifetime in them and call it well-spent.",
    "Every picture you send me — as though you're saying: I thought of you.",
    "How you look when you know you look incredible.",
    "The way you say my name. No one else says it like that.",
    "Your smile. It has its own gravity and I am happily lost in it.",
    "The softness of kissing you — I still forget to breathe.",
    "How tightly I hold you and still feel it isn't close enough.",
    "How adorable you are when you're annoyed. Your whole face becomes a poem.",
    "The way you make me feel — whole, wanted, known.",
    "Your purity. It is a rare and beautiful thing to find in this world.",
    "How neat and particular you are about the world around you.",
    "The way you smell — like something I never want to forget.",
    "That you know me — the real me — and you stayed.",
    "That you understand me without a translation.",
    "That you accept my goofiness as if it were a gift and not a warning.",
    "That you make the heavy days lighter just by being there.",
    "That you send goodnight videos — proof you want me to sleep knowing I am loved.",
    "That I am on your mind every day as you are constantly on mine.",
    "Your patience. It is something I am still learning to deserve.",
    "How deeply you care for the people around you.",
    "The sweet names you call me — each one warmer than the last.",
    "That you crave me. That alone makes me feel like enough.",
    "Every single gift you have ever given me. You are the most thoughtful person I have ever known.",
    "That we complement each other so completely it sometimes frightens me.",
    "That we both want to be better — for each other, and together.",
  ],

  // ── Scrapbook Stickers ────────────────────────────────────
  // Each sticker has an id, label, and isHidden (easter egg)
  stickers: [
    { id: "rose", label: "Her favourite 🌹", isHidden: false },
    { id: "boba", label: "Boba tea 🧋", isHidden: false },
    { id: "ticket", label: "Michael · Cinema 🎬", isHidden: false },
    { id: "taco", label: "Taco date 🌮", isHidden: false },
    { id: "washi", label: "13.05.2024", isHidden: false },
    { id: "stamp", label: "Sent with love 💌", isHidden: false },
    { id: "icecream", label: "Ice cream 🍦", isHidden: false },
    { id: "quill", label: "Written with a quill 🪶", isHidden: false },
    { id: "heart", label: "You + me ♡", isHidden: false },
    { id: "secret1", label: "🌸", isHidden: true },
    { id: "secret2", label: "✨", isHidden: true },
    { id: "secret3", label: "💫", isHidden: true },
  ],

  // ── Final Message ─────────────────────────────────────────
  finalMessage: [
    "I did not build this for anyone who would stumble upon it.",
    "I built it for you.",
    "Only you.",
    "",
    "Thank you for all you do, my Bethany.",
    "— T, yours. Always.",
  ],
};

export type LoveConfig = typeof loveConfig;

