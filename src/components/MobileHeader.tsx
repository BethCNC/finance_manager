import React from 'react';
import {Menu, Grid3x3, ChevronLeft, Settings} from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onMenuClick?: () => void;
  onGridClick?: () => void;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
  showMenu?: boolean;
  showGrid?: boolean;
  showBack?: boolean;
  showSettings?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  onMenuClick,
  onGridClick,
  onBackClick,
  onSettingsClick,
  showMenu = false,
  showGrid = false,
  showBack = false,
  showSettings = false
}) => {
  // Determine what to show on the left side
  const showLeftIcon = showBack || showMenu;
  const LeftIcon = showBack ? ChevronLeft : Menu;
  const leftClickHandler = showBack ? onBackClick : onMenuClick;
  const leftLabel = showBack ? 'Go back' : 'Open menu';

  // Determine what to show on the right side
  const showRightIcon = showSettings || showGrid;
  const RightIcon = showSettings ? Settings : Grid3x3;
  const rightClickHandler = showSettings ? onSettingsClick : onGridClick;
  const rightLabel = showSettings ? 'Settings' : 'View options';

  return (
    <div className="bg-bg-bg-hover border-b border-fg-line px-4 py-3 flex items-center justify-between w-full">
      {/* Container - matches Figma structure exactly */}
      <div className="flex-1 flex items-center justify-between min-h-0 min-w-0">

        {/* Left: Icon group */}
        <div className="flex flex-row items-center self-stretch">
          <div className="flex gap-3 h-full items-center p-1">
            {showLeftIcon && leftClickHandler ? (
              <button
                onClick={leftClickHandler}
                className="h-6 aspect-square overflow-hidden hover:opacity-70 transition-opacity"
                aria-label={leftLabel}
              >
                <LeftIcon size={24} className="text-fg-text" strokeWidth={2} />
              </button>
            ) : (
              <div className="h-6 aspect-square opacity-0" aria-hidden="true" />
            )}

            {/* Second icon slot (hidden by default, can be used for secondary action) */}
            <div className="h-6 aspect-square opacity-0" aria-hidden="true" />
          </div>
        </div>

        {/* Center: Page title */}
        <div className="flex items-center justify-center">
          <h1 className="text-3xl-regular text-fg-text text-center whitespace-nowrap">
            {title}
          </h1>
        </div>

        {/* Right: Icon */}
        <div className="flex flex-row items-center self-stretch">
          <div className="flex gap-2.5 h-full items-center p-1">
            {/* Placeholder (hidden) */}
            <div className="h-full aspect-square opacity-0 overflow-hidden" aria-hidden="true" />

            {/* Settings/Grid icon */}
            {showRightIcon && rightClickHandler ? (
              <button
                onClick={rightClickHandler}
                className="h-full aspect-square overflow-hidden hover:opacity-70 transition-opacity"
                aria-label={rightLabel}
              >
                <RightIcon size={24} className="text-fg-text" strokeWidth={2} />
              </button>
            ) : (
              <div className="h-full aspect-square" aria-hidden="true" />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

