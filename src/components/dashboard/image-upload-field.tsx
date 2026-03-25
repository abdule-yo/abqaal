'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Search, Loader2 } from 'lucide-react'
import { uploadImage, deleteImage } from '@/lib/storage'

interface ImageUploadFieldProps {
  label: string
  hint?: string
  folder: string
  value: string
  onChange: (url: string) => void
  searchQuery?: string
}

export function ImageUploadField({
  label,
  hint,
  folder,
  value,
  onChange,
  searchQuery,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Delete old image if replacing
      if (value) {
        await deleteImage(value).catch(() => {})
      }
      const url = await uploadImage(folder, file)
      onChange(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  async function handleRemove() {
    if (value) {
      await deleteImage(value).catch(() => {})
    }
    onChange('')
  }

  async function handleAutoFind() {
    if (!searchQuery) return
    setSearching(true)
    setError('')

    try {
      const res = await fetch(`/api/unsplash?query=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'No image found')
        return
      }

      // Download the unsplash image and upload to our storage
      const imgRes = await fetch(data.url)
      const blob = await imgRes.blob()
      const file = new File([blob], `unsplash-${Date.now()}.jpg`, { type: 'image/jpeg' })

      if (value) {
        await deleteImage(value).catch(() => {})
      }
      const url = await uploadImage(folder, file)
      onChange(url)
    } catch {
      setError('Auto-find failed')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#1A1A17] mb-1">
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-[#1A1A17]/35 mb-2">{hint}</p>
      )}

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#E8E8E0] bg-[#FAFAF5]">
          <div className="relative h-48 w-full">
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? 'border-[#4A8B2C] bg-[#E8F5E9]/50'
              : 'border-[#E8E8E0] bg-[#FAFAF5] hover:border-[#4A8B2C]/30'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 text-[#4A8B2C] animate-spin" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-[#1A1A17]/20 mb-2" />
              <p className="text-sm text-[#1A1A17]/40">
                Drop an image or click to browse
              </p>
              <p className="text-xs text-[#1A1A17]/25 mt-1">
                PNG, JPG up to 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Auto-find button */}
      {searchQuery && !value && (
        <button
          type="button"
          onClick={handleAutoFind}
          disabled={searching}
          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg transition-colors disabled:opacity-50"
        >
          {searching ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Search className="h-3.5 w-3.5" />
          )}
          Auto-find image
        </button>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  )
}
