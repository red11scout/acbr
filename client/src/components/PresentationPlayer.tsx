import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import { Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SparkleDust } from "./SparkleDust";

// Types for our presentation data
export interface LyricLine {
  time: number;
  text: string;
  duration?: number;
}

export interface Scene {
  startTime: number;
  endTime: number;
  background: string; // URL or hex color
  overlay?: React.ReactNode;
  transition?: "fade" | "slide" | "zoom";
}

interface PresentationPlayerProps {
  audioSrc: string;
  lyrics: LyricLine[];
  scenes: Scene[];
}

export default function PresentationPlayer({ audioSrc, lyrics, scenes }: PresentationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  
  const soundRef = useRef<Howl | null>(null);
  const requestRef = useRef<number | undefined>(undefined);

  // Initialize Howler
  useEffect(() => {
    soundRef.current = new Howl({
      src: [audioSrc],
      html5: true,
      onload: () => {
        setDuration(soundRef.current?.duration() || 0);
        setIsLoading(false);
      },
      onend: () => {
        setIsPlaying(false);
        cancelAnimationFrame(requestRef.current!);
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [audioSrc]);

  // Animation Loop for smooth progress
  const animate = () => {
    if (soundRef.current && soundRef.current.playing()) {
      setCurrentTime(soundRef.current.seek());
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      soundRef.current?.play();
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      soundRef.current?.pause();
    } else {
      soundRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (soundRef.current) {
      soundRef.current.mute(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Find current scene and lyric
  const currentScene = scenes.find(
    s => currentTime >= s.startTime && currentTime < s.endTime
  );

  const currentLyric = lyrics.find(
    (l, i) => {
      const nextLyric = lyrics[i + 1];
      const endTime = nextLyric ? nextLyric.time : (l.duration ? l.time + l.duration : l.time + 4);
      return currentTime >= l.time && currentTime < endTime;
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/atlanta_sunset_intro.png" 
            alt="Atlanta Sunset" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <SparkleDust />
        </div>

        <div className="z-10 flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <img src="/assets/acbr_logo.png" alt="ACBR Logo" className="h-32 w-auto md:h-40 drop-shadow-2xl" />
            </div>
            <h2 className="text-2xl font-light tracking-widest text-white drop-shadow-lg md:text-3xl">LEADERSHIP CELEBRATION</h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              onClick={togglePlay}
              className="group relative h-20 w-20 rounded-full border-2 border-white bg-white/20 text-white hover:bg-white hover:text-primary shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-md"
            >
              <Play className="h-8 w-8 fill-current transition-transform group-hover:scale-110" />
              <span className="absolute -inset-1 animate-ping rounded-full bg-white opacity-20" />
            </Button>
          </motion.div>
          
          <p className="text-sm font-medium text-white/80 drop-shadow-md">Click to start the experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Scene Renderer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene?.startTime}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {currentScene?.background.startsWith('#') ? (
            <div className="h-full w-full" style={{ backgroundColor: currentScene.background }} />
          ) : (
            <>
              <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for readability */}
              <img 
                src={currentScene?.background} 
                alt="Scene Background" 
                className="h-full w-full object-cover"
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sparkle Dust Animation Layer */}
      <SparkleDust />

      {/* Persistent Subtle Logo - Top Left */}
      <div className="absolute top-6 left-6 z-20 opacity-80 hover:opacity-100 transition-opacity duration-300">
        <div className="p-2">
          <img src="/assets/acbr_logo.png" alt="ACBR" className="h-10 w-auto drop-shadow-md" />
        </div>
      </div>

      {/* Custom Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {currentScene?.overlay && (
            <motion.div
              key={`overlay-${currentScene.startTime}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-6xl"
            >
              {currentScene.overlay}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lyrics Display - Lower Third */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center px-4 text-center">
        <AnimatePresence mode="wait">
          {currentLyric && (
            <motion.div
              key={currentLyric.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl rounded-xl bg-white/90 px-8 py-4 backdrop-blur-md shadow-xl border border-gray-200"
            >
              <p className="font-sans text-2xl font-bold leading-relaxed text-gray-900 md:text-4xl">
                {currentLyric.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls & Progress */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-6">
        <div className="container mx-auto flex flex-col gap-2">
          {/* Progress Bar */}
          <div 
            className="relative h-1 w-full cursor-pointer overflow-hidden rounded-full bg-gray-200"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              if (soundRef.current) {
                soundRef.current.seek(percent * duration);
              }
            }}
          >
            <motion.div 
              className="absolute bottom-0 left-0 top-0 bg-primary"
              style={{ width: `${(currentTime / duration) * 100}%` }}
              layoutId="progress"
            />
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between text-gray-700">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={togglePlay} className="hover:bg-gray-100 hover:text-primary">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <span className="text-sm font-medium tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="hover:bg-gray-100 hover:text-primary">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={restart} className="hover:bg-gray-100 hover:text-primary">
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
