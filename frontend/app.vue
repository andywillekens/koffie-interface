<script setup lang="ts">
  const { data } = await useFetch(`/api/stats`)

  // Process the data: group by user and count occurrences
  const groupedData = computed(() => {
    if (!data.value) return []

    // Group by user and count occurrences
    const userCounts = data.value.reduce((acc, item) => {
      acc[item.user] = (acc[item.user] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Convert object to sorted array
    return Object.entries(userCounts)
      .map(([user, total]) => ({ user, total }))
      .sort((a, b) => b.total - a.total)
  })
</script>

<template>
  <section class="w-[600px] flex flex-col gap-6">
    <h1>🏆 Koffie leaderboard:</h1>
    <ul>
      <li v-for="item in groupedData" :key="item.user">{{ item.user }}: {{ item.total }}</li>
    </ul>
  </section>
</template>
