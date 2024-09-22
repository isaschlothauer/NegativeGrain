import { useSearchParams } from 'next/navigation';

export default function PushUrlPath () {
  const searchParams = useSearchParams()

  function updateUrlPath(urlPath: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', urlPath)
    window.history.pushState(null, '', `?${params.toString()}`)
  }
  
}