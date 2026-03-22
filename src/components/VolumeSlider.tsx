import React, { useRef } from "react";
import Icon from "./Icon";
import { Icon as IconType } from "../icon";
import cs from "classnames";

interface Props {
  volume: number;
  setVolume: (volume: number) => void;
  classes?: string;
}

export default function VolumeBar({ volume, setVolume, classes = "" }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const min = -25;
  const max = -10;
  const range = max - min;

  const icon = ("volume#" +
    (volume === -25
      ? "mute"
      : volume === -10
      ? "full"
      : "partial")) as IconType;

  const setFromClientX = (clientX: number) => {
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = Math.round((min + ratio * range) * 10) / 10;
    setVolume(next);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    setFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className={cs(classes, "volume_wrap", volume === min && "mute")}>
      <div
        ref={barRef}
        className="volume_box"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="volume_fill"
          style={{ width: `${((volume - min) / range) * 100}%` }}
        ></div>
        <div className="volume_content">
          <Icon _icon={icon} size={16} />
        </div>
      </div>
      <style jsx>{`
        .volume_wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .volume_box {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          border: 2px solid var(--amber);
          border-radius: 8px;
          background-color: #1f1f1f;
          overflow: hidden;
          touch-action: none;
        }

        .volume_fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background-color: var(--amber);
        }

        .volume_content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 8px;
          color: var(--black);
          fill: var(--black);
          stroke: var(--black);
        }

        .mute .volume_content {
          color: var(--amber);
          fill: var(--amber);
          stroke: var(--amber);
        }
      `}</style>
    </div>
  );
}
