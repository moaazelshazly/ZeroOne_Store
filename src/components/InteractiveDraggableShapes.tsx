import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Plus, Sparkles, X } from 'lucide-react';

export type ShapeType = 'triangle' | 'circle' | 'cross' | 'square';

export interface DraggableShapeData {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  rotation: number;
  isDragging?: boolean;
}

const SHAPE_CONFIG: Record<
  ShapeType,
  { label: string; color: string; glowColor: string; symbol: string }
> = {
  triangle: {
    label: 'Triangle',
    color: '#22D3EE',
    glowColor: 'rgba(34, 211, 238, 0.7)',
    symbol: '△',
  },
  circle: {
    label: 'Circle',
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.7)',
    symbol: '○',
  },
  cross: {
    label: 'Cross',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.7)',
    symbol: '✕',
  },
  square: {
    label: 'Square',
    color: '#E879F9',
    glowColor: 'rgba(232, 121, 249, 0.7)',
    symbol: '□',
  },
};

const ShapeSVG = ({
  type,
  size,
  color,
  glowColor,
  isDragging,
}: {
  type: ShapeType;
  size: number;
  color: string;
  glowColor: string;
  isDragging?: boolean;
}) => {
  const strokeWidth = isDragging ? 3.5 : 2.8;

  switch (type) {
    case 'triangle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: isDragging
              ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 28px ${glowColor})`
              : `drop-shadow(0 0 8px ${glowColor})`,
          }}
          className="transition-all duration-150"
        >
          <polygon points="12 3 22 20 2 20" />
        </svg>
      );
    case 'circle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: isDragging
              ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 28px ${glowColor})`
              : `drop-shadow(0 0 8px ${glowColor})`,
          }}
          className="transition-all duration-150"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'cross':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: isDragging
              ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 28px ${glowColor})`
              : `drop-shadow(0 0 8px ${glowColor})`,
          }}
          className="transition-all duration-150"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'square':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: isDragging
              ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 28px ${glowColor})`
              : `drop-shadow(0 0 8px ${glowColor})`,
          }}
          className="transition-all duration-150"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
  }
};

const getDefaultShapes = (width: number, height: number): DraggableShapeData[] => {
  const safeW = Math.max(width, 360);
  const safeH = Math.max(height, 500);

  return [
    {
      id: 'shape-1',
      type: 'triangle',
      x: safeW * 0.08,
      y: Math.min(safeH * 0.16, 120),
      size: 40,
      color: SHAPE_CONFIG.triangle.color,
      glowColor: SHAPE_CONFIG.triangle.glowColor,
      rotation: 0,
    },
    {
      id: 'shape-2',
      type: 'circle',
      x: safeW * 0.85,
      y: Math.min(safeH * 0.2, 150),
      size: 38,
      color: SHAPE_CONFIG.circle.color,
      glowColor: SHAPE_CONFIG.circle.glowColor,
      rotation: 0,
    },
    {
      id: 'shape-3',
      type: 'cross',
      x: safeW * 0.9,
      y: Math.min(safeH * 0.42, 300),
      size: 44,
      color: SHAPE_CONFIG.cross.color,
      glowColor: SHAPE_CONFIG.cross.glowColor,
      rotation: 0,
    },
    {
      id: 'shape-4',
      type: 'square',
      x: safeW * 0.06,
      y: Math.min(safeH * 0.45, 320),
      size: 36,
      color: SHAPE_CONFIG.square.color,
      glowColor: SHAPE_CONFIG.square.glowColor,
      rotation: 0,
    },
    {
      id: 'shape-5',
      type: 'triangle',
      x: safeW * 0.78,
      y: Math.min(safeH * 0.65, 480),
      size: 32,
      color: SHAPE_CONFIG.triangle.color,
      glowColor: SHAPE_CONFIG.triangle.glowColor,
      rotation: 15,
    },
    {
      id: 'shape-6',
      type: 'circle',
      x: safeW * 0.14,
      y: Math.min(safeH * 0.72, 520),
      size: 30,
      color: SHAPE_CONFIG.circle.color,
      glowColor: SHAPE_CONFIG.circle.glowColor,
      rotation: 0,
    },
    {
      id: 'shape-7',
      type: 'cross',
      x: safeW * 0.52,
      y: Math.min(safeH * 0.12, 90),
      size: 28,
      color: SHAPE_CONFIG.cross.color,
      glowColor: SHAPE_CONFIG.cross.glowColor,
      rotation: 10,
    },
    {
      id: 'shape-8',
      type: 'square',
      x: safeW * 0.68,
      y: Math.min(safeH * 0.32, 230),
      size: 34,
      color: SHAPE_CONFIG.square.color,
      glowColor: SHAPE_CONFIG.square.glowColor,
      rotation: -8,
    },
  ];
};

