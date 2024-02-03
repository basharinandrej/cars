

export const addQueryParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([key, value]) => {
      if(value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })

    window.history.pushState(null, '',`?${searchParams.toString()}`)
}