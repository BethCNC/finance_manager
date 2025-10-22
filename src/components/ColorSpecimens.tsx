import React from 'react';

const ColorSpecimens = () => {
  return (
    <div className="min-h-screen p-6 md:p-8" style={{backgroundColor: 'rgb(var(--surface-subtle))'}}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="font-text-4xlbold mb-4" style={{color: 'rgb(var(--text-primary))'}}>Color Specimens</h1>
        <p className="font-text-baseregular mb-12" style={{color: 'rgb(var(--text-secondary))'}}>
          All paint styles from Figma design system. Visual swatches with color values.
        </p>

        {/* Bryan Brand Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Bryan Brand Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="bg-subtle" color="rgba(239, 246, 255, 1)" />
            <ColorSwatch name="bg" color="rgba(219, 234, 254, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(147, 197, 253, 1)" />
            <ColorSwatch name="bg-active" color="rgba(96, 165, 250, 1)" />
            <ColorSwatch name="line" color="rgba(183, 217, 248, 1)" />
            <ColorSwatch name="border" color="rgba(150, 199, 242, 1)" />
            <ColorSwatch name="border-hover" color="rgba(94, 176, 239, 1)" />
            <ColorSwatch name="solid" color="rgba(147, 197, 253, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(0, 129, 241, 1)" />
            <ColorSwatch name="text" color="rgba(0, 106, 220, 1)" />
            <ColorSwatch name="on-bryan" color="rgba(255, 255, 255, 1)" dark />
            <ColorSwatch name="border-dark" color="rgba(30, 64, 175, 1)" />
          </div>
        </section>

        {/* Beth Brand Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Beth Brand Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="on-beth" color="rgba(255, 255, 255, 1)" dark />
            <ColorSwatch name="text" color="rgba(192, 38, 211, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(240, 171, 252, 1)" />
            <ColorSwatch name="solid" color="rgba(232, 121, 249, 1)" />
            <ColorSwatch name="border-hover" color="rgba(217, 70, 239, 1)" />
            <ColorSwatch name="border" color="rgba(232, 121, 249, 1)" />
            <ColorSwatch name="line" color="rgba(192, 38, 211, 1)" />
            <ColorSwatch name="bg-active" color="rgba(245, 208, 254, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(240, 171, 252, 1)" />
            <ColorSwatch name="bg" color="rgba(250, 232, 255, 1)" />
            <ColorSwatch name="bg-subtle" color="rgba(253, 244, 255, 1)" />
          </div>
        </section>

        {/* Category Colors - Hover States */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Category Colors - Hover</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="fees" color="rgba(203, 213, 225, 1)" />
            <ColorSwatch name="personal" color="rgba(249, 168, 212, 1)" />
            <ColorSwatch name="software" color="rgba(240, 171, 252, 1)" />
            <ColorSwatch name="health" color="rgba(196, 181, 253, 1)" />
            <ColorSwatch name="entertainment" color="rgba(147, 197, 253, 1)" />
            <ColorSwatch name="auto" color="rgba(103, 232, 249, 1)" />
            <ColorSwatch name="food" color="rgba(110, 231, 183, 1)" />
            <ColorSwatch name="george" color="rgba(190, 242, 100, 1)" />
            <ColorSwatch name="home" color="rgba(253, 224, 71, 1)" />
            <ColorSwatch name="utilities" color="rgba(253, 186, 116, 1)" />
            <ColorSwatch name="mortgage" color="rgba(252, 165, 165, 1)" />
          </div>
        </section>

        {/* Category Colors - Active States */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Category Colors - Active</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="fees" color="rgba(148, 163, 184, 1)" />
            <ColorSwatch name="personal" color="rgba(244, 114, 182, 1)" />
            <ColorSwatch name="software" color="rgba(232, 121, 249, 1)" />
            <ColorSwatch name="health" color="rgba(167, 139, 250, 1)" />
            <ColorSwatch name="entertainment" color="rgba(96, 165, 250, 1)" />
            <ColorSwatch name="auto" color="rgba(34, 211, 238, 1)" />
            <ColorSwatch name="food" color="rgba(52, 211, 153, 1)" />
            <ColorSwatch name="george" color="rgba(163, 230, 53, 1)" />
            <ColorSwatch name="home" color="rgba(250, 204, 21, 1)" />
            <ColorSwatch name="utilities" color="rgba(251, 146, 60, 1)" />
            <ColorSwatch name="mortgage" color="rgba(248, 113, 113, 1)" />
          </div>
        </section>

        {/* Background Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Background Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="default-bg" color="rgba(255, 255, 255, 1)" dark />
            <ColorSwatch name="base" color="rgba(252, 252, 253, 1)" />
            <ColorSwatch name="bg-subtle" color="rgba(249, 249, 251, 1)" />
            <ColorSwatch name="bg-6" color="rgba(226, 232, 240, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(71, 85, 105, 1)" />
            <ColorSwatch name="bg-active" color="rgba(100, 116, 139, 1)" />
            <ColorSwatch name="bg-solid" color="rgba(15, 23, 42, 1)" />
          </div>
        </section>

        {/* Foreground Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Foreground Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="default-fg" color="rgba(10, 10, 10, 1)" />
            <ColorSwatch name="line" color="rgba(216, 217, 224, 1)" />
            <ColorSwatch name="border" color="rgba(205, 206, 215, 1)" />
            <ColorSwatch name="border-hover" color="rgba(185, 190, 198, 1)" />
            <ColorSwatch name="solid" color="rgba(139, 141, 152, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(128, 130, 141, 1)" />
            <ColorSwatch name="text" color="rgba(82, 82, 82, 1)" />
            <ColorSwatch name="text-contrast" color="rgba(38, 38, 38, 1)" />
            <ColorSwatch name="primary" color="rgba(23, 23, 23, 1)" />
            <ColorSwatch name="on-primary" color="rgba(250, 250, 250, 1)" dark />
            <ColorSwatch name="invisible" color="rgba(0, 0, 0, 1)" />
          </div>
        </section>

        {/* Primary Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Primary Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="base" color="rgba(252, 252, 254, 1)" />
            <ColorSwatch name="bg-subtle" color="rgba(248, 249, 253, 1)" />
            <ColorSwatch name="bg" color="rgba(239, 240, 246, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(230, 232, 240, 1)" />
            <ColorSwatch name="bg-active" color="rgba(223, 224, 235, 1)" />
            <ColorSwatch name="line" color="rgba(215, 217, 229, 1)" />
            <ColorSwatch name="border" color="rgba(229, 231, 235, 1)" />
            <ColorSwatch name="border-hover" color="rgba(184, 186, 206, 1)" />
            <ColorSwatch name="solid" color="rgba(18, 19, 28, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(42, 43, 53, 1)" />
            <ColorSwatch name="text" color="rgba(97, 99, 115, 1)" />
            <ColorSwatch name="text-contrast" color="rgba(30, 31, 40, 1)" />
            <ColorSwatch name="on-primary" color="rgba(255, 255, 255, 1)" dark />
          </div>
        </section>

        {/* Success Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Success Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="bg-subtle" color="rgba(240, 253, 244, 1)" />
            <ColorSwatch name="bg" color="rgba(217, 251, 219, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(206, 245, 208, 1)" />
            <ColorSwatch name="bg-active" color="rgba(196, 238, 199, 1)" />
            <ColorSwatch name="line" color="rgba(181, 233, 185, 1)" />
            <ColorSwatch name="border" color="rgba(170, 222, 174, 1)" />
            <ColorSwatch name="border-hover" color="rgba(140, 206, 146, 1)" />
            <ColorSwatch name="solid" color="rgba(40, 167, 69, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(13, 156, 57, 1)" />
            <ColorSwatch name="text" color="rgba(0, 123, 26, 1)" />
            <ColorSwatch name="text-contrast" color="rgba(0, 43, 0, 1)" />
            <ColorSwatch name="on-success" color="rgba(255, 255, 255, 1)" dark />
          </div>
        </section>

        {/* Warning Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Warning Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="bg-subtle" color="rgba(255, 251, 235, 1)" />
            <ColorSwatch name="bg" color="rgba(254, 243, 199, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(253, 230, 138, 1)" />
            <ColorSwatch name="bg-active" color="rgba(252, 211, 77, 1)" />
            <ColorSwatch name="line" color="rgba(251, 191, 36, 1)" />
            <ColorSwatch name="border" color="rgba(245, 158, 11, 1)" />
            <ColorSwatch name="border-hover" color="rgba(235, 188, 0, 1)" />
            <ColorSwatch name="solid" color="rgba(245, 158, 11, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(217, 119, 6, 1)" />
            <ColorSwatch name="text" color="rgba(119, 52, 14, 1)" />
            <ColorSwatch name="on-warning" color="rgba(0, 0, 0, 1)" />
          </div>
        </section>

        {/* Alert/Danger Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Alert Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="bg-subtle" color="rgba(255, 248, 247, 1)" />
            <ColorSwatch name="bg" color="rgba(255, 240, 238, 1)" />
            <ColorSwatch name="bg-hover" color="rgba(255, 230, 226, 1)" />
            <ColorSwatch name="bg-active" color="rgba(253, 216, 211, 1)" />
            <ColorSwatch name="line" color="rgba(250, 199, 190, 1)" />
            <ColorSwatch name="border" color="rgba(243, 176, 162, 1)" />
            <ColorSwatch name="border-hover" color="rgba(234, 146, 128, 1)" />
            <ColorSwatch name="solid" color="rgba(229, 77, 46, 1)" />
            <ColorSwatch name="solid-hover" color="rgba(219, 67, 36, 1)" />
            <ColorSwatch name="text" color="rgba(202, 50, 20, 1)" />
            <ColorSwatch name="on-alert" color="rgba(255, 255, 255, 1)" dark />
          </div>
        </section>

        {/* Disabled Colors */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Disabled Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorSwatch name="disabled" color="rgba(205, 206, 215, 1)" />
            <ColorSwatch name="on-disabled" color="rgba(185, 190, 198, 1)" />
          </div>
        </section>

      </div>
    </div>
  );
};

// Helper component for displaying color swatches
interface ColorSwatchProps {
  name: string;
  color: string;
  dark?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({name, color, dark = false}) => {
  // Convert rgba to hex for display
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);
  let hex = color;
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
  }

  return (
    <div className="flex flex-col" style={{gap: 'var(--spacing-2)'}}>
      <div
        className="h-24 rounded-lg"
        style={{
          backgroundColor: color,
          border: dark ? '1px solid rgb(var(--border-subtle))' : '1px solid rgba(0,0,0,0.1)',
          boxShadow: 'var(--shadow-sm)'
        }}
      />
      <div>
        <div className="font-text-smmedium" style={{color: 'rgb(var(--text-primary))'}}>
          {name}
        </div>
        <div className="font-text-xsregular font-mono" style={{color: 'rgb(var(--text-tertiary))'}}>
          {hex}
        </div>
        <div className="font-text-xsregular font-mono" style={{color: 'rgb(var(--text-tertiary))'}}>
          {color}
        </div>
      </div>
    </div>
  );
};

export default ColorSpecimens;
