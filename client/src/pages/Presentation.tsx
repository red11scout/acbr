import { LyricLine, PresentationPlayer, Scene } from "@/components/PresentationPlayer";

export default function Presentation() {
  // Audio Source
  const audioSrc = "/assets/rolling_with_acbr.mp3";

  // Lyrics Data (Synced EXACTLY to user provided timestamps)
  const lyrics: LyricLine[] = [
    // Intro (0:00)
    
    // Verse 1
    { time: 13, text: "Chris is rolling out with a big old grin" },
    { time: 16, text: "Jeff's got the reins and he's all in" },
    { time: 20, text: "From Buckhead towers to the midtown glow" },
    { time: 23, text: "ACBR's got the heart of the show" },

    // Pre-Chorus
    { time: 27, text: "Deals are flying, skies are blue" },
    { time: 30, text: "Atlanta dreams they're coming true" },

    // Chorus
    { time: 34, text: "We're rolling, rolling, watch us ride" },
    { time: 38, text: "Through the skyline where the stars collide" },
    { time: 41, text: "Raise a glass, let the good times flow" },
    { time: 45, text: "ACBR, let's steal the show" },

    // Instrumental Break (0:48)

    // Verse 2
    { time: 55, text: "Peachtree hustle and the deals we seal" },
    { time: 58, text: "From downtown vibes to that real estate zeal" },
    { time: 61, text: "Chris laid the path, Jeff's got the drive" },
    { time: 65, text: "Together we thrive, we keep it alive" },

    // Pre-Chorus
    { time: 68, text: "Deals are flying, skies are blue" },
    { time: 72, text: "Atlanta dreams they're coming true" },

    // Chorus
    { time: 75, text: "We're rolling, rolling, watch us ride" },
    { time: 79, text: "Through the skyline where the stars collide" },
    { time: 82, text: "Raise a glass, let the good times flow" },
    { time: 86, text: "ACBR, let's steal the show" },

    // Guitar Solo (1:35)

    // Chorus Reprise
    { time: 108, text: "We're rolling, rolling, watch us ride" },
    { time: 112, text: "Through the skyline where the stars collide" },
    { time: 115, text: "Raise a glass, let the good times flow" },
    { time: 119, text: "ACBR, let's steal the show" },

    // Instrumental Jam (2:05)

    // Bridge / Impact
    { time: 138, text: "From the Beltline to the boardroom, we're making our mark" },
    { time: 141, text: "Lighting up the city, yeah we shine in the dark" },

    // Pre-Chorus Reprise
    { time: 148, text: "Deals are flying, skies are blue" },
    { time: 152, text: "Atlanta dreams they're coming true" },

    // Final Chorus
    { time: 155, text: "We're rolling, rolling, watch us ride" },
    { time: 159, text: "Through the skyline where the stars collide" },
    { time: 162, text: "Raise a glass, let the good times flow" },
    { time: 166, text: "ACBR, let's steal the show" },

    // Outro
    { time: 175, text: "Yeah, let's steal the show!" },
    { time: 178, text: "ACBR!" },
    
    // End (3:19)
  ];

  // Scenes Data (Synced to match lyric sections and instrumental breaks)
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
    // Instrumental Break (0:48 - 0:55)
    {
      startTime: 48,
      endTime: 55,
      background: "/assets/atlanta_skyline1.jpeg",
      transition: "fade"
    },
    // Verse 2 Start (0:55 - 1:01)
    {
      startTime: 55,
      endTime: 61,
      background: "/assets/jeff_handshake.png",
      transition: "fade"
    },
    // Chris Path / Jeff Drive (1:01 - 1:05)
    {
      startTime: 61,
      endTime: 65,
      background: "/assets/chris_speaking_stage.png",
      transition: "slide"
    },
    // Together Thrive (1:05 - 1:08)
    {
      startTime: 65,
      endTime: 68,
      background: "/assets/chris_jeff_together.png",
      transition: "zoom"
    },
    // Pre-Chorus 2 (1:08 - 1:15)
    {
      startTime: 68,
      endTime: 75,
      background: "/assets/atlanta_midtown_buckhead.jpeg",
      transition: "fade"
    },
    // Chorus 2 (1:15 - 1:35)
    {
      startTime: 75,
      endTime: 95,
      background: "/assets/jeff_atlanta_skyline.png",
      transition: "slide"
    },
    // Guitar Solo Montage (1:35 - 1:48)
    {
      startTime: 95,
      endTime: 108,
      background: "/assets/chris_leadership_moment.png",
      transition: "fade"
    },
    // Chorus Reprise (1:48 - 2:05)
    {
      startTime: 108,
      endTime: 125,
      background: "/assets/jeff_award_moment.png",
      transition: "slide"
    },
    // Instrumental Jam (2:05 - 2:18)
    {
      startTime: 125,
      endTime: 138,
      background: "/assets/chris_ref3.jpg",
      transition: "zoom"
    },
    // Impact Section (2:18 - 2:28)
    {
      startTime: 138,
      endTime: 148,
      background: "/assets/jeff_ref3.jpg",
      transition: "fade"
    },
    // Pre-Chorus Reprise (2:28 - 2:35)
    {
      startTime: 148,
      endTime: 155,
      background: "/assets/atlanta_midtown_buckhead.jpeg",
      transition: "zoom"
    },
    // Final Chorus (2:35 - 2:55)
    {
      startTime: 155,
      endTime: 175,
      background: "/assets/chris_jeff_together.png",
      transition: "slide"
    },
    // Finale (2:55 - 3:19)
    {
      startTime: 175,
      endTime: 199, // End of song
      background: "#FFFFFF", // Solid White
      overlay: (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/assets/acbr_logo.png" alt="ACBR Logo" className="mb-8 h-48 w-auto" />
          <h1 className="text-5xl font-bold text-primary md:text-7xl">Thank You, Chris</h1>
          <h1 className="mt-4 text-5xl font-bold text-gray-800 md:text-7xl">Congratulations, Jeff</h1>
          <p className="mt-8 text-2xl tracking-widest text-gray-500">HERE'S TO 2026</p>
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
