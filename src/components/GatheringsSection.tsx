import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, Image as ImageIcon, ChevronLeft, ChevronRight, X, Maximize2, Plus, Upload, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryPhoto {
  url: string;
  caption: string;
}

interface OutreachCommunity {
  id: string;
  title: string;
  day: string;
  location: string;
  description: string;
}

const OUTREACH_COMMUNITIES: OutreachCommunity[] = [
  {
    id: 'Badjao-Community',
    title: 'Badjao Community',
    day: 'AUGUST 2026',
    location: 'Dolho, Bato Leyte Philippines',
    description: 'Sharing God’s love through compassion, generosity, and service to the Badjao community.',
  },
  {
    id: 'Aeta-Community',
    title: 'Aeta Community Village',
    day: 'MAY 2026',
    location: 'Porac, Pampanga Philippines',
    description: 'Sharing God’s love through kindness, laughter, and simple moments of joy with the children of the Aeta community.',
  },
];

const GALLERY_STORAGE_KEY = 'cwm_outreach_gallery_user_photos_v2';

export const GatheringsSection: React.FC = () => {
  // User uploaded photos stored in localStorage per community
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, GalleryPhoto[]>>(() => {
    try {
      const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Active preview photo index per card
  const [cardPhotoIndex, setCardPhotoIndex] = useState<Record<string, number>>({
    'Badjao-Community': 0,
    'Aeta-Community': 0,
  });

  // Fullscreen Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    communityId: string;
    photoIndex: number;
  }>({
    isOpen: false,
    communityId: 'Badjao-Community',
    photoIndex: 0,
  });

  // Save to localStorage when photos update
  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(uploadedPhotos));
    } catch (err) {
      console.error('Error saving gallery photos:', err);
    }
  }, [uploadedPhotos]);

  const handleImageUpload = (communityId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1280;
          const MAX_HEIGHT = 800;
          let { width, height } = img;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedUrl = canvas.toDataURL('image/jpeg', 0.85);

            const comm = OUTREACH_COMMUNITIES.find((c) => c.id === communityId);
            setUploadedPhotos((prev) => {
              const currentList = prev[communityId] || [];
              const newPhoto: GalleryPhoto = {
                url: compressedUrl,
                caption: `${comm?.title || 'Outreach'} Photo ${currentList.length + 1}`,
              };
              const updatedList = [...currentList, newPhoto];
              const updated = { ...prev, [communityId]: updatedList };
              try {
                localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
              } catch (err) {
                console.error('Storage quota exceeded:', err);
              }
              return updated;
            });

            // Focus newly uploaded photo
            setUploadedPhotos((prev) => {
              const count = (prev[communityId] || []).length;
              setCardPhotoIndex((cPrev) => ({ ...cPrev, [communityId]: Math.max(0, count - 1) }));
              return prev;
            });
          }
        };
        if (event.target?.result) {
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const triggerUpload = (communityId: string) => {
    fileInputRefs.current[communityId]?.click();
  };

  const openLightbox = (communityId: string, index: number) => {
    const photos = uploadedPhotos[communityId] || [];
    if (photos.length === 0) {
      triggerUpload(communityId);
      return;
    }
    setLightbox({
      isOpen: true,
      communityId,
      photoIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const nextPhoto = useCallback(() => {
    setLightbox((prev) => {
      const photos = uploadedPhotos[prev.communityId] || [];
      if (photos.length === 0) return prev;
      return {
        ...prev,
        photoIndex: (prev.photoIndex + 1) % photos.length,
      };
    });
  }, [uploadedPhotos]);

  const prevPhoto = useCallback(() => {
    setLightbox((prev) => {
      const photos = uploadedPhotos[prev.communityId] || [];
      if (photos.length === 0) return prev;
      return {
        ...prev,
        photoIndex: (prev.photoIndex - 1 + photos.length) % photos.length,
      };
    });
  }, [uploadedPhotos]);

  // Keyboard navigation for fullscreen viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, nextPhoto, prevPhoto]);

  const currentCommunity = OUTREACH_COMMUNITIES.find((c) => c.id === lightbox.communityId) || OUTREACH_COMMUNITIES[0];
  const allCurrentPhotos = uploadedPhotos[lightbox.communityId] || [];
  const currentPhoto = allCurrentPhotos[lightbox.photoIndex] || allCurrentPhotos[0];

  return (
    <section id="visit" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060D1A] via-[#09152b] to-[#060D1A] border-t border-blue-900/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif-elegant font-semibold tracking-[0.3em] text-amber-400 uppercase">
            Community Impact &amp; Mission Field
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
            OUTREACH GALLERY
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light">
            Documenting God's grace in action across our communities. Click on the spaces below to upload your outreach photos.
          </p>
        </div>

        {/* 2 Main Community Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {OUTREACH_COMMUNITIES.map((community, idx) => {
            const communityPhotos = uploadedPhotos[community.id] || [];
            const hasPhotos = communityPhotos.length > 0;
            const activeIdx = Math.min(cardPhotoIndex[community.id] ?? 0, Math.max(0, communityPhotos.length - 1));
            const activePhoto = communityPhotos[activeIdx];

            return (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#112448]/85 to-[#081326]/95 border border-slate-700/80 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] group"
              >
                <div>
                  {/* Photo Space / Upload Section */}
                  {hasPhotos && activePhoto ? (
                    <div
                      onClick={() => openLightbox(community.id, activeIdx)}
                      className="relative mb-4 rounded-2xl overflow-hidden border border-amber-400/40 bg-[#050C17] shadow-xl aspect-video cursor-pointer group/mainphoto"
                    >
                      <img
                        src={activePhoto.url}
                        alt={activePhoto.caption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/mainphoto:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                      {/* Top Date Badge */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-950/85 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md">
                          {community.day}
                        </span>
                      </div>

                      {/* Center Fullscreen Indicator Pill */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mainphoto:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-200 to-yellow-400 shadow-2xl scale-95 group-hover/mainphoto:scale-100 transition-transform">
                          <Maximize2 className="w-4 h-4" />
                          <span>View Full Screen</span>
                        </span>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-200">
                        <p className="truncate pr-2 font-light text-slate-300">
                          {activePhoto.caption}
                        </p>
                        <span className="text-amber-300 shrink-0 flex items-center gap-1 font-mono text-[11px]">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {activeIdx + 1}/{communityPhotos.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Initial Clean Upload Space when no photo uploaded yet */
                    <div
                      onClick={() => triggerUpload(community.id)}
                      className="relative mb-4 rounded-2xl border-2 border-dashed border-amber-400/40 hover:border-amber-300 bg-[#08152c]/70 hover:bg-[#0d2247] p-8 aspect-video flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group/empty shadow-inner"
                    >
                      {/* Top Date Badge */}
                      <div className="absolute top-3.5 left-3.5 pointer-events-none">
                        <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-950/85 text-amber-300 border border-amber-400/40">
                          {community.day}
                        </span>
                      </div>

                      <div className="p-4 rounded-full bg-amber-400/10 group-hover/empty:bg-amber-400/20 border border-amber-400/30 text-amber-300 transition-all duration-300 group-hover/empty:scale-110 mb-3 shadow-md">
                        <Camera className="w-7 h-7 text-amber-300" />
                      </div>

                      <h4 className="font-serif-elegant font-bold text-base text-white mb-1">
                        Upload Outreach Photo
                      </h4>
                      <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                        Click here to select and upload your photo for {community.title}
                      </p>
                    </div>
                  )}

                  {/* Thumbnail Row with Upload Slot if photos exist */}
                  {hasPhotos && (
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {communityPhotos.map((photo, pIdx) => {
                        const isSelected = activeIdx === pIdx;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => {
                              setCardPhotoIndex((prev) => ({ ...prev, [community.id]: pIdx }));
                            }}
                            className={`relative rounded-xl overflow-hidden aspect-video border transition-all duration-200 group/thumb ${
                              isSelected
                                ? 'border-amber-400 ring-2 ring-amber-400/40 scale-[1.02]'
                                : 'border-slate-700/80 hover:border-amber-400/50 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                            )}
                          </button>
                        );
                      })}

                      {/* Additional Upload Picture Slot */}
                      <button
                        type="button"
                        onClick={() => triggerUpload(community.id)}
                        className="relative rounded-xl aspect-video border-2 border-dashed border-amber-400/50 hover:border-amber-300 bg-[#08152c]/80 hover:bg-[#0d2247] flex flex-col items-center justify-center gap-1 text-amber-300 hover:text-amber-200 transition-all duration-200 group/uploadslot shadow-inner"
                        title="Upload More Photos"
                      >
                        <Upload className="w-4 h-4 text-amber-400 group-hover/uploadslot:scale-110 transition-transform" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                          + Add Photo
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Hidden Native File Input */}
                  <input
                    type="file"
                    ref={(el) => { fileInputRefs.current[community.id] = el; }}
                    onChange={(e) => handleImageUpload(community.id, e)}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />

                  {/* Community Title */}
                  <div className="mb-2">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {community.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {community.description}
                  </p>

                  {/* Location Info */}
                  <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{community.location}</span>
                  </div>
                </div>

                {/* Actions: View Gallery & Upload Space Button */}
                <div className="pt-5 mt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  {hasPhotos && (
                    <button
                      type="button"
                      onClick={() => openLightbox(community.id, activeIdx)}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase text-slate-200 bg-[#06101f] hover:bg-amber-400/20 hover:text-amber-200 border border-slate-700 hover:border-amber-400/50 transition-all duration-200 shadow-sm"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Gallery ({communityPhotos.length})</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => triggerUpload(community.id)}
                    className={`${hasPhotos ? 'w-full sm:w-auto' : 'w-full'} flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 hover:from-white hover:to-amber-200 transition-all duration-200 shadow-md font-sans shrink-0 hover:scale-[1.02]`}
                  >
                    <Plus className="w-4 h-4 text-slate-950" />
                    <span>{hasPhotos ? 'Add Photo' : 'Upload Picture'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Fullscreen Center Lightbox Modal */}
      <AnimatePresence>
        {lightbox.isOpen && allCurrentPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="w-full flex items-center justify-between mb-3 text-white">
                <div>
                  <span className="text-xs font-serif-elegant font-semibold text-amber-400 tracking-widest uppercase">
                    {currentCommunity.day} · {currentCommunity.location}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {currentCommunity.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-amber-300/80 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-400/30">
                    {lightbox.photoIndex + 1} / {allCurrentPhotos.length}
                  </span>
                  <button
                    onClick={closeLightbox}
                    className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-lg"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Center Stage with Navigation Arrows */}
              <div className="relative w-full flex items-center justify-center rounded-2xl overflow-hidden border border-amber-400/30 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-video max-h-[68vh]">
                <AnimatePresence mode="wait">
                  {currentPhoto && (
                    <motion.img
                      key={`${currentCommunity.id}-${lightbox.photoIndex}`}
                      src={currentPhoto.url}
                      alt={currentPhoto.caption}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain select-none"
                    />
                  )}
                </AnimatePresence>

                {/* Left Arrow Button */}
                {allCurrentPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-950/80 hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-amber-300 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {allCurrentPhotos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-950/80 hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-amber-300 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Lightbox Footer Caption & Thumbnails */}
              <div className="w-full mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="text-sm text-slate-300 font-light max-w-xl">
                  {currentPhoto?.caption}
                </p>

                {/* Bottom Thumbnails */}
                {allCurrentPhotos.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                    {allCurrentPhotos.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightbox((prev) => ({ ...prev, photoIndex: idx }))}
                        className={`relative w-14 h-9 rounded-lg overflow-hidden border transition-all shrink-0 ${
                          lightbox.photoIndex === idx
                            ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                            : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
