import React from 'react';

const TextSpecimens = () => {
  return (
    <div className="min-h-screen p-6 md:p-8" style={{backgroundColor: 'rgb(var(--surface-subtle))'}}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="font-text-4xlbold mb-4" style={{color: 'rgb(var(--text-primary))'}}>Text Specimens</h1>
        <p className="font-text-baseregular mb-12" style={{color: 'rgb(var(--text-secondary))'}}>
          All typography styles from Figma design system. Uses Figtree font with token-based sizing.
        </p>

        {/* Dashboard Text Styles */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Dashboard Text Styles</h2>

          <div className="space-y-4">
            <SpecimenRow label="Section Heading (h2)">
              <h2 className="font-text-4xlbold">Accounts</h2>
            </SpecimenRow>

            <SpecimenRow label="Balance Amount">
              <span className="font-text-3xlbold">$1,212.42</span>
            </SpecimenRow>

            <SpecimenRow label="Account Name">
              <span className="font-text-basemedium">Bryan Checking ...8182</span>
            </SpecimenRow>

            <SpecimenRow label="Category Name">
              <span className="font-text-baseregular">Mortgage</span>
            </SpecimenRow>

            <SpecimenRow label="Budget Detail">
              <span className="font-text-smregular">$85 of $150</span>
            </SpecimenRow>

            <SpecimenRow label="Nav Label">
              <span className="font-text-xsmedium">Home</span>
            </SpecimenRow>
          </div>
        </section>

        {/* Size Scale */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Size Scale (Regular Weight)</h2>

          <div className="space-y-4">
            <SpecimenRow label="text-xs (12px)">
              <span className="font-text-xsregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-sm (14px)">
              <span className="font-text-smregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-base (16px)">
              <span className="font-text-baseregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-lg (18px)">
              <span className="font-text-lgregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-xl (20px)">
              <span className="font-text-xlregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-2xl (24px)">
              <span className="font-text-2xlregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-3xl (30px)">
              <span className="font-text-3xlregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="text-4xl (36px)">
              <span className="font-text-4xlregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>
          </div>
        </section>

        {/* Weight Scale */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Weight Scale (16px base)</h2>

          <div className="space-y-4">
            <SpecimenRow label="thin (100)">
              <span className="font-text-basethin">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="regular (400)">
              <span className="font-text-baseregular">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="medium (500)">
              <span className="font-text-basemedium">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="semi-bold (600)">
              <span className="font-text-basesemi-bold">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="bold (700)">
              <span className="font-text-basebold">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="extra-bold (800)">
              <span className="font-text-baseextra-bold">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="black (900)">
              <span className="font-text-baseblack">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>
          </div>
        </section>

        {/* Italic Styles */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Italic Variants (16px base)</h2>

          <div className="space-y-4">
            <SpecimenRow label="light italic">
              <span className="font-text-baselight">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>

            <SpecimenRow label="extra-light italic">
              <span className="font-text-baseextra-light">The quick brown fox jumps over the lazy dog</span>
            </SpecimenRow>
          </div>
        </section>

        {/* Color Variants */}
        <section className="p-6 md:p-8 mb-6" style={{
          backgroundColor: 'rgb(var(--surface-base))',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="font-text-2xlsemi-bold mb-6" style={{color: 'rgb(var(--text-primary))'}}>Color Variants</h2>

          <div className="space-y-4">
            <SpecimenRow label="primary (--text-primary)">
              <span className="font-text-baseregular" style={{color: 'rgb(var(--text-primary))'}}>
                The quick brown fox jumps over the lazy dog
              </span>
            </SpecimenRow>

            <SpecimenRow label="secondary (--text-secondary)">
              <span className="font-text-baseregular" style={{color: 'rgb(var(--text-secondary))'}}>
                The quick brown fox jumps over the lazy dog
              </span>
            </SpecimenRow>

            <SpecimenRow label="tertiary (--text-tertiary)">
              <span className="font-text-baseregular" style={{color: 'rgb(var(--text-tertiary))'}}>
                The quick brown fox jumps over the lazy dog
              </span>
            </SpecimenRow>

            <SpecimenRow label="success (--state-success-text)">
              <span className="font-text-basemedium" style={{color: 'rgb(var(--state-success-text))'}}>
                Budget on track
              </span>
            </SpecimenRow>

            <SpecimenRow label="warning (--state-warning-text)">
              <span className="font-text-basemedium" style={{color: 'rgb(var(--state-warning-text))'}}>
                Approaching budget limit
              </span>
            </SpecimenRow>

            <SpecimenRow label="danger (--state-danger-text)">
              <span className="font-text-basemedium" style={{color: 'rgb(var(--state-danger-text))'}}>
                Over budget
              </span>
            </SpecimenRow>
          </div>
        </section>

      </div>
    </div>
  );
};

// Helper component for displaying specimen rows
interface SpecimenRowProps {
  label: string;
  children: React.ReactNode;
}

const SpecimenRow: React.FC<SpecimenRowProps> = ({label, children}) => {
  return (
    <div className="flex items-baseline py-4" style={{
      gap: 'var(--spacing-8)',
      borderBottom: '1px solid rgb(var(--border-subtle))'
    }}>
      <span className="min-w-[200px] text-sm font-mono" style={{color: 'rgb(var(--text-tertiary))'}}>
        {label}
      </span>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default TextSpecimens;
