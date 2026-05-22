<script setup>
import { ref, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'radix-vue'
import { AVATAR_ICONS, AVATAR_COLORS } from '@/utils/avatarOptions.js'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initial: { type: Object, required: true }, // { icon, color }
})

const emit = defineEmits(['update:modelValue', 'save'])

const selectedIcon = ref(props.initial.icon)
const selectedColor = ref(props.initial.color)

// Reseta seleção a cada abertura para refletir o profile atual
watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      selectedIcon.value = props.initial.icon
      selectedColor.value = props.initial.color
    }
  },
)

function handleSave() {
  emit('save', { icon: selectedIcon.value, color: selectedColor.value })
  emit('update:modelValue', false)
}

function handleCancel() {
  emit('update:modelValue', false)
}
</script>

<template>
  <DialogRoot :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-white/10 dark:bg-dm-navy-800"
      >
        <DialogTitle class="font-display text-xl font-bold text-dm-navy-900 dark:text-white">
          Escolha seu avatar
        </DialogTitle>
        <DialogDescription class="sr-only">
          Selecione um ícone e uma cor para personalizar seu perfil.
        </DialogDescription>

        <!-- Preview -->
        <div class="my-6 flex justify-center">
          <UserAvatar :icon="selectedIcon" :color="selectedColor" size="xl" />
        </div>

        <!-- Ícones -->
        <div>
          <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-dm-navy-200">
            Ícone
          </p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="opt in AVATAR_ICONS"
              :key="opt.id"
              type="button"
              class="flex items-center justify-center rounded-xl border p-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-dm-gold"
              :class="
                selectedIcon === opt.id
                  ? 'border-dm-gold bg-dm-gold/10 ring-2 ring-dm-gold/30'
                  : 'border-slate-200 hover:border-dm-gold/40 dark:border-white/10 dark:hover:border-dm-gold/40'
              "
              :aria-label="opt.label"
              :aria-pressed="selectedIcon === opt.id"
              @click="selectedIcon = opt.id"
            >
              <UserAvatar :icon="opt.id" :color="selectedColor" size="sm" />
            </button>
          </div>
        </div>

        <!-- Cores -->
        <div class="mt-5">
          <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-dm-navy-200">
            Cor
          </p>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="opt in AVATAR_COLORS"
              :key="opt.id"
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none"
              :class="[
                opt.bg,
                selectedColor === opt.id
                  ? 'ring-2 ring-dm-gold ring-offset-2 ring-offset-white dark:ring-offset-dm-navy-800'
                  : '',
              ]"
              :aria-label="opt.label"
              :aria-pressed="selectedColor === opt.id"
              @click="selectedColor = opt.id"
            >
              <svg
                v-if="selectedColor === opt.id"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                :class="opt.text"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Ações -->
        <div class="mt-7 flex items-center justify-end gap-3">
          <AppButton variant="secondary" @click="handleCancel">Cancelar</AppButton>
          <AppButton @click="handleSave">Salvar</AppButton>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
