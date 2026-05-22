<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'

import PageWrapper from '@/components/layout/PageWrapper.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import AvatarPicker from '@/components/ui/AvatarPicker.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const auth = useAuthStore()

const pickerOpen = ref(false)

function handleSave(profile) {
  auth.updateProfile(profile)
  toast.success('Avatar atualizado!')
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <PageWrapper :full="true">

    <!-- Hero -->
    <section class="hero-glow bg-white px-4 pb-14 pt-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <RevealSection animation="up" class="mx-auto max-w-3xl">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Sua conta</p>
        <h1 class="font-display text-4xl font-bold text-dm-navy-900 sm:text-5xl dark:text-white">Perfil</h1>
        <p class="mt-3 text-slate-500 dark:text-dm-navy-200">Personalize sua experiência na plataforma</p>
      </RevealSection>
    </section>

    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- Conteúdo -->
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-3xl space-y-6">

        <!-- Avatar -->
        <RevealSection animation="up">
          <div class="flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:text-left dark:border-white/8 dark:bg-white/3">
            <UserAvatar
              :icon="auth.profile.icon"
              :color="auth.profile.color"
              size="xl"
            />
            <div class="flex-1 text-center sm:text-left">
              <p class="font-display text-xl font-semibold text-dm-navy-900 dark:text-white">
                {{ auth.user?.first_name }} {{ auth.user?.last_name }}
              </p>
              <p class="mt-1 text-sm text-slate-500 dark:text-dm-navy-200">
                {{ auth.user?.email }}
              </p>
              <AppButton variant="secondary" class="mt-4" @click="pickerOpen = true">
                Alterar avatar
              </AppButton>
            </div>
          </div>
        </RevealSection>

        <!-- Dados pessoais (read-only) -->
        <RevealSection animation="up" :delay="100">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/8 dark:bg-white/3">
            <div class="flex items-center justify-between gap-4">
              <h2 class="font-display text-lg font-semibold text-dm-navy-900 dark:text-white">Dados pessoais</h2>
              <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-white/5 dark:text-dm-navy-200">
                Em breve editável
              </span>
            </div>
            <p class="mt-1 text-sm text-slate-500 dark:text-dm-navy-200">
              A edição dos dados estará disponível em breve.
            </p>

            <dl class="mt-6 space-y-4">
              <div class="grid grid-cols-1 gap-1 border-b border-slate-100 pb-3 sm:grid-cols-3 dark:border-white/5">
                <dt class="text-sm font-medium text-slate-500 dark:text-dm-navy-200">Nome</dt>
                <dd class="text-sm text-dm-navy-900 sm:col-span-2 dark:text-white">{{ auth.user?.first_name || '—' }}</dd>
              </div>
              <div class="grid grid-cols-1 gap-1 border-b border-slate-100 pb-3 sm:grid-cols-3 dark:border-white/5">
                <dt class="text-sm font-medium text-slate-500 dark:text-dm-navy-200">Sobrenome</dt>
                <dd class="text-sm text-dm-navy-900 sm:col-span-2 dark:text-white">{{ auth.user?.last_name || '—' }}</dd>
              </div>
              <div class="grid grid-cols-1 gap-1 border-b border-slate-100 pb-3 sm:grid-cols-3 dark:border-white/5">
                <dt class="text-sm font-medium text-slate-500 dark:text-dm-navy-200">Usuário</dt>
                <dd class="font-mono text-sm text-dm-navy-900 sm:col-span-2 dark:text-white">{{ auth.user?.username || '—' }}</dd>
              </div>
              <div class="grid grid-cols-1 gap-1 sm:grid-cols-3">
                <dt class="text-sm font-medium text-slate-500 dark:text-dm-navy-200">E-mail</dt>
                <dd class="text-sm text-dm-navy-900 sm:col-span-2 dark:text-white">{{ auth.user?.email || '—' }}</dd>
              </div>
            </dl>
          </div>
        </RevealSection>

        <!-- Logout -->
        <RevealSection animation="up" :delay="200">
          <div class="flex justify-center pt-2">
            <AppButton variant="ghost" @click="handleLogout">
              Sair da conta
            </AppButton>
          </div>
        </RevealSection>

      </div>
    </section>

    <AvatarPicker
      v-model="pickerOpen"
      :initial="auth.profile"
      @save="handleSave"
    />
  </PageWrapper>
</template>
