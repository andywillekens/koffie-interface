<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  function playAudio(url: string) {
    new Audio(url).play()
  }

  interface CoffeeData {
    user: string
  }

  const { data } = await useFetch('/api/stats')

  // Process the data: group by user and count occurrences
  const groupedData = computed(() => {
    if (!data.value) return []

    const userCounts: Record<string, number> = data.value.reduce((acc, item) => {
      acc[item.user] = (acc[item.user] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(userCounts)
      .map(([user, total]) => ({ user, total }))
      .sort((a, b) => b.total - a.total)
  })

  // Confetti logic
  export interface JSConfettiApi {
    JSConfetti: {
      new (): {
        addConfetti: (options?: { emojis: string[] }) => void
      }
    }
  }

  declare global {
    interface Window extends JSConfettiApi {}
  }

  const { onLoaded } = useScriptNpm<JSConfettiApi>({
    packageName: 'js-confetti',
    file: 'dist/js-confetti.browser.js',
    version: '0.12.0',
    scriptOptions: {
      use() {
        return { JSConfetti: window.JSConfetti }
      }
    }
  })

  const confettiInstance = ref<any>(null)

  const triggerConfetti = () => {
    if (confettiInstance.value) {
      confettiInstance.value.addConfetti({
        emojis: ['☕️', '☕️', '☕️', '☕️', '☕️', '☕️', '💩'],
        confettiNumber: 100,
        emojiSize: 100
      })
    }
  }

  onMounted(() => {
    onLoaded(({ JSConfetti }) => {
      confettiInstance.value = new JSConfetti()

      // Fire confetti immediately on first load
      triggerConfetti()

      // Attach event listener to body
      document.body.addEventListener('click', triggerConfetti)
      document.body.addEventListener('click', () => playAudio('/opa.mp3'))
    })
  })

  onBeforeUnmount(() => {
    // Cleanup event listener
    document.body.removeEventListener('click', triggerConfetti)
    document.body.removeEventListener('click', () => playAudio('/opa.mp3'))
  })
</script>

<template>
  <section class="w-[600px] flex flex-col gap-6">
    <h1>🏆 Koffie leaderboard:</h1>
    <ul>
      <li v-for="item in groupedData" :key="item.user">
        <span class="font-head font-bold text-3xl text-leather-500">{{ item.user }}</span> heeft
        <span
          class="bg-leather-900 w-8 font-head font-bold inline-flex h-8 rounded-full text-leather-300 text-2xl justify-center items-center"
          >{{ item.total }}</span
        >
        {{ item.total > 1 ? 'kopjes' : 'kopje' }} koffie op.
      </li>
    </ul>
  </section>
  <audio id="opa" src="/opa.mp3"></audio>
</template>
