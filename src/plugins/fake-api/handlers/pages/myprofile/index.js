import { HttpResponse, http } from 'msw'
import { db } from '@db/pages/myprofile/db'

// Handler for pages/profile
export const handlerPagesMyProfile = [
  // GET /pages/myprofile
  http.get(('/api/pages/myprofile'), ({ request }) => {
    const url = new URL(request.url)
    const tab = url.searchParams.get('tab') || ''
    
    return HttpResponse.json(db.data[tab], { status: 200 })
  }),

  // GET /pages/profile/header
  http.get(('/api/pages/myprofile/header'), () => {
    return HttpResponse.json(db.data.profileHeader, { status: 200 })
  }),
]
