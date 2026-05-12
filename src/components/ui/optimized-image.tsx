"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  fadeIn?: boolean;
  hoverEffect?: boolean;
  parallax?: boolean;
  parallaxOffset?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  quality,
  placeholder = "blur",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  style,
  onLoad,
  onError,
  fadeIn = true,
  hoverEffect = false,
  parallax = false,
  parallaxOffset = 50,
}: OptimizedImageProps) {
  // Auto-adjust quality for large images to reduce file size
  // Large images (product images, blog images) get lower quality for better compression
  const effectiveQuality = quality ?? (priority ? 85 : 80);
  
  // Ensure width and height are provided when fill is false to prevent CLS
  // Default to reasonable dimensions if not provided
  const effectiveWidth = fill ? undefined : (width || 800);
  const effectiveHeight = fill ? undefined : (height || 600);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (parallax) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [parallax]);

  useEffect(() => {
    if (priority) {
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Intersection observer for lazy loading
        if (entry.isIntersecting) {
          // Image is in view, can be loaded
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Use provided blur data URL or fallback to SVG-based blur
  const effectiveBlurDataURL = blurDataURL || createBlurDataURL(effectiveWidth || 400, effectiveHeight || 300);

  const imageElement = (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      width={effectiveWidth}
      height={effectiveHeight}
      fill={fill}
      priority={priority}
      quality={effectiveQuality}
      placeholder={placeholder}
      blurDataURL={placeholder === "blur" ? effectiveBlurDataURL : undefined}
      sizes={sizes}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      className={`transition-all duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );

  const motionProps = {
    initial: fadeIn ? { opacity: 0, scale: 0.95 } : undefined,
    animate: fadeIn ? { opacity: 1, scale: 1 } : undefined,
    transition: fadeIn ? { duration: 0.6 } : undefined,
    whileHover: hoverEffect
      ? { scale: 1.05, transition: { duration: 0.3 } }
      : undefined,
    style: parallax
      ? { y: scrollY * parallaxOffset * 0.01 }
      : undefined,
  };

  if (hasError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <motion.div {...motionProps} className="relative">
      {imageElement}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
    </motion.div>
  );
}

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  staggerDelay?: number;
  hoverEffect?: boolean;
}

export function ImageGallery({
  images,
  className = "",
  staggerDelay = 0.1,
  hoverEffect = true,
}: ImageGalleryProps) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            hoverEffect={hoverEffect}
            className="rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  );
}

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  online?: boolean;
  hoverEffect?: boolean;
  quality?: number;
}

export function Avatar({
  src,
  alt,
  size = 40,
  className = "",
  online = false,
  hoverEffect = true,
  quality = 90,
}: AvatarProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={hoverEffect ? { scale: 1.1 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        quality={quality}
        className="rounded-full object-cover border-2 border-background shadow-lg"
        placeholder="blur"
        blurDataURL={createBlurDataURL(size, size)}
      />
      {online && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
      )}
    </motion.div>
  );
}

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function Logo({
  src,
  alt,
  width = 40,
  height = 40,
  className = "",
  priority = true,
  quality = 100,
}: LogoProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      className={`object-contain ${className}`}
      placeholder="empty"
      fadeIn={false}
    />
  );
}

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  parallax?: boolean;
  overlay?: boolean;
}

export function HeroImage({
  src,
  alt,
  className = "",
  priority = true,
  quality = 90,
  parallax = true,
  overlay = false,
}: HeroImageProps) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className="object-cover"
        parallax={parallax}
        parallaxOffset={30}
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      )}
    </div>
  );
}

// Server-side safe blur data URL generation
export function createBlurDataURL(width: number, height: number): string {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>`
  ).toString("base64")}`;
} 