export const InteractiveDraggableShapes: React.FC = () => {
  const [shapes, setShapes] = useState<DraggableShapeData[]>([]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [toolbarOpen, setToolbarOpen] = useState(false);

  // Initialize shapes based on window size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initial = getDefaultShapes(window.innerWidth, window.innerHeight);
      setShapes(initial);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setShapes((prev) =>
        prev.map((shape) => ({
          ...shape,
          x: Math.min(shape.x, Math.max(window.innerWidth - shape.size - 20, 10)),
          y: Math.min(shape.y, Math.max(window.innerHeight - shape.size - 20, 10)),
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeDragIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  activeDragIdRef.current = activeDragId;
  dragOffsetRef.current = dragOffset;

  // Window-level pointer listeners for 100% reliable, fluid 60fps tracking
  useEffect(() => {
    if (!activeDragId) return;

    const onWindowMove = (e: PointerEvent) => {
      const dragId = activeDragIdRef.current;
      if (!dragId) return;

      const currentX = e.clientX - dragOffsetRef.current.x;
      const currentY = e.clientY - dragOffsetRef.current.y;

      // Keep within visible viewport
      const clampedX = Math.max(8, Math.min(currentX, window.innerWidth - 50));
      const clampedY = Math.max(8, Math.min(currentY, window.innerHeight - 50));

      setShapes((prev) =>
        prev.map((shape) => {
          if (shape.id === dragId) {
            const deltaX = clampedX - shape.x;
            return {
              ...shape,
              x: clampedX,
              y: clampedY,
              rotation: shape.rotation + deltaX * 0.35,
              isDragging: true,
            };
          }
          return shape;
        })
      );
    };

    const onWindowUp = () => {
      const dragId = activeDragIdRef.current;
      if (dragId) {
        setShapes((prev) =>
          prev.map((shape) =>
            shape.id === dragId ? { ...shape, isDragging: false } : shape
          )
        );
        setActiveDragId(null);
      }
    };

    window.addEventListener('pointermove', onWindowMove);
    window.addEventListener('pointerup', onWindowUp);
    window.addEventListener('pointercancel', onWindowUp);

    return () => {
      window.removeEventListener('pointermove', onWindowMove);
      window.removeEventListener('pointerup', onWindowUp);
      window.removeEventListener('pointercancel', onWindowUp);
    };
  }, [activeDragId]);

  // Pointer Down (Start Drag)
  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    shapeId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const shape = shapes.find((s) => s.id === shapeId);
    if (!shape) return;

    setActiveDragId(shapeId);
    setDragOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y,
    });
  };

  // Reset all shapes back to original positions
  const handleReset = () => {
    setShapes(getDefaultShapes(window.innerWidth, window.innerHeight));
  };

  // Spawn a new shape near center of screen
  const handleSpawnShape = (type: ShapeType) => {
    const config = SHAPE_CONFIG[type];
    const newId = `shape-${Date.now()}`;
    const jitterX = (Math.random() - 0.5) * 200;
    const jitterY = (Math.random() - 0.5) * 200;

    const newShape: DraggableShapeData = {
      id: newId,
      type,
      x: Math.max(20, Math.min(window.innerWidth / 2 + jitterX, window.innerWidth - 60)),
      y: Math.max(80, Math.min(window.innerHeight / 2 + jitterY, window.innerHeight - 80)),
      size: Math.floor(Math.random() * 12) + 36,
      color: config.color,
      glowColor: config.glowColor,
      rotation: Math.floor(Math.random() * 360),
    };

    setShapes((prev) => [...prev, newShape]);
  };

  // Delete a shape on double-click
  const handleDoubleClick = (shapeId: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== shapeId));
  };

  return (
    <>
      {/* Viewport-wide container for all draggable shapes */}
      <div
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
        aria-hidden="true"
      >
        {shapes.map((shape) => {
          const isCurrentDrag = shape.id === activeDragId;

          return (
            <div
              key={shape.id}
              onPointerDown={(e) => handlePointerDown(e, shape.id)}
              onDoubleClick={() => handleDoubleClick(shape.id)}
              style={{
                transform: `translate3d(${shape.x}px, ${shape.y}px, 0) rotate(${shape.rotation}deg) scale(${
                  isCurrentDrag ? 1.35 : 1
                })`,
                touchAction: 'none',
              }}
              className={`absolute top-0 left-0 pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75 will-change-transform group ${
                isCurrentDrag ? 'z-50' : 'z-20'
              }`}
            >
              {/* Outer Glow Halo on Hover / Drag */}
              <div
                className={`relative flex items-center justify-center p-2 rounded-2xl transition-all duration-200 ${
                  isCurrentDrag
                    ? 'ring-2 ring-white/70 bg-[#15151D]/80 backdrop-blur-md shadow-2xl scale-110'
                    : 'animate-ps-float-1 group-hover:ring-1 group-hover:ring-[#38BDF8]/60 group-hover:bg-[#15151D]/50 group-hover:scale-110'
                }`}
              >
                <ShapeSVG
                  type={shape.type}
                  size={shape.size}
                  color={shape.color}
                  glowColor={shape.glowColor}
                  isDragging={isCurrentDrag}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Interactive Shapes Playground Controller */}
      <div className="fixed bottom-6 left-6 z-40 transition-all duration-300">
        {toolbarOpen ? (
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#15151D]/95 border border-[#38BDF8]/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#262638] text-xs font-bold text-[#F4F4F5]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>PlayStation Shapes</span>
              </div>
              <button
                type="button"
                onClick={() => setToolbarOpen(false)}
                className="p-1 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#262638] transition-colors"
                aria-label="Close shapes toolbar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instruction text */}
            <p className="text-[11px] text-[#A1A1AA] max-w-[210px] leading-snug">
              Grab <strong className="text-[#38BDF8]">any shape</strong> on screen and move it anywhere!
            </p>

            {/* Spawn shape buttons */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {(['triangle', 'circle', 'cross', 'square'] as ShapeType[]).map((type) => {
                const conf = SHAPE_CONFIG[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSpawnShape(type)}
                    title={`Spawn new ${conf.label}`}
                    style={{ borderColor: `${conf.color}40`, color: conf.color }}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C27] border text-xs font-black transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center gap-0.5 shadow-sm"
                  >
                    <Plus className="w-2.5 h-2.5 opacity-70" />
                    <span>{conf.symbol}</span>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="mt-1 flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl bg-[#0B0B10] hover:bg-[#1C1C27] border border-[#262638] hover:border-[#38BDF8]/40 text-[#A1A1AA] hover:text-white text-xs font-semibold transition-all duration-200"
            >
              <RotateCcw className="w-3 h-3 text-[#38BDF8]" />
              <span>Reset Positions</span>
            </button>
          </div>
        ) : (
          /* Minimized Floating Playground Button */
          <button
            type="button"
            onClick={() => setToolbarOpen(true)}
            className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#15151D]/90 hover:bg-[#1C1C27] border border-[#38BDF8]/40 hover:border-[#22D3EE] shadow-xl shadow-black/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs font-bold text-[#F4F4F5]"
            title="Open PlayStation Shapes Playground"
          >
            <span className="flex items-center gap-1 text-xs font-black tracking-widest">
              <span className="text-[#22D3EE]">△</span>
              <span className="text-[#F43F5E]">○</span>
              <span className="text-[#38BDF8]">✕</span>
              <span className="text-[#E879F9]">□</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-[#A1A1AA] group-hover:text-white transition-colors">
              Move Shapes
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          </button>
        )}
      </div>
    </>
  );
};
