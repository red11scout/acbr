import { LyricLine, PresentationPlayer, Scene } from "@/components/PresentationPlayer";

export default function Presentation() {
  // Audio Source
  const audioSrc = "/assets/rolling_with_acbr.mp3";

  // Lyrics Data (Synced to 3:19 song)
  const lyrics: LyricLine[] = [
    // Intro (0:00 - 0:13) - Instrumental
    
    // Verse 1 (0:13 - 0:27)
    { time: 13, text: "Chris is rollin' out with a big ol' grin" },
    { time: 16, text: "Jeff's got the reins and he's all in" },
    { time: 20, text: "From Buckhead towers to the Midtown glow" },
    { time: 23, text: "ACBR's got the heart of the show" },

    // Pre-Chorus (0:27 - 0:34)
    { time: 27, text: "Deals are flyin'" },
    { time: 29, text: "Skies are blue" },
    { time: 31, text: "Atlanta dreams" },
    { time: 33, text: "They're comin' true" },

    // Chorus (0:34 - 0:48)
    { time: 34, text: "We're rollin'" },
    { time: 36, text: "Rollin'" },
    { time: 38, text: "Watch us ride" },
    { time: 40, text: "Through the skyline where the stars collide" },
    { time: 43, text: "Raise a glass" },
    { time: 45, text: "Let the good times flow" },
    { time: 46, text: "ACBR" },
    { time: 47, text: "Let's steal the show" },

    // Verse 2 (0:48 - 1:08)
    { time: 48, text: "Peachtree hustle and the deals we seal" },
    { time: 52, text: "From Downtown vibes to that real estate zeal" },
    { time: 56, text: "Chris laid the path" },
    { time: 58, text: "Jeff's got the drive" },
    { time: 61, text: "Together we thrive" },
    { time: 65, text: "We keep it alive" },

    // Pre-Chorus (1:08 - 1:15)
    { time: 68, text: "Deals are flyin'" },
    { time: 70, text: "Skies are blue" },
    { time: 72, text: "Atlanta dreams" },
    { time: 74, text: "They're comin' true" },

    // Chorus (1:15 - 1:35)
    { time: 75, text: "We're rollin'" },
    { time: 77, text: "Rollin'" },
    { time: 79, text: "Watch us ride" },
    { time: 81, text: "Through the skyline where the stars collide" },
    { time: 84, text: "Raise a glass" },
    { time: 86, text: "Let the good times flow" },
    { time: 87, text: "ACBR" },
    { time: 88, text: "Let's steal the show" },

    // Guitar Solo / Bridge (1:35 - 2:18)
    // Visual montage section

    // Verse 3 / Impact (2:18 - 2:34)
    { time: 138, text: "Beltline to boardroom" },
    { time: 142, text: "Lighting up the city" },
    { time: 146, text: "Deals flying again" },
    
    // Final Chorus Build (2:34 - 2:55)
    { time: 154, text: "ACBR, let's steal the show" },
    
    // Outro (2:55 - 3:19)
    { time: 175, text: "Yeah, let's steal the show!" },
    { time: 178, text: "ACBR!" },
    { time: 185, text: "Thank You, Chris — Congratulations, Jeff" },
    { time: 190, text: "Here's to 2026!" }
  ];

  // Scenes Data (Synced to 3:19 song)
  const scenes: Scene[] = [
    // Intro (0:00 - 0:13)
    {
      startTime: 0,
      endTime: 13,
      background: "/assets/atlanta_skyline1.jpeg",
      overlay: (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/assets/acbr_logo.png" alt="ACBR Logo" className="mb-8 h-32 w-auto animate-pulse md:h-48" />
          <h1 className="text-4xl font-bold text-white drop-shadow-lg md:text-6xl">Celebrating Leadership</h1>
          <h2 className="mt-4 text-2xl font-light text-primary md:text-4xl">Celebrating Atlanta</h2>
        </div>
      )
    },
    // Chris Intro (0:13 - 0:16)
    {
      startTime: 13,
      endTime: 16,
      background: "/assets/chris_smiling_confident.png",
      transition: "slide"
    },
    // Jeff Intro (0:16 - 0:20)
    {
      startTime: 16,
      endTime: 20,
      background: "/assets/jeff_stepping_forward.png",
      transition: "slide"
    },
    // Buckhead/Midtown (0:20 - 0:23)
    {
      startTime: 20,
      endTime: 23,
      background: "/assets/atlanta_midtown_buckhead.jpeg",
      transition: "zoom"
    },
    // ACBR Heart (0:23 - 0:27)
    {
      startTime: 23,
      endTime: 27,
      background: "/assets/chris_collaborating.png",
      transition: "fade"
    },
    // Momentum (0:27 - 0:34)
    {
      startTime: 27,
      endTime: 34,
      background: "/assets/mercedes_benz_stadium.jpg",
      transition: "zoom"
    },
    // Chorus Start (0:34 - 0:48)
    {
      startTime: 34,
      endTime: 48,
      background: "/assets/chris_atlanta_skyline.png",
      transition: "slide"
    },
    // Verse 2 Start (0:48 - 0:56)
    {
      startTime: 48,
      endTime: 56,
      background: "/assets/jeff_handshake.png",
      transition: "fade"
    },
    // Chris Path (0:56 - 0:58)
    {
      startTime: 56,
      endTime: 58,
      background: "/assets/chris_speaking_stage.png",
      transition: "slide"
    },
    // Jeff Drive (0:58 - 1:01)
    {
      startTime: 58,
      endTime: 61,
      background: "/assets/jeff_future_leadership.png",
      transition: "slide"
    },
    // Together Thrive (1:01 - 1:08)
    {
      startTime: 61,
      endTime: 68,
      background: "/assets/chris_jeff_together.png",
      transition: "zoom"
    },
    // Pre-Chorus 2 (1:08 - 1:15)
    {
      startTime: 68,
      endTime: 75,
      background: "/assets/atlanta_skyline1.jpeg",
      transition: "fade"
    },
    // Chorus 2 (1:15 - 1:35)
    {
      startTime: 75,
      endTime: 95,
      background: "/assets/jeff_atlanta_skyline.png",
      transition: "slide"
    },
    // Guitar Solo Montage (1:35 - 2:18)
    {
      startTime: 95,
      endTime: 105,
      background: "/assets/chris_leadership_moment.png",
      transition: "fade"
    },
    {
      startTime: 105,
      endTime: 115,
      background: "/assets/jeff_award_moment.png",
      transition: "slide"
    },
    {
      startTime: 115,
      endTime: 125,
      background: "/assets/chris_ref3.jpg",
      transition: "zoom"
    },
    {
      startTime: 125,
      endTime: 138,
      background: "/assets/jeff_ref3.jpg",
      transition: "fade"
    },
    // Impact Section (2:18 - 2:55)
    {
      startTime: 138,
      endTime: 154,
      background: "/assets/atlanta_midtown_buckhead.jpeg",
      transition: "zoom"
    },
    {
      startTime: 154,
      endTime: 175,
      background: "/assets/chris_jeff_together.png",
      transition: "slide"
    },
    // Finale (2:55 - 3:19)
    {
      startTime: 175,
      endTime: 199, // End of song
      background: "#0C2340", // Solid Navy
      overlay: (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/assets/acbr_logo.png" alt="ACBR Logo" className="mb-8 h-48 w-auto" />
          <h1 className="text-5xl font-bold text-primary md:text-7xl">Thank You, Chris</h1>
          <h1 className="mt-4 text-5xl font-bold text-white md:text-7xl">Congratulations, Jeff</h1>
          <p className="mt-8 text-2xl tracking-widest text-white/80">HERE'S TO 2026</p>
        </div>
      )
    }
  ];

  return (
    <PresentationPlayer 
      audioSrc={audioSrc}
      lyrics={lyrics}
      scenes={scenes}
    />
  );
}
