import React from 'react';
import {ChevronRight, Plus, Eye, X} from 'lucide-react';
import Button from './Button';

const ButtonTest: React.FC = () => {
  return (
    <div className="min-h-screen p-8 space-y-12 bg-gray-50" style={{fontFamily: 'Figtree, sans-serif'}}>
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-2">Button Component - Figma Design</h1>
        <p className="text-gray-600">Exact implementation from Figma design system</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* All Variants - Default State */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">All Variants (Default State)</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="color">Color</Button>
            <Button variant="surface">Surface</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* Solid Variant */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Solid Variant</h2>
          <p className="text-sm text-gray-600 mb-4">Primary actions • Highest emphasis</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Default</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="solid">Button</Button>
                <Button variant="solid" leadingIcon={<Eye size={24} />}>With Leading</Button>
                <Button variant="solid" trailingIcon={<ChevronRight size={18} />}>With Trailing</Button>
                <Button variant="solid" leadingIcon={<Plus size={24} />} trailingIcon={<ChevronRight size={18} />}>
                  Both Icons
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Disabled</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="solid" disabled>Button</Button>
                <Button variant="solid" disabled leadingIcon={<Eye size={24} />}>With Leading</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Full Width</p>
              <div className="max-w-md">
                <Button variant="solid" fullWidth trailingIcon={<ChevronRight size={18} />}>
                  Full Width Button
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Color Variant */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Color Variant</h2>
          <p className="text-sm text-gray-600 mb-4">Secondary actions • Medium emphasis</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Default</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="color">Button</Button>
                <Button variant="color" leadingIcon={<Eye size={24} />}>With Leading</Button>
                <Button variant="color" trailingIcon={<ChevronRight size={18} />}>With Trailing</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Disabled</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="color" disabled>Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Surface Variant */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Surface Variant</h2>
          <p className="text-sm text-gray-600 mb-4">Tertiary actions • Subtle emphasis with border</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Default</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="surface">Button</Button>
                <Button variant="surface" leadingIcon={<Eye size={24} />}>With Leading</Button>
                <Button variant="surface" trailingIcon={<ChevronRight size={18} />}>With Trailing</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Disabled</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="surface" disabled>Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Outline Variant */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Outline Variant</h2>
          <p className="text-sm text-gray-600 mb-4">Alternative actions • Clear boundaries</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Default</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Button</Button>
                <Button variant="outline" leadingIcon={<Eye size={24} />}>With Leading</Button>
                <Button variant="outline" trailingIcon={<ChevronRight size={18} />}>With Trailing</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Disabled</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" disabled>Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ghost Variant */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Ghost Variant</h2>
          <p className="text-sm text-gray-600 mb-4">Minimal actions • Text links</p>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Default</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost">Button</Button>
                <Button variant="ghost" leadingIcon={<Eye size={24} />}>With Leading</Button>
                <Button variant="ghost" trailingIcon={<ChevronRight size={18} />}>With Trailing</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Disabled</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" disabled>Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Real-World Examples</h2>

          <div className="space-y-6">
            {/* Transaction Form */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Transaction Form Actions</h3>
              <div className="flex gap-3">
                <Button variant="ghost">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button variant="solid" leadingIcon={<Plus size={24} />}>
                  Add Transaction
                </Button>
              </div>
            </div>

            {/* Budget Actions */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Budget Actions</h3>
              <div className="flex gap-3">
                <Button variant="color">View Details</Button>
                <Button variant="surface">Edit Budget</Button>
                <Button variant="outline">Export Data</Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Navigation</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="solid" trailingIcon={<ChevronRight size={18} />}>
                  Continue
                </Button>
                <Button variant="color" trailingIcon={<ChevronRight size={18} />}>
                  Next Step
                </Button>
                <Button variant="ghost">Skip</Button>
              </div>
            </div>

            {/* CTA Examples */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Call-to-Action Examples</h3>
              <div className="space-y-3 max-w-sm">
                <Button variant="solid" fullWidth trailingIcon={<ChevronRight size={18} />}>
                  Get Started
                </Button>
                <Button variant="color" fullWidth trailingIcon={<ChevronRight size={18} />}>
                  Connect Bank Account
                </Button>
                <Button variant="surface" fullWidth trailingIcon={<ChevronRight size={18} />}>
                  View All Transactions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Interactive Demo</h2>
          <p className="text-sm text-gray-600 mb-6">Click buttons to see active state</p>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="solid" onClick={() => alert('Solid clicked!')}>
                Click Me (Solid)
              </Button>
              <Button variant="color" onClick={() => alert('Color clicked!')}>
                Click Me (Color)
              </Button>
              <Button variant="surface" onClick={() => alert('Surface clicked!')}>
                Click Me (Surface)
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={() => alert('Outline clicked!')}>
                Click Me (Outline)
              </Button>
              <Button variant="ghost" onClick={() => alert('Ghost clicked!')}>
                Click Me (Ghost)
              </Button>
            </div>
          </div>
        </section>

        {/* Design Specifications */}
        <section className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-black">Figma Design Specifications</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <h3 className="font-semibold text-black mb-2">Typography</h3>
            <p><strong>Font Style:</strong> text-base/medium (Figtree Medium, 500 weight, 16px)</p>
            <p><strong>Line Height:</strong> Normal (1.5)</p>

            <h3 className="font-semibold text-black mb-2 mt-4">Layout & Spacing</h3>
            <p><strong>Padding:</strong> spacing/3 (12px) vertical, spacing/6 (24px) horizontal</p>
            <p><strong>Border Radius:</strong> borderRadius/rounded-md (6px)</p>
            <p><strong>Gap:</strong> spacing/2 (8px) between text and icons</p>
            <p><strong>Drop Shadow:</strong> 0px 1px 1px 0px rgba(0,0,0,0.06)</p>

            <h3 className="font-semibold text-black mb-2 mt-4">Icons</h3>
            <p><strong>Leading Icon:</strong> 24x24px (lucide icons)</p>
            <p><strong>Trailing Icon:</strong> 18x18px (lucide icons)</p>

            <hr className="my-4 border-blue-200" />

            <h3 className="font-semibold text-black mb-2">Variant Colors (Brand Variables)</h3>
            <p><strong>Solid:</strong> bg/bg-solid (#1E293B) → bg/bg-solid-hover (#334155) → bg/bg-solid-active (#0F172A)</p>
            <p className="ml-4 text-xs">Text: fg/text-inverse-hover (#FAFAFA) → fg/text-inverse (#FCFCFC)</p>

            <p className="mt-2"><strong>Color:</strong> primary/bg (#BFDBFE) with fg/text (#404040)</p>
            <p className="ml-4 text-xs">Hover: #93C5FD with #262626, Active: #60A5FA</p>

            <p className="mt-2"><strong>Surface:</strong> bg/bg (#F1F5F9) with fg/border (#A3A3A3) and fg/text (#404040)</p>
            <p className="ml-4 text-xs">Border: Inside, 1px weight</p>

            <p className="mt-2"><strong>Outline:</strong> Transparent bg with fg/text border (#404040)</p>
            <p className="ml-4 text-xs">Hover/Active: blue-500 (#3B82F6) → blue-600 (#2563EB)</p>

            <p className="mt-2"><strong>Ghost:</strong> Transparent bg with fg/text (#404040)</p>
            <p className="ml-4 text-xs">Hover/Active: blue-500 (#3B82F6) → blue-600 (#2563EB)</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonTest;
