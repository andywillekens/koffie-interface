export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

  try {
    const response = await $fetch(config.apiUrl, {
      headers: {
        Authorization: `Bearer ${config.bearerToken}`
      }
    })

    return response
  } catch (error) {
    return { error: 'kapot, godverdomme!' }
  }
})
