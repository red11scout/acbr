import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import { Loader2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Types for our presentation data
export interface LyricLine {
  time: number;
  text: string;
  duration?: number;
}

export interface Scene {
  startTime: number;
  endTime: number;
  background: string; // Image URL or color
  overlay?: React.ReactNode;
  transition?: "fade" | "slide" | "zoom";
}

interface PresentationPlayerProps {
  audioSrc: string;
  lyrics: LyricLine[];
  scenes: Scene[];
  onComplete?: () => void;
}

export function PresentationPlayer({ audioSrc, lyrics, scenes, onComplete }: PresentationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const soundRef = useRef<Howl | null>(null);
  const requestRef = useRef<number | undefined>(undefined);
  
  // Initialize audio
  useEffect(() => {
    const sound = new Howl({
      src: [audioSrc],
      html5: true, // Force HTML5 Audio to stream large files
      onload: () => {
        setDuration(sound.duration());
        setIsLoaded(true);
      },
      onend: () => {
        setIsPlaying(false);
        if (onComplete) onComplete();
      },
      onplay: () => {
        setIsPlaying(true);
        requestRef.current = requestAnimationFrame(updateTime);
      },
      onpause: () => {
        setIsPlaying(false);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      }
    });

    soundRef.current = sound;

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      sound.unload();
    };
  }, [audioSrc]);

  const updateTime = () => {
    if (soundRef.current && soundRef.current.playing()) {
      setCurrentTime(soundRef.current.seek());
      requestRef.current = requestAnimationFrame(updateTime);
    }
  };

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (!hasStarted) {
      setHasStarted(true);
    }

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!soundRef.current) return;
    soundRef.current.mute(!isMuted);
    setIsMuted(!isMuted);
  };

  const restart = () => {
    if (!soundRef.current) return;
    soundRef.current.stop();
    soundRef.current.play();
  };

  // Find current scene and lyrics
  const currentScene = scenes.find(
    (scene) => currentTime >= scene.startTime && currentTime < scene.endTime
  ) || scenes[scenes.length - 1]; // Fallback to last scene if needed

  const currentLyricIndex = lyrics.findIndex(
    (line, index) => 
      currentTime >= line.time && 
      (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
  );
  
  const currentLyric = currentLyricIndex !== -1 ? lyrics[currentLyricIndex] : null;

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-primary">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="text-xl font-semibold tracking-widest">LOADING EXPERIENCE...</p>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white text-foreground">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gray-400 blur-[100px]" />
        </div>

        <div className="z-10 flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img src="/assets/acbr_logo.png" alt="ACBR Logo" className="mb-6 h-32 w-auto md:h-40" />
            <h2 className="text-2xl font-light tracking-widest text-gray-600 md:text-3xl">LEADERSHIP CELEBRATION</h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              onClick={togglePlay}
              className="group relative h-20 w-20 rounded-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-lg"
            >
              <Play className="h-8 w-8 fill-current transition-transform group-hover:scale-110" />
              <span className="absolute -inset-1 animate-ping rounded-full bg-primary opacity-20" />
            </Button>
          </motion.div>
          
          <p className="text-sm text-gray-500">Click to start the experience</p>
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
      
      {/* Floating Particles Effect (Simplified) */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/40 blur-[1px]"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%", 
              opacity: 0 
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}
