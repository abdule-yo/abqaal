import Link from 'next/link'
import { Sprout, ArrowRight } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description: string
  backHref?: string
  backLabel?: string
}

export default function ComingSoon({
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
}: ComingSoonProps) {
  return (
    <div className="text-center py-24 sm:py-32 px-4">
      <div className="max-w-md mx-auto">
        <div className="h-16 w-16 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
          <Sprout className="h-8 w-8 text-[#4A8B2C]" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-3">
          {title}
        </h2>
        <p className="text-[#1A1A17]/45 text-[15px] leading-relaxed mb-8">
          {description}
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A8B2C] hover:text-[#1B5E20] transition-colors"
        >
          {backLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
