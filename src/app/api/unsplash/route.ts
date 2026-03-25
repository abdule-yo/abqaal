import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 })
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Unsplash API error' }, { status: 502 })
    }

    const data = await res.json()
    const photo = data.results?.[0]

    if (!photo) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 })
    }

    return NextResponse.json({
      url: photo.urls.regular,
      alt: photo.alt_description || query,
      credit: photo.user.name,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch from Unsplash' }, { status: 500 })
  }
}
