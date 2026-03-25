'use client'

import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface MarkdownEditorFieldProps {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditorField({
  label,
  hint,
  value,
  onChange,
}: MarkdownEditorFieldProps) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#1A1A17] mb-1">
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-[#1A1A17]/35 mb-2">{hint}</p>
      )}
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val ?? '')}
          height={250}
          preview="edit"
        />
      </div>
    </div>
  )
}